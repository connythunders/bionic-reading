"use strict";

/* ---------- IndexedDB helpers ---------- */

const DB_NAME = "recept-db";
const DB_VERSION = 1;
const STORE = "recipes";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("category", "category", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbGetAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function dbPut(recipe) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(recipe);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbDelete(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ---------- Categories (small list, localStorage is fine) ---------- */

const CATS_KEY = "recept-categories";
const DEFAULT_CATEGORIES = ["Tex-Mex", "Kinesiskt", "Americana", "Italienskt", "Blandat"];

function loadCategories() {
  try {
    const raw = localStorage.getItem(CATS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {}
  saveCategories(DEFAULT_CATEGORIES);
  return DEFAULT_CATEGORIES.slice();
}

function saveCategories(cats) {
  localStorage.setItem(CATS_KEY, JSON.stringify(cats));
}

let categories = loadCategories();

/* ---------- State ---------- */

let recipes = [];
let activeCategory = "Alla";
let searchQuery = "";
let editingId = null;
let currentPhotoDataUrl = null;

/* ---------- DOM ---------- */

const $ = (id) => document.getElementById(id);

const homeView = $("homeView");
const editorView = $("editorView");
const recipeGrid = $("recipeGrid");
const emptyState = $("emptyState");
const categoryChips = $("categoryChips");
const searchInput = $("searchInput");

const addBtn = $("addBtn");
const backBtn = $("backBtn");
const deleteBtn = $("deleteBtn");
const editorTitle = $("editorTitle");

const photoPreview = $("photoPreview");
const photoPlaceholder = $("photoPlaceholder");
const cameraInput = $("cameraInput");
const galleryInput = $("galleryInput");
const ocrBtn = $("ocrBtn");
const ocrProgress = $("ocrProgress");
const ocrBarFill = $("ocrBarFill");
const ocrStatus = $("ocrStatus");

const titleInput = $("titleInput");
const categorySelect = $("categorySelect");
const textArea = $("textArea");
const commentArea = $("commentArea");
const saveBtn = $("saveBtn");

const manageCatsBtn = $("manageCatsBtn");
const catModal = $("catModal");
const catList = $("catList");
const newCatInput = $("newCatInput");
const addCatBtn = $("addCatBtn");
const closeCatModal = $("closeCatModal");

const toastEl = $("toast");

/* ---------- Toast ---------- */

let toastTimer = null;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2200);
}

/* ---------- Rendering: home ---------- */

function renderCategoryChips() {
  categoryChips.innerHTML = "";
  const all = ["Alla", ...categories];
  for (const cat of all) {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat === activeCategory ? " active" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      activeCategory = cat;
      renderCategoryChips();
      renderRecipes();
    });
    categoryChips.appendChild(chip);
  }
}

function renderRecipes() {
  let list = recipes;
  if (activeCategory !== "Alla") {
    list = list.filter((r) => r.category === activeCategory);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(
      (r) =>
        (r.title || "").toLowerCase().includes(q) ||
        (r.text || "").toLowerCase().includes(q) ||
        (r.comment || "").toLowerCase().includes(q)
    );
  }
  list = list.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

  recipeGrid.innerHTML = "";
  emptyState.hidden = list.length > 0;

  for (const r of list) {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.addEventListener("click", () => openEditor(r.id));

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    if (r.photo) {
      const img = document.createElement("img");
      img.src = r.photo;
      img.alt = "";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      thumb.appendChild(img);
    } else {
      thumb.textContent = "🍽️";
    }

    const info = document.createElement("div");
    info.className = "info";
    const h3 = document.createElement("h3");
    h3.textContent = r.title || "Namnlöst recept";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = r.category;
    info.appendChild(h3);
    info.appendChild(badge);

    card.appendChild(thumb);
    card.appendChild(info);
    recipeGrid.appendChild(card);
  }
}

/* ---------- Category select in editor ---------- */

function renderCategorySelect(selected) {
  categorySelect.innerHTML = "";
  for (const cat of categories) {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  }
  const addOpt = document.createElement("option");
  addOpt.value = "__add__";
  addOpt.textContent = "+ Lägg till ny rubrik…";
  categorySelect.appendChild(addOpt);

  categorySelect.value = selected && categories.includes(selected) ? selected : categories[0];
}

categorySelect.addEventListener("change", () => {
  if (categorySelect.value === "__add__") {
    const name = prompt("Namn på ny rubrik:");
    const trimmed = (name || "").trim();
    if (trimmed && !categories.includes(trimmed)) {
      categories.push(trimmed);
      saveCategories(categories);
      renderCategorySelect(trimmed);
      renderCategoryChips();
    } else {
      renderCategorySelect(categories[0]);
    }
  }
});

/* ---------- Category management modal ---------- */

function renderCatModal() {
  catList.innerHTML = "";
  for (const cat of categories) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = cat;
    li.appendChild(span);

    const inUse = recipes.some((r) => r.category === cat);
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-cat";
    removeBtn.textContent = "✕";
    removeBtn.title = inUse ? "Används av recept – kan inte tas bort" : "Ta bort rubrik";
    removeBtn.disabled = inUse;
    if (inUse) removeBtn.style.opacity = "0.3";
    removeBtn.addEventListener("click", () => {
      categories = categories.filter((c) => c !== cat);
      saveCategories(categories);
      renderCatModal();
      renderCategoryChips();
    });

    li.appendChild(removeBtn);
    catList.appendChild(li);
  }
}

manageCatsBtn.addEventListener("click", () => {
  renderCatModal();
  catModal.hidden = false;
});
closeCatModal.addEventListener("click", () => { catModal.hidden = true; });
catModal.addEventListener("click", (e) => { if (e.target === catModal) catModal.hidden = true; });

addCatBtn.addEventListener("click", () => {
  const name = newCatInput.value.trim();
  if (!name) return;
  if (categories.includes(name)) {
    toast("Rubriken finns redan");
    return;
  }
  categories.push(name);
  saveCategories(categories);
  newCatInput.value = "";
  renderCatModal();
  renderCategoryChips();
  toast("Rubrik tillagd");
});
newCatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addCatBtn.click();
});

/* ---------- View switching ---------- */

function showHome() {
  editorView.hidden = true;
  homeView.hidden = false;
  editingId = null;
  renderRecipes();
}

function showEditor() {
  homeView.hidden = true;
  editorView.hidden = false;
}

function resetEditorForm() {
  currentPhotoDataUrl = null;
  photoPreview.hidden = true;
  photoPreview.src = "";
  photoPlaceholder.hidden = false;
  ocrBtn.hidden = true;
  ocrProgress.hidden = true;
  titleInput.value = "";
  textArea.value = "";
  commentArea.value = "";
  renderCategorySelect(activeCategory !== "Alla" ? activeCategory : categories[0]);
}

function openEditor(id) {
  editingId = id || null;
  resetEditorForm();

  if (editingId) {
    const r = recipes.find((x) => x.id === editingId);
    if (!r) return;
    editorTitle.textContent = "Redigera recept";
    deleteBtn.hidden = false;
    titleInput.value = r.title || "";
    textArea.value = r.text || "";
    commentArea.value = r.comment || "";
    renderCategorySelect(r.category);
    if (r.photo) {
      currentPhotoDataUrl = r.photo;
      photoPreview.src = r.photo;
      photoPreview.hidden = false;
      photoPlaceholder.hidden = true;
      ocrBtn.hidden = false;
    }
  } else {
    editorTitle.textContent = "Nytt recept";
    deleteBtn.hidden = true;
  }

  showEditor();
}

addBtn.addEventListener("click", () => openEditor(null));
backBtn.addEventListener("click", showHome);

/* ---------- Photo capture + resize ---------- */

function fileToResizedDataUrl(file, maxDim = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Kunde inte läsa bilden"));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handlePhotoFile(file) {
  if (!file) return;
  try {
    const dataUrl = await fileToResizedDataUrl(file);
    currentPhotoDataUrl = dataUrl;
    photoPreview.src = dataUrl;
    photoPreview.hidden = false;
    photoPlaceholder.hidden = true;
    ocrBtn.hidden = false;
  } catch (e) {
    toast("Kunde inte läsa bilden");
  }
}

cameraInput.addEventListener("change", (e) => handlePhotoFile(e.target.files[0]));
galleryInput.addEventListener("change", (e) => handlePhotoFile(e.target.files[0]));

/* ---------- OCR ---------- */

ocrBtn.addEventListener("click", async () => {
  if (!currentPhotoDataUrl) return;
  if (typeof Tesseract === "undefined") {
    toast("Textigenkänning kunde inte laddas. Kolla internetanslutningen.");
    return;
  }
  if (textArea.value.trim() && !confirm("Ersätta befintlig text med det som läses av från bilden?")) {
    return;
  }

  ocrBtn.disabled = true;
  ocrProgress.hidden = false;
  ocrBarFill.style.width = "0%";
  ocrStatus.textContent = "Startar…";

  try {
    const result = await Tesseract.recognize(currentPhotoDataUrl, "swe+eng", {
      logger: (m) => {
        if (m.status && typeof m.progress === "number") {
          ocrBarFill.style.width = Math.round(m.progress * 100) + "%";
          const labels = {
            "loading tesseract core": "Laddar…",
            "initializing tesseract": "Förbereder…",
            "loading language traineddata": "Laddar språkdata…",
            "initializing api": "Förbereder…",
            "recognizing text": "Läser text…",
          };
          ocrStatus.textContent = labels[m.status] || m.status;
        }
      },
    });
    const text = (result.data && result.data.text) ? result.data.text.trim() : "";
    if (text) {
      textArea.value = text;
      toast("Text inläst – kolla gärna igenom den");
    } else {
      toast("Hittade ingen text i bilden");
    }
  } catch (err) {
    console.error(err);
    toast("Kunde inte läsa av texten");
  } finally {
    ocrBtn.disabled = false;
    ocrProgress.hidden = true;
  }
});

/* ---------- Save / delete ---------- */

saveBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const category = categorySelect.value === "__add__" ? categories[0] : categorySelect.value;

  if (!title) {
    toast("Ge receptet en titel");
    titleInput.focus();
    return;
  }

  const now = Date.now();
  const recipe = editingId
    ? recipes.find((r) => r.id === editingId)
    : { id: (crypto.randomUUID ? crypto.randomUUID() : String(now) + Math.random()), createdAt: now };

  recipe.title = title;
  recipe.category = category;
  recipe.text = textArea.value;
  recipe.comment = commentArea.value;
  recipe.photo = currentPhotoDataUrl || recipe.photo || null;
  recipe.updatedAt = now;

  await dbPut(recipe);

  const idx = recipes.findIndex((r) => r.id === recipe.id);
  if (idx >= 0) recipes[idx] = recipe;
  else recipes.push(recipe);

  toast("Recept sparat");
  showHome();
});

deleteBtn.addEventListener("click", async () => {
  if (!editingId) return;
  if (!confirm("Ta bort det här receptet?")) return;
  await dbDelete(editingId);
  recipes = recipes.filter((r) => r.id !== editingId);
  toast("Recept borttaget");
  showHome();
});

/* ---------- Search ---------- */

let searchDebounce = null;
searchInput.addEventListener("input", (e) => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = e.target.value;
    renderRecipes();
  }, 120);
});

/* ---------- Install prompt (Android/Chrome) ---------- */

const installBanner = $("installBanner");
const installBtn = $("installBtn");
const dismissInstall = $("dismissInstall");
const installText = $("installText");

let deferredInstallPrompt = null;
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const dismissedKey = "recept-install-dismissed";

if (!isStandalone && !sessionStorage.getItem(dismissedKey)) {
  if (isIOS) {
    installText.textContent =
      "Lägg till Recept på hemskärmen: tryck på Dela-ikonen och välj \"Lägg till på hemskärmen\".";
    installBanner.hidden = false;
  } else {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      installText.textContent = "Installera appen på hemskärmen för snabb åtkomst.";
      installBtn.hidden = false;
      installBanner.hidden = false;
    });
  }
}

installBtn.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installBanner.hidden = true;
});

dismissInstall.addEventListener("click", () => {
  installBanner.hidden = true;
  sessionStorage.setItem(dismissedKey, "1");
});

/* ---------- Service worker ---------- */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

/* ---------- Init ---------- */

(async function init() {
  recipes = await dbGetAll();
  renderCategoryChips();
  renderRecipes();
})();
