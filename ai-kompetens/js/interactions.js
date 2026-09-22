/*
 * interactions.js
 * Renderingslogik för sektion 5 ("Testa dig själv"): quiz, riskpyramid-sorterare,
 * scenarier och faktakoll. Ren vanilla JS, inga externa beroenden, ingen data
 * sparas eller skickas någonstans. Läser data från interactions-data.js
 * (QUIZ_DATA, RISK_SORTER_DATA, SCENARIO_DATA, FACTCHECK_DATA), som måste laddas
 * före denna fil.
 *
 * Tillgänglighet: riskpyramid-övningen använder ett klicka-välj-mönster
 * (välj exempel, klicka sedan på en kategori) istället för drag-and-drop, så att
 * den fungerar identiskt med tangentbord, skärmläsare och touch. All feedback ges
 * i aria-live="polite"-regioner, aldrig enbart via färg.
 */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* Små DOM-hjälpfunktioner (undviker innerHTML-konkatenering)        */
  /* ---------------------------------------------------------------- */

  function el(tag, opts, children) {
    opts = opts || {};
    children = children || [];
    var node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.text) node.textContent = opts.text;
    if (opts.attrs) {
      for (var key in opts.attrs) {
        if (Object.prototype.hasOwnProperty.call(opts.attrs, key)) {
          node.setAttribute(key, opts.attrs[key]);
        }
      }
    }
    children.forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function shuffle(array) {
    var copy = array.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  /* ================================================================ */
  /* 1. QUIZ                                                           */
  /* ================================================================ */

  function renderQuiz(mountEl, questions) {
    clear(mountEl);
    mountEl.classList.add("quiz");

    questions.forEach(function (q, qIndex) {
      var feedback = el("div", {
        className: "quiz__feedback",
        attrs: { "aria-live": "polite" }
      });

      var optionButtons = [];
      var answered = false;

      var optionsList = el("div", {
        className: "quiz__options",
        attrs: { role: "group", "aria-label": q.question }
      });

      q.options.forEach(function (optionText, optIndex) {
        var btn = el("button", {
          className: "quiz__option",
          text: optionText,
          attrs: {
            type: "button",
            "aria-pressed": "false"
          }
        });

        btn.addEventListener("click", function () {
          answered = true;
          var isCorrect = optIndex === q.correctIndex;

          optionButtons.forEach(function (b, i) {
            b.setAttribute("aria-pressed", i === optIndex ? "true" : "false");
            b.classList.remove("quiz__option--selected", "quiz__option--correct-answer");
            if (i === optIndex) b.classList.add("quiz__option--selected");
            if (i === q.correctIndex) b.classList.add("quiz__option--correct-answer");
          });

          clear(feedback);
          feedback.classList.remove("quiz__feedback--correct", "quiz__feedback--incorrect");
          feedback.classList.add(
            isCorrect ? "quiz__feedback--correct" : "quiz__feedback--incorrect"
          );

          var lead = el("strong", {
            text: isCorrect
              ? "Rätt! "
              : "Inte riktigt. Rätt svar: " + q.options[q.correctIndex] + " "
          });
          var explanation = el("span", { text: q.explanation });
          feedback.appendChild(lead);
          feedback.appendChild(explanation);
        });

        optionButtons.push(btn);
        optionsList.appendChild(btn);
      });

      var questionBlock = el(
        "div",
        { className: "quiz__item", attrs: { "data-question-index": String(qIndex) } },
        [
          el("h4", { className: "quiz__question", text: q.question }),
          optionsList,
          feedback
        ]
      );

      mountEl.appendChild(questionBlock);
    });
  }

  function renderAllQuizzes() {
    var mounts = document.querySelectorAll(".quiz-mount");
    mounts.forEach(function (mount) {
      var id = mount.id;
      var data = QUIZ_DATA[id];
      if (!data) return;
      renderQuiz(mount, data);
    });
  }

  /* ================================================================ */
  /* 2. RISKPYRAMID-SORTERARE (klicka-välj, inte drag-and-drop)        */
  /* ================================================================ */

  var RISK_ZONES = [
    { key: "unacceptable", label: "Oacceptabel risk (förbjuden)" },
    { key: "high", label: "Hög risk" },
    { key: "limited", label: "Transparens / begränsad risk" },
    { key: "minimal", label: "Minimal risk" }
  ];

  function renderRiskSorter(mountEl, items) {
    clear(mountEl);
    mountEl.classList.add("risk-sorter");

    var shuffled = shuffle(items);
    var selectedId = null;
    var placed = {}; // id -> { risk, correct }

    var poolHeading = el("h4", { text: "Exempel att sortera" });
    var pool = el("div", {
      className: "risk-sorter__pool",
      attrs: { role: "group", "aria-label": "Osorterade exempel" }
    });

    var zonesHeading = el("h4", { text: "Riskkategorier" });
    var zonesWrap = el("div", { className: "risk-sorter__zones" });
    var zoneLists = {};

    var feedback = el("div", {
      className: "risk-sorter__feedback",
      attrs: { "aria-live": "polite" }
    });

    var progress = el("p", { className: "risk-sorter__progress" });

    function updateProgress() {
      var count = Object.keys(placed).length;
      progress.textContent = count + " av " + shuffled.length + " exempel placerade.";
    }

    var itemButtons = {};

    function renderPool() {
      clear(pool);
      shuffled.forEach(function (item) {
        if (placed[item.id]) return; // redan placerad, ligger i en zon istället
        var btn = el("button", {
          className: "risk-sorter__item",
          text: item.text,
          attrs: {
            type: "button",
            "aria-pressed": item.id === selectedId ? "true" : "false"
          }
        });
        btn.addEventListener("click", function () {
          selectedId = selectedId === item.id ? null : item.id;
          renderPool();
          if (selectedId) {
            clear(feedback);
            feedback.classList.remove("risk-sorter__feedback--correct", "risk-sorter__feedback--incorrect");
            var hint = el("p", {
              text:
                "Du har valt: “" +
                item.text +
                "”. Klicka nu på den riskkategori du tror den hör till."
            });
            feedback.appendChild(hint);
          }
        });
        itemButtons[item.id] = btn;
        pool.appendChild(btn);
      });

      if (shuffled.every(function (item) { return placed[item.id]; })) {
        pool.appendChild(el("p", { className: "risk-sorter__done", text: "Alla exempel är placerade." }));
      }
    }

    RISK_ZONES.forEach(function (zone) {
      var list = el("ul", { className: "risk-sorter__zone-list" });
      zoneLists[zone.key] = list;

      var zoneBtn = el(
        "button",
        {
          className: "risk-sorter__zone",
          attrs: { type: "button", "data-risk": zone.key, "aria-label": "Placera valt exempel i: " + zone.label }
        },
        [el("span", { className: "risk-sorter__zone-label", text: zone.label })]
      );

      zoneBtn.addEventListener("click", function () {
        if (!selectedId) {
          clear(feedback);
          feedback.classList.remove("risk-sorter__feedback--correct", "risk-sorter__feedback--incorrect");
          feedback.appendChild(
            el("p", { text: "Välj först ett exempel i listan ovan, klicka sedan på en kategori." })
          );
          return;
        }

        var item = shuffled.filter(function (i) { return i.id === selectedId; })[0];
        if (!item) return;

        var isCorrect = item.risk === zone.key;
        placed[item.id] = { risk: zone.key, correct: isCorrect };
        selectedId = null;

        var li = el("li", { className: "risk-sorter__placed-item" }, [
          el("span", {
            className: isCorrect ? "risk-sorter__mark risk-sorter__mark--correct" : "risk-sorter__mark risk-sorter__mark--incorrect",
            text: isCorrect ? "✓ Rätt" : "✗ Fel"
          }),
          el("span", { text: " " + item.text })
        ]);
        // Placera visuellt i den kategori eleven valde (för tydlig feedback om var man tänkte),
        // men markera tydligt rätt/fel samt vad rätt kategori faktiskt är i texten nedan.
        zoneLists[zone.key].appendChild(li);

        renderPool();
        updateProgress();

        clear(feedback);
        feedback.classList.remove("risk-sorter__feedback--correct", "risk-sorter__feedback--incorrect");
        feedback.classList.add(
          isCorrect ? "risk-sorter__feedback--correct" : "risk-sorter__feedback--incorrect"
        );

        var correctZoneLabel = RISK_ZONES.filter(function (z) { return z.key === item.risk; })[0].label;
        var lead = el("strong", {
          text: isCorrect
            ? "Rätt! "
            : "Inte riktigt — rätt kategori är “" + correctZoneLabel + "”. "
        });
        var explanation = el("span", { text: item.explanation });
        feedback.appendChild(lead);
        feedback.appendChild(explanation);
      });

      var zoneBlock = el("div", { className: "risk-sorter__zone-block" }, [zoneBtn, list]);
      zonesWrap.appendChild(zoneBlock);
    });

    updateProgress();
    mountEl.appendChild(poolHeading);
    mountEl.appendChild(pool);
    mountEl.appendChild(zonesHeading);
    mountEl.appendChild(zonesWrap);
    mountEl.appendChild(progress);
    mountEl.appendChild(feedback);

    renderPool();
  }

  function renderAllRiskSorters() {
    var mount = document.getElementById("app-risk-pyramid");
    if (!mount) return;
    renderRiskSorter(mount, RISK_SORTER_DATA);
  }

  /* ================================================================ */
  /* 3. SCENARIER                                                      */
  /* ================================================================ */

  function renderScenario(scenario) {
    var result = el("div", {
      className: "scenario__result",
      attrs: { "aria-live": "polite" }
    });

    var choiceButtons = [];
    var choicesWrap = el("div", {
      className: "scenario__choices",
      attrs: { role: "group", "aria-label": "Vad gör du?" }
    });

    scenario.choices.forEach(function (choice, index) {
      var btn = el("button", {
        className: "scenario__choice",
        text: choice.label + ") " + choice.text,
        attrs: { type: "button", "aria-pressed": "false" }
      });

      btn.addEventListener("click", function () {
        choiceButtons.forEach(function (b, i) {
          b.setAttribute("aria-pressed", i === index ? "true" : "false");
        });

        clear(result);
        var wasBest = index === scenario.bestIndex;
        var youChose = el("p", {}, [
          el("strong", { text: "Du valde " + choice.label + ". " }),
          el("span", {
            text: wasBest
              ? "Det stämmer med det rekommenderade svaret nedan — här är varför:"
              : "Här är resonemanget kring vad som brukar fungera bäst i den här situationen, oavsett vilket alternativ du valde:"
          })
        ]);
        var explanation = el("p", { text: scenario.explanation });

        result.appendChild(youChose);
        result.appendChild(explanation);
      });

      choiceButtons.push(btn);
      choicesWrap.appendChild(btn);
    });

    return el("div", { className: "scenario", attrs: { "data-scenario-id": scenario.id } }, [
      el("h4", { text: scenario.title }),
      el("p", { className: "scenario__prompt", text: scenario.prompt }),
      choicesWrap,
      result
    ]);
  }

  function renderAllScenarios() {
    var mount = document.getElementById("app-scenarios");
    if (!mount) return;
    clear(mount);
    SCENARIO_DATA.forEach(function (scenario) {
      mount.appendChild(renderScenario(scenario));
    });
  }

  /* ================================================================ */
  /* 4. FAKTAKOLL                                                       */
  /* ================================================================ */

  var FACTCHECK_OPTIONS = [
    { key: "stammer", label: "Stämmer" },
    { key: "stämmer-inte", label: "Stämmer inte" },
    { key: "delvis-missvisande", label: "Delvis missvisande" }
  ];

  function renderFactcheckItem(item) {
    var verdict = el("div", {
      className: "factcheck__verdict",
      attrs: { "aria-live": "polite" }
    });

    var optionButtons = [];
    var optionsWrap = el("div", {
      className: "factcheck__options",
      attrs: { role: "group", "aria-label": "Bedöm påståendet" }
    });

    FACTCHECK_OPTIONS.forEach(function (opt) {
      var normalizedKey = opt.key === "stammer" ? "stämmer" : opt.key;
      var btn = el("button", {
        className: "factcheck__option",
        text: opt.label,
        attrs: { type: "button", "aria-pressed": "false" }
      });

      btn.addEventListener("click", function () {
        optionButtons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });

        var isCorrect = normalizedKey === item.correctVerdict;

        clear(verdict);
        verdict.classList.remove("factcheck__verdict--correct", "factcheck__verdict--incorrect");
        verdict.classList.add(
          isCorrect ? "factcheck__verdict--correct" : "factcheck__verdict--incorrect"
        );

        var lead = el("strong", {
          text: isCorrect
            ? "Rätt bedömt — " + item.verdictLabel + ". "
            : "Facit: " + item.verdictLabel + ". "
        });
        var explanation = el("span", { text: item.explanation });
        verdict.appendChild(lead);
        verdict.appendChild(explanation);
      });

      optionButtons.push(btn);
      optionsWrap.appendChild(btn);
    });

    return el("div", { className: "factcheck", attrs: { "data-factcheck-id": item.id } }, [
      el("p", { className: "factcheck__claim", text: item.claim }),
      optionsWrap,
      verdict
    ]);
  }

  function renderAllFactchecks() {
    var mount = document.getElementById("app-factcheck");
    if (!mount) return;
    clear(mount);
    FACTCHECK_DATA.forEach(function (item) {
      mount.appendChild(renderFactcheckItem(item));
    });
  }

  /* ================================================================ */
  /* Init                                                               */
  /* ================================================================ */

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof QUIZ_DATA !== "undefined") renderAllQuizzes();
    if (typeof RISK_SORTER_DATA !== "undefined") renderAllRiskSorters();
    if (typeof SCENARIO_DATA !== "undefined") renderAllScenarios();
    if (typeof FACTCHECK_DATA !== "undefined") renderAllFactchecks();
  });
})();
