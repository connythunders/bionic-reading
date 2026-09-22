/*
 * larare.js
 * Självskattningsverktyg för lärarspåret, inspirerat av DigCompEdus sex
 * kompetensområden. Helt lokalt, inget sparas eller skickas. Samma
 * klicka-en-gång-mönster och CSS-klasser (.quiz*) som quiz-övningarna på
 * elevsidan, för visuell konsekvens och tillgänglighet (tangentbord/skärmläsare).
 */

(function () {
  "use strict";

  var AREAS = [
    {
      name: "Yrkesengagemang",
      description: "Hur du kommunicerar, samarbetar med kollegor och utvecklas professionellt kring AI och digitala verktyg."
    },
    {
      name: "Digitala resurser",
      description: "Hur du väljer, anpassar och delar digitala resurser och material, inklusive AI-genererat innehåll."
    },
    {
      name: "Undervisning och lärande",
      description: "Hur du planerar och leder undervisning där digitala verktyg och AI kan vara en del av upplägget."
    },
    {
      name: "Bedömning",
      description: "Hur du utformar bedömning och examination på ett sätt som håller även när AI finns tillgängligt för eleverna."
    },
    {
      name: "Att stärka eleverna",
      description: "Hur du anpassar undervisningen och inkluderar alla elever, med stöd av digitala verktyg där det är relevant."
    },
    {
      name: "Elevers digitala kompetens",
      description: "Hur du aktivt hjälper eleverna själva bli digitalt och AI-kompetenta i din undervisning."
    }
  ];

  var LEVELS = [
    {
      label: "Utforskar",
      note: "Helt naturligt att börja här. Ett bra första steg är att prata med en kollega som kommit längre, eller testa ett konkret litet moment i din egen undervisning."
    },
    {
      label: "Använder regelbundet",
      note: "Du har redan en vardagsrutin på det här området. Fundera på om det finns någon del du medvetet undviker — det kan vara nästa steg."
    },
    {
      label: "Vägleder andra",
      note: "Du är redan en resurs för kollegiet på det här området. Överväg att dela dina erfarenheter, eller att bli skolans AI-ansvariga om rollen inte redan finns."
    }
  ];

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

  function renderSelfCheck(mountEl) {
    clear(mountEl);
    mountEl.classList.add("quiz");

    var answeredCount = 0;
    var progress = el("p", { className: "risk-sorter__progress" });

    function updateProgress() {
      progress.textContent = answeredCount + " av " + AREAS.length + " områden skattade.";
    }

    AREAS.forEach(function (area, areaIndex) {
      var feedback = el("div", {
        className: "quiz__feedback",
        attrs: { "aria-live": "polite" }
      });

      var optionButtons = [];
      var hasAnsweredThis = false;

      var optionsList = el("div", {
        className: "quiz__options",
        attrs: { role: "group", "aria-label": area.name }
      });

      LEVELS.forEach(function (level, levelIndex) {
        var btn = el("button", {
          className: "quiz__option",
          text: level.label,
          attrs: { type: "button", "aria-pressed": "false" }
        });

        btn.addEventListener("click", function () {
          if (!hasAnsweredThis) {
            hasAnsweredThis = true;
            answeredCount += 1;
            updateProgress();
          }

          optionButtons.forEach(function (b, i) {
            b.setAttribute("aria-pressed", i === levelIndex ? "true" : "false");
          });

          clear(feedback);
          feedback.appendChild(el("span", { text: level.note }));
        });

        optionButtons.push(btn);
        optionsList.appendChild(btn);
      });

      var areaBlock = el(
        "div",
        { className: "quiz__item" },
        [
          el("h4", { className: "quiz__question", text: area.name }),
          el("p", { text: area.description }),
          optionsList,
          feedback
        ]
      );

      mountEl.appendChild(areaBlock);
    });

    updateProgress();
    mountEl.appendChild(progress);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.getElementById("app-larare-selfcheck");
    if (mount) renderSelfCheck(mount);
  });
})();
