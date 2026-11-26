window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(
{
  "id": "int-001",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Primitiva funktioner",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=4x^3+2x\\).</p><p>Vilket av alternativen anger <em>samtliga</em> primitiva funktioner till \\(f\\)?</p>",
  "svar": {
    "alternativ": [
      "\\(F(x)=12x^2+2+C\\)",
      "\\(F(x)=x^4+x^2\\)",
      "\\(F(x)=x^4+x^2+C\\)",
      "\\(F(x)=4x^4+2x^2+C\\)"
    ],
    "ratt": 2
  },
  "ledtradar": [
    "En primitiv funktion \\(F\\) uppfyller \\(F'(x)=f(x)\\). Du ska alltså gå ”baklänges” från derivatan.",
    "En primitiv funktion till \\(x^n\\) är \\(\\dfrac{x^{n+1}}{n+1}\\). Kontrollera ditt svar genom att derivera.",
    "Om \\(F\\) är en primitiv funktion så är även \\(F(x)+5\\) det. Hur skrivs <em>alla</em> primitiva funktioner?"
  ],
  "losning": "<ol><li>Primitiv funktion till \\(4x^3\\): \\(4\\cdot\\dfrac{x^4}{4}=x^4\\).</li><li>Primitiv funktion till \\(2x\\): \\(2\\cdot\\dfrac{x^2}{2}=x^2\\).</li><li>Alla primitiva funktioner skiljer sig åt med en konstant, så \\(F(x)=x^4+x^2+C\\).</li><li>Kontroll: \\(F'(x)=4x^3+2x=f(x)\\).</li></ol><p>\\(12x^2+2\\) är derivatan av \\(f\\) (fel håll), \\(x^4+x^2\\) är bara <em>en</em> av de primitiva funktionerna (konstanten saknas) och i \\(4x^4+2x^2\\) har man glömt att dividera med den nya exponenten.</p><p>Svar: \\(F(x)=x^4+x^2+C\\)</p>"
},
{
  "id": "int-002",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Primitiva funktioner",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Bestäm samtliga primitiva funktioner till \\(f(x)=e^{2x}\\).</p>",
  "svar": {
    "alternativ": [
      "\\(F(x)=2e^{2x}+C\\)",
      "\\(F(x)=\\dfrac{e^{2x}}{2}+C\\)",
      "\\(F(x)=e^{2x}+C\\)",
      "\\(F(x)=\\dfrac{e^{2x+1}}{2x+1}+C\\)"
    ],
    "ratt": 1
  },
  "ledtradar": [
    "Titta i formelbladet under <em>Primitiva funktioner</em>: vad är en primitiv funktion till \\(e^{kx}\\)?",
    "Kontrollera genom att derivera ditt förslag. Kom ihåg att derivatan av \\(e^{kx}\\) är \\(k\\cdot e^{kx}\\)."
  ],
  "losning": "<ol><li>Enligt formelbladet har \\(e^{kx}\\) de primitiva funktionerna \\(\\dfrac{e^{kx}}{k}+C\\).</li><li>Här är \\(k=2\\), så \\(F(x)=\\dfrac{e^{2x}}{2}+C\\).</li><li>Kontroll: \\(F'(x)=\\dfrac{2e^{2x}}{2}=e^{2x}\\).</li></ol><p>Vanliga fel: \\(2e^{2x}\\) är derivatan av \\(e^{2x}\\), inte en primitiv funktion. Regeln för potensfunktioner (öka exponenten med 1) gäller inte för exponentialfunktioner.</p><p>Svar: \\(F(x)=\\dfrac{e^{2x}}{2}+C\\)</p>"
},
{
  "id": "int-003",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Bestämd integral",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Beräkna \\[\\int_0^2 3x^2\\,dx\\]</p>",
  "svar": {
    "varde": 8,
    "tolerans": 0
  },
  "ledtradar": [
    "Bestäm först en primitiv funktion \\(F\\) till \\(3x^2\\).",
    "Använd integralkalkylens fundamentalsats: \\(\\int_a^b f(x)\\,dx=F(b)-F(a)\\)."
  ],
  "losning": "<ol><li>En primitiv funktion till \\(3x^2\\) är \\(F(x)=x^3\\).</li><li>\\(\\displaystyle\\int_0^2 3x^2\\,dx=\\Big[x^3\\Big]_0^2=2^3-0^3=8\\)</li></ol><p>Svar: \\(8\\)</p>"
},
{
  "id": "int-004",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Bestämd integral",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Beräkna \\[\\int_1^4 \\frac{1}{\\sqrt{x}}\\,dx\\]</p>",
  "svar": {
    "varde": 2,
    "tolerans": 0
  },
  "ledtradar": [
    "Skriv om integranden som en potens: \\(\\dfrac{1}{\\sqrt{x}}=x^{-1/2}\\).",
    "En primitiv funktion till \\(x^{n}\\) är \\(\\dfrac{x^{n+1}}{n+1}\\). Vad blir \\(n+1\\) här?",
    "\\(\\dfrac{x^{1/2}}{1/2}=2\\sqrt{x}\\)."
  ],
  "losning": "<ol><li>\\(\\dfrac{1}{\\sqrt{x}}=x^{-1/2}\\).</li><li>En primitiv funktion är \\(F(x)=\\dfrac{x^{1/2}}{1/2}=2x^{1/2}=2\\sqrt{x}\\). Kontroll: \\(F'(x)=2\\cdot\\tfrac12x^{-1/2}=\\dfrac{1}{\\sqrt{x}}\\).</li><li>\\(\\displaystyle\\int_1^4 x^{-1/2}\\,dx=\\Big[2\\sqrt{x}\\Big]_1^4=2\\cdot2-2\\cdot1=2\\)</li></ol><p>Svar: \\(2\\)</p>"
},
{
  "id": "int-005",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Grafisk integralberäkning",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>I figuren visas grafen till funktionen \\(f\\), som består av raka linjestycken.</p><p>Bestäm \\(\\displaystyle\\int_0^6 f(x)\\,dx\\).</p>",
  "figur": "<svg viewBox=\"0 0 322 216\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M26 192V22M60 192V22M94 192V22M128 192V22M162 192V22M196 192V22M230 192V22M264 192V22M298 192V22M26 192H298M26 158H298M26 124H298M26 90H298M26 56H298M26 22H298\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M60 124L61.3 122.7L62.5 121.4L63.8 120.2L65.1 118.9L66.4 117.6L67.7 116.3L68.9 115.1L70.2 113.8L71.5 112.5L72.8 111.2L74 110L75.3 108.7L76.6 107.4L77.8 106.2L79.1 104.9L80.4 103.6L81.7 102.3L83 101.1L84.2 99.8L85.5 98.5L86.8 97.2L88 95.9L89.3 94.7L90.6 93.4L91.9 92.1L93.2 90.8L94.4 89.6L95.7 88.3L97 87L98.2 85.8L99.5 84.5L100.8 83.2L102.1 81.9L103.3 80.7L104.6 79.4L105.9 78.1L107.2 76.8L108.4 75.6L109.7 74.3L111 73L112.3 71.7L113.6 70.4L114.8 69.2L116.1 67.9L117.4 66.6L118.7 65.3L119.9 64.1L121.2 62.8L122.5 61.5L123.8 60.2L125 59L126.3 57.7L127.6 56.4L128.8 56L130.1 56L131.4 56L132.7 56L133.9 56L135.2 56L136.5 56L137.8 56L139.1 56L140.3 56L141.6 56L142.9 56L144.2 56L145.4 56L146.7 56L148 56L149.2 56L150.5 56L151.8 56L153.1 56L154.3 56L155.6 56L156.9 56L158.2 56L159.4 56L160.7 56L162 56L163.3 56L164.6 56L165.8 56L167.1 56L168.4 56L169.6 56L170.9 56L172.2 56L173.5 56L174.8 56L176 56L177.3 56L178.6 56L179.9 56L181.1 56L182.4 56L183.7 56L184.9 56L186.2 56L187.5 56L188.8 56L190.1 56L191.3 56L192.6 56L193.9 56L195.1 56L196.4 56.6L197.7 58.5L199 60.5L200.2 62.4L201.5 64.3L202.8 66.2L204.1 68.1L205.4 70L206.6 71.9L207.9 73.8L209.2 75.8L210.4 77.7L211.7 79.6L213 81.5L214.3 83.4L215.6 85.3L216.8 87.2L218.1 89.2L219.4 91.1L220.6 93L221.9 94.9L223.2 96.8L224.5 98.7L225.8 100.6L227 102.5L228.3 104.5L229.6 106.4L230.9 108.3L232.1 110.2L233.4 112.1L234.7 114L235.9 115.9L237.2 117.8L238.5 119.8L239.8 121.7L241.1 123.6L242.3 125.5L243.6 127.4L244.9 129.3L246.1 131.2L247.4 133.1L248.7 135.1L250 137L251.2 138.9L252.5 140.8L253.8 142.7L255.1 144.6L256.4 146.5L257.6 148.4L258.9 150.3L260.2 152.3L261.4 154.2L262.7 156.1L264 158L264 158L262.7 158L261.4 158L260.2 158L258.9 158L257.6 158L256.4 158L255.1 158L253.8 158L252.5 158L251.2 158L250 158L248.7 158L247.4 158L246.1 158L244.9 158L243.6 158L242.3 158L241.1 158L239.8 158L238.5 158L237.2 158L235.9 158L234.7 158L233.4 158L232.1 158L230.9 158L229.6 158L228.3 158L227 158L225.8 158L224.5 158L223.2 158L221.9 158L220.6 158L219.4 158L218.1 158L216.8 158L215.6 158L214.3 158L213 158L211.7 158L210.4 158L209.2 158L207.9 158L206.6 158L205.4 158L204.1 158L202.8 158L201.5 158L200.2 158L199 158L197.7 158L196.4 158L195.1 158L193.9 158L192.6 158L191.3 158L190.1 158L188.8 158L187.5 158L186.2 158L184.9 158L183.7 158L182.4 158L181.1 158L179.9 158L178.6 158L177.3 158L176 158L174.8 158L173.5 158L172.2 158L170.9 158L169.6 158L168.4 158L167.1 158L165.8 158L164.6 158L163.3 158L162 158L160.7 158L159.4 158L158.2 158L156.9 158L155.6 158L154.3 158L153.1 158L151.8 158L150.5 158L149.2 158L148 158L146.7 158L145.4 158L144.2 158L142.9 158L141.6 158L140.3 158L139.1 158L137.8 158L136.5 158L135.2 158L133.9 158L132.7 158L131.4 158L130.1 158L128.8 158L127.6 158L126.3 158L125 158L123.8 158L122.5 158L121.2 158L119.9 158L118.7 158L117.4 158L116.1 158L114.8 158L113.6 158L112.3 158L111 158L109.7 158L108.4 158L107.2 158L105.9 158L104.6 158L103.3 158L102.1 158L100.8 158L99.5 158L98.2 158L97 158L95.7 158L94.4 158L93.2 158L91.9 158L90.6 158L89.3 158L88 158L86.8 158L85.5 158L84.2 158L83 158L81.7 158L80.4 158L79.1 158L77.8 158L76.6 158L75.3 158L74 158L72.8 158L71.5 158L70.2 158L68.9 158L67.7 158L66.4 158L65.1 158L63.8 158L62.5 158L61.3 158L60 158Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M20 158H312M60 198V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M306 154.5L312 158L306 161.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M56.5 14L60 8L63.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"312\" y=\"150\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">x</text><text x=\"67\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y</text><text x=\"26\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"94\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"128\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"162\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"196\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"230\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"264\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">6</text><text x=\"298\" y=\"174\" text-anchor=\"middle\" fill=\"currentColor\">7</text><text x=\"56\" y=\"196.6\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"56\" y=\"128.6\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"56\" y=\"94.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"56\" y=\"60.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"56\" y=\"26.6\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"56\" y=\"174\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M60 124L128 56L196 56L264 158\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"219.8\" y=\"56\" text-anchor=\"start\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = f(x)</text></svg>",
  "svar": {
    "varde": 13,
    "tolerans": 0
  },
  "ledtradar": [
    "Integralen är lika med arean av det skuggade området, eftersom grafen ligger ovanför \\(x\\)-axeln.",
    "Dela upp området i enkla figurer: ett parallelltrapets, en rektangel och en triangel.",
    "Arean av ett parallelltrapets är \\(\\dfrac{h(a+b)}{2}\\)."
  ],
  "losning": "<p>Eftersom \\(f(x)\\ge0\\) i hela intervallet är integralen lika med den skuggade arean. Dela upp området:</p><ol><li>\\(0\\le x\\le2\\): parallelltrapets med de parallella sidorna \\(1\\) och \\(3\\) och höjden \\(2\\): \\(\\dfrac{2(1+3)}{2}=4\\).</li><li>\\(2\\le x\\le4\\): rektangel \\(2\\cdot3=6\\).</li><li>\\(4\\le x\\le6\\): triangel \\(\\dfrac{2\\cdot3}{2}=3\\).</li></ol><p>\\(\\displaystyle\\int_0^6 f(x)\\,dx=4+6+3=13\\)</p><p>Svar: \\(13\\)</p>"
},
{
  "id": "int-006",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Grafisk integralberäkning",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "val",
  "fraga": "<p>Figuren visar grafen till en linjär funktion \\(f\\).</p><p>Bestäm \\(\\displaystyle\\int_0^5 f(x)\\,dx\\).</p>",
  "figur": "<svg viewBox=\"0 0 288 270\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M26 246V22M60 246V22M94 246V22M128 246V22M162 246V22M196 246V22M230 246V22M264 246V22M26 246H264M26 214H264M26 182H264M26 150H264M26 118H264M26 86H264M26 54H264M26 22H264\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M60 150L60.4 150L60.8 150L61.3 150L61.7 150L62.1 150L62.5 150L63 150L63.4 150L63.8 150L64.2 150L64.7 150L65.1 150L65.5 150L66 150L66.4 150L66.8 150L67.2 150L67.7 150L68.1 150L68.5 150L68.9 150L69.3 150L69.8 150L70.2 150L70.6 150L71 150L71.5 150L71.9 150L72.3 150L72.8 150L73.2 150L73.6 150L74 150L74.5 150L74.9 150L75.3 150L75.7 150L76.2 150L76.6 150L77 150L77.4 150L77.8 150L78.3 150L78.7 150L79.1 150L79.5 150L80 150L80.4 150L80.8 150L81.2 150L81.7 150L82.1 150L82.5 150L83 150L83.4 150L83.8 150L84.2 150L84.7 150L85.1 150L85.5 150L85.9 150L86.3 150L86.8 150L87.2 150L87.6 150L88 150L88.5 150L88.9 150L89.3 150L89.8 150L90.2 150L90.6 150L91 150L91.5 150L91.9 150L92.3 150L92.7 150L93.2 150L93.6 150L94 150L94.4 150L94.8 150L95.3 150L95.7 150L96.1 150L96.6 150L97 150L97.4 150L97.8 150L98.2 150L98.7 150L99.1 150L99.5 150L99.9 150L100.4 150L100.8 150L101.2 150L101.7 150L102.1 150L102.5 150L102.9 150L103.3 150L103.8 150L104.2 150L104.6 150L105.1 150L105.5 150L105.9 150L106.3 150L106.8 150L107.2 150L107.6 150L108 150L108.4 150L108.9 150L109.3 150L109.7 150L110.2 150L110.6 150L111 150L111.4 150L111.8 150L112.3 150L112.7 150L113.1 150L113.6 150L114 150L114.4 150L114.8 150L115.2 150L115.7 150L116.1 150L116.5 150L116.9 150L117.4 150L117.8 150L118.2 150L118.7 150L119.1 150L119.5 150L119.9 150L120.3 150L120.8 150L121.2 150L121.6 150L122.1 150L122.5 150L122.9 150L123.3 150L123.8 150L124.2 150L124.6 150L125 150L125.4 150L125.9 150L126.3 150L126.7 150L127.2 150L127.6 150L128 150L128 150L127.6 150.4L127.2 150.8L126.7 151.2L126.3 151.6L125.9 152L125.4 152.4L125 152.8L124.6 153.2L124.2 153.6L123.8 154L123.3 154.4L122.9 154.8L122.5 155.2L122.1 155.6L121.6 156L121.2 156.4L120.8 156.8L120.3 157.2L119.9 157.6L119.5 158L119.1 158.4L118.7 158.8L118.2 159.2L117.8 159.6L117.4 160L116.9 160.4L116.5 160.8L116.1 161.2L115.7 161.6L115.2 162L114.8 162.4L114.4 162.8L114 163.2L113.6 163.6L113.1 164L112.7 164.4L112.3 164.8L111.8 165.2L111.4 165.6L111 166L110.6 166.4L110.2 166.8L109.7 167.2L109.3 167.6L108.9 168L108.4 168.4L108 168.8L107.6 169.2L107.2 169.6L106.8 170L106.3 170.4L105.9 170.8L105.5 171.2L105.1 171.6L104.6 172L104.2 172.4L103.8 172.8L103.3 173.2L102.9 173.6L102.5 174L102.1 174.4L101.7 174.8L101.2 175.2L100.8 175.6L100.4 176L99.9 176.4L99.5 176.8L99.1 177.2L98.7 177.6L98.2 178L97.8 178.4L97.4 178.8L97 179.2L96.6 179.6L96.1 180L95.7 180.4L95.3 180.8L94.8 181.2L94.4 181.6L94 182L93.6 182.4L93.2 182.8L92.7 183.2L92.3 183.6L91.9 184L91.5 184.4L91 184.8L90.6 185.2L90.2 185.6L89.8 186L89.3 186.4L88.9 186.8L88.5 187.2L88 187.6L87.6 188L87.2 188.4L86.8 188.8L86.3 189.2L85.9 189.6L85.5 190L85.1 190.4L84.7 190.8L84.2 191.2L83.8 191.6L83.4 192L83 192.4L82.5 192.8L82.1 193.2L81.7 193.6L81.2 194L80.8 194.4L80.4 194.8L80 195.2L79.5 195.6L79.1 196L78.7 196.4L78.3 196.8L77.8 197.2L77.4 197.6L77 198L76.6 198.4L76.2 198.8L75.7 199.2L75.3 199.6L74.9 200L74.5 200.4L74 200.8L73.6 201.2L73.2 201.6L72.8 202L72.3 202.4L71.9 202.8L71.5 203.2L71 203.6L70.6 204L70.2 204.4L69.8 204.8L69.3 205.2L68.9 205.6L68.5 206L68.1 206.4L67.7 206.8L67.2 207.2L66.8 207.6L66.4 208L66 208.4L65.5 208.8L65.1 209.2L64.7 209.6L64.2 210L63.8 210.4L63.4 210.8L63 211.2L62.5 211.6L62.1 212L61.7 212.4L61.3 212.8L60.8 213.2L60.4 213.6L60 214Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M128 150L128.6 149.4L129.3 148.8L129.9 148.2L130.6 147.6L131.2 147L131.8 146.4L132.5 145.8L133.1 145.2L133.7 144.6L134.4 144L135 143.4L135.7 142.8L136.3 142.2L136.9 141.6L137.6 141L138.2 140.4L138.8 139.8L139.5 139.2L140.1 138.6L140.8 138L141.4 137.4L142 136.8L142.7 136.2L143.3 135.6L143.9 135L144.6 134.4L145.2 133.8L145.8 133.2L146.5 132.6L147.1 132L147.8 131.4L148.4 130.8L149 130.2L149.7 129.6L150.3 129L150.9 128.4L151.6 127.8L152.2 127.2L152.9 126.6L153.5 126L154.1 125.4L154.8 124.8L155.4 124.2L156.1 123.6L156.7 123L157.3 122.4L158 121.8L158.6 121.2L159.2 120.6L159.9 120L160.5 119.4L161.2 118.8L161.8 118.2L162.4 117.6L163.1 117L163.7 116.4L164.3 115.8L165 115.2L165.6 114.6L166.2 114L166.9 113.4L167.5 112.8L168.2 112.2L168.8 111.6L169.4 111L170.1 110.4L170.7 109.8L171.4 109.2L172 108.6L172.6 108L173.3 107.4L173.9 106.8L174.5 106.2L175.2 105.6L175.8 105L176.4 104.4L177.1 103.8L177.7 103.2L178.4 102.6L179 102L179.6 101.4L180.3 100.8L180.9 100.2L181.6 99.6L182.2 99L182.8 98.4L183.5 97.8L184.1 97.2L184.7 96.6L185.4 96L186 95.4L186.6 94.8L187.3 94.2L187.9 93.6L188.6 93L189.2 92.4L189.8 91.8L190.5 91.2L191.1 90.6L191.8 90L192.4 89.4L193 88.8L193.7 88.2L194.3 87.6L194.9 87L195.6 86.4L196.2 85.8L196.9 85.2L197.5 84.6L198.1 84L198.8 83.4L199.4 82.8L200 82.2L200.7 81.6L201.3 81L201.9 80.4L202.6 79.8L203.2 79.2L203.9 78.6L204.5 78L205.1 77.4L205.8 76.8L206.4 76.2L207.1 75.6L207.7 75L208.3 74.4L209 73.8L209.6 73.2L210.2 72.6L210.9 72L211.5 71.4L212.1 70.8L212.8 70.2L213.4 69.6L214.1 69L214.7 68.4L215.3 67.8L216 67.2L216.6 66.6L217.2 66L217.9 65.4L218.5 64.8L219.2 64.2L219.8 63.6L220.4 63L221.1 62.4L221.7 61.8L222.4 61.2L223 60.6L223.6 60L224.3 59.4L224.9 58.8L225.5 58.2L226.2 57.6L226.8 57L227.4 56.4L228.1 55.8L228.7 55.2L229.4 54.6L230 54L230 150L229.4 150L228.7 150L228.1 150L227.4 150L226.8 150L226.2 150L225.5 150L224.9 150L224.3 150L223.6 150L223 150L222.4 150L221.7 150L221.1 150L220.4 150L219.8 150L219.2 150L218.5 150L217.9 150L217.2 150L216.6 150L216 150L215.3 150L214.7 150L214.1 150L213.4 150L212.8 150L212.1 150L211.5 150L210.9 150L210.2 150L209.6 150L209 150L208.3 150L207.7 150L207.1 150L206.4 150L205.8 150L205.1 150L204.5 150L203.9 150L203.2 150L202.6 150L201.9 150L201.3 150L200.7 150L200 150L199.4 150L198.8 150L198.1 150L197.5 150L196.9 150L196.2 150L195.6 150L194.9 150L194.3 150L193.7 150L193 150L192.4 150L191.8 150L191.1 150L190.5 150L189.8 150L189.2 150L188.6 150L187.9 150L187.3 150L186.6 150L186 150L185.4 150L184.7 150L184.1 150L183.5 150L182.8 150L182.2 150L181.6 150L180.9 150L180.3 150L179.6 150L179 150L178.4 150L177.7 150L177.1 150L176.4 150L175.8 150L175.2 150L174.5 150L173.9 150L173.3 150L172.6 150L172 150L171.4 150L170.7 150L170.1 150L169.4 150L168.8 150L168.2 150L167.5 150L166.9 150L166.2 150L165.6 150L165 150L164.3 150L163.7 150L163.1 150L162.4 150L161.8 150L161.2 150L160.5 150L159.9 150L159.2 150L158.6 150L158 150L157.3 150L156.7 150L156.1 150L155.4 150L154.8 150L154.1 150L153.5 150L152.9 150L152.2 150L151.6 150L150.9 150L150.3 150L149.7 150L149 150L148.4 150L147.8 150L147.1 150L146.5 150L145.8 150L145.2 150L144.6 150L143.9 150L143.3 150L142.7 150L142 150L141.4 150L140.8 150L140.1 150L139.5 150L138.8 150L138.2 150L137.6 150L136.9 150L136.3 150L135.7 150L135 150L134.4 150L133.7 150L133.1 150L132.5 150L131.8 150L131.2 150L130.6 150L129.9 150L129.3 150L128.6 150L128 150Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M20 150H278M60 252V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M272 146.5L278 150L272 153.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M56.5 14L60 8L63.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"278\" y=\"142\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">x</text><text x=\"67\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y</text><text x=\"26\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"94\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"128\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"162\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"196\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"230\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"264\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">6</text><text x=\"56\" y=\"250.6\" text-anchor=\"end\" fill=\"currentColor\">−3</text><text x=\"56\" y=\"218.6\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"56\" y=\"186.6\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"56\" y=\"122.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"56\" y=\"90.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"56\" y=\"58.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"56\" y=\"26.6\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"56\" y=\"166\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M32.8 239.6L34.2 238.3L35.6 237L37 235.6L38.4 234.3L39.8 233L41.2 231.7L42.6 230.4L44 229L45.4 227.7L46.8 226.4L48.2 225.1L49.6 223.8L51 222.4L52.4 221.1L53.8 219.8L55.2 218.5L56.6 217.2L58 215.8L59.4 214.5L60.8 213.2L62.3 211.9L63.7 210.6L65.1 209.2L66.5 207.9L67.9 206.6L69.3 205.3L70.7 204L72.1 202.6L73.5 201.3L74.9 200L76.3 198.7L77.7 197.4L79.1 196L80.5 194.7L81.9 193.4L83.3 192.1L84.7 190.8L86.1 189.4L87.5 188.1L88.9 186.8L90.3 185.5L91.7 184.2L93.1 182.8L94.5 181.5L95.9 180.2L97.3 178.9L98.7 177.6L100.1 176.2L101.5 174.9L102.9 173.6L104.3 172.3L105.7 171L107.1 169.6L108.5 168.3L109.9 167L111.3 165.7L112.7 164.4L114.1 163L115.5 161.7L116.9 160.4L118.4 159.1L119.8 157.8L121.2 156.4L122.6 155.1L124 153.8L125.4 152.5L126.8 151.2L128.2 149.8L129.6 148.5L131 147.2L132.4 145.9L133.8 144.6L135.2 143.2L136.6 141.9L138 140.6L139.4 139.3L140.8 138L142.2 136.6L143.6 135.3L145 134L146.4 132.7L147.8 131.4L149.2 130L150.6 128.7L152 127.4L153.4 126.1L154.8 124.8L156.2 123.4L157.6 122.1L159 120.8L160.4 119.5L161.8 118.2L163.2 116.8L164.6 115.5L166 114.2L167.4 112.9L168.8 111.6L170.2 110.2L171.6 108.9L173.1 107.6L174.5 106.3L175.9 105L177.3 103.6L178.7 102.3L180.1 101L181.5 99.7L182.9 98.4L184.3 97L185.7 95.7L187.1 94.4L188.5 93.1L189.9 91.8L191.3 90.4L192.7 89.1L194.1 87.8L195.5 86.5L196.9 85.2L198.3 83.8L199.7 82.5L201.1 81.2L202.5 79.9L203.9 78.6L205.3 77.2L206.7 75.9L208.1 74.6L209.5 73.3L210.9 72L212.3 70.6L213.7 69.3L215.1 68L216.5 66.7L217.9 65.4L219.3 64L220.7 62.7L222.1 61.4L223.5 60.1L224.9 58.8L226.3 57.4L227.7 56.1L229.2 54.8L230.6 53.5L232 52.2L233.4 50.8L234.8 49.5L236.2 48.2L237.6 46.9L239 45.6L240.4 44.2L241.8 42.9L243.2 41.6L244.6 40.3L246 39L247.4 37.6L248.8 36.3L250.2 35L251.6 33.7L253 32.4L254.4 31L255.8 29.7L257.2 28.4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><circle cx=\"60\" cy=\"214\" r=\"2.8\" fill=\"currentColor\"/><circle cx=\"230\" cy=\"54\" r=\"2.8\" fill=\"currentColor\"/><text x=\"230\" y=\"34.8\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = f(x)</text></svg>",
  "svar": {
    "alternativ": [
      "\\(6{,}5\\)",
      "\\(4{,}5\\)",
      "\\(2{,}5\\)",
      "\\(-2{,}5\\)"
    ],
    "ratt": 2
  },
  "ledtradar": [
    "Läs av var linjen skär \\(x\\)-axeln och dela upp området i två trianglar.",
    "Den del som ligger <em>under</em> \\(x\\)-axeln ger ett negativt bidrag till integralen."
  ],
  "losning": "<ol><li>Linjen går genom \\((0,\\,-2)\\) och \\((5,\\,3)\\) och skär \\(x\\)-axeln i \\(x=2\\).</li><li>Triangeln under \\(x\\)-axeln (\\(0\\le x\\le2\\)) har arean \\(\\dfrac{2\\cdot2}{2}=2\\). Den ger bidraget \\(-2\\).</li><li>Triangeln ovanför \\(x\\)-axeln (\\(2\\le x\\le5\\)) har arean \\(\\dfrac{3\\cdot3}{2}=4{,}5\\).</li><li>\\(\\displaystyle\\int_0^5 f(x)\\,dx=-2+4{,}5=2{,}5\\)</li></ol><p>Observera: \\(6{,}5\\) är den totala <em>arean</em> mellan grafen och \\(x\\)-axeln, inte integralens värde.</p><p>Svar: \\(2{,}5\\)</p>"
},
{
  "id": "int-007",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Primitiva funktioner",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>\\(F\\) är en primitiv funktion till \\(f(x)=2x+3\\) och \\(F(1)=6\\).</p><p>Beräkna \\(F(2)\\).</p>",
  "svar": {
    "varde": 12,
    "tolerans": 0
  },
  "ledtradar": [
    "Skriv upp samtliga primitiva funktioner: \\(F(x)=x^2+3x+C\\).",
    "Använd villkoret \\(F(1)=6\\) för att bestämma konstanten \\(C\\)."
  ],
  "losning": "<ol><li>\\(F(x)=x^2+3x+C\\)</li><li>\\(F(1)=1+3+C=6\\;\\Rightarrow\\;C=2\\), alltså \\(F(x)=x^2+3x+2\\).</li><li>\\(F(2)=4+6+2=12\\)</li></ol><p>Svar: \\(F(2)=12\\)</p>"
},
{
  "id": "int-008",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Bestämd integral",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Beräkna \\[\\int_0^{\\ln 3} 4e^{2x}\\,dx\\]</p>",
  "svar": {
    "varde": 16,
    "tolerans": 0
  },
  "ledtradar": [
    "En primitiv funktion till \\(e^{kx}\\) är \\(\\dfrac{e^{kx}}{k}\\).",
    "Använd att \\(e^{2\\ln3}=\\left(e^{\\ln 3}\\right)^2\\) och att \\(e^{\\ln 3}=3\\)."
  ],
  "losning": "<ol><li>En primitiv funktion till \\(4e^{2x}\\) är \\(F(x)=4\\cdot\\dfrac{e^{2x}}{2}=2e^{2x}\\).</li><li>\\(\\displaystyle\\int_0^{\\ln3}4e^{2x}\\,dx=\\Big[2e^{2x}\\Big]_0^{\\ln 3}=2e^{2\\ln3}-2e^{0}\\)</li><li>\\(e^{2\\ln3}=\\left(e^{\\ln3}\\right)^2=3^2=9\\) och \\(e^0=1\\).</li><li>\\(2\\cdot9-2\\cdot1=16\\)</li></ol><p>Svar: \\(16\\)</p>"
},
{
  "id": "int-009",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Bestämd integral",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "val",
  "fraga": "<p>Vilket av alternativen är lika med \\(\\displaystyle\\int_0^1 6e^{3x}\\,dx\\)?</p>",
  "svar": {
    "alternativ": [
      "\\(18e^3-18\\)",
      "\\(2e^3\\)",
      "\\(6e^3-6\\)",
      "\\(2e^3-2\\)"
    ],
    "ratt": 3
  },
  "ledtradar": [
    "Bestäm en primitiv funktion till \\(6e^{3x}\\). Glöm inte att dividera med \\(3\\).",
    "Sätt in båda gränserna. Vad är \\(e^{0}\\)?"
  ],
  "losning": "<ol><li>En primitiv funktion till \\(6e^{3x}\\) är \\(6\\cdot\\dfrac{e^{3x}}{3}=2e^{3x}\\).</li><li>\\(\\displaystyle\\int_0^1 6e^{3x}\\,dx=\\Big[2e^{3x}\\Big]_0^1=2e^{3}-2e^{0}=2e^3-2\\)</li></ol><p>Vanliga fel: \\(18e^3-18\\) fås om man multiplicerar med \\(3\\) (deriverar) i stället för att dividera, och \\(2e^3\\) fås om man glömmer att \\(e^0=1\\) och inte \\(0\\).</p><p>Svar: \\(2e^3-2\\)</p>"
},
{
  "id": "int-010",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Tolkning av integraler",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>En bil startar från stillastående. Bilens hastighet efter \\(t\\) sekunder är \\(v(t)\\) m/s. Det gäller att \\[\\int_0^{10} v(t)\\,dt=85\\]</p><p>Vilket påstående är korrekt?</p>",
  "svar": {
    "alternativ": [
      "Bilens hastighet efter 10 s är 85 m/s.",
      "Bilen färdas 85 m under de första 10 sekunderna.",
      "Bilens medelhastighet under de första 10 sekunderna är 85 m/s.",
      "Bilens acceleration under de första 10 sekunderna är 85 m/s²."
    ],
    "ratt": 1
  },
  "ledtradar": [
    "Integralen av en hastighet över ett tidsintervall är arean under hastighetsgrafen.",
    "Tänk på enheterna: (m/s) \\(\\cdot\\) s = ?"
  ],
  "losning": "<p>Integralen \\(\\int_0^{10}v(t)\\,dt\\) motsvarar arean under \\(v\\)-grafen mellan \\(t=0\\) och \\(t=10\\). Enheten blir \\(\\text{m/s}\\cdot\\text{s}=\\text{m}\\), alltså en sträcka.</p><p>Integralen betyder att bilen färdas 85 m under de första 10 sekunderna. (Medelhastigheten blir \\(85/10=8{,}5\\) m/s.)</p><p>Svar: Bilen färdas 85 m under de första 10 sekunderna.</p>"
},
{
  "id": "int-011",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Tolkning av integraler",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Vatten rinner in i en tank. Vattenvolymen i tanken efter \\(t\\) minuter är \\(V(t)\\) liter.</p><p>Vilket uttryck anger hur mycket vatten (i liter) som rinner in i tanken från \\(t=2\\) till \\(t=5\\)?</p>",
  "svar": {
    "alternativ": [
      "\\(V'(5)-V'(2)\\)",
      "\\(\\displaystyle\\int_2^5 V(t)\\,dt\\)",
      "\\(\\displaystyle\\int_2^5 V'(t)\\,dt\\)",
      "\\(\\dfrac{V'(5)-V'(2)}{3}\\)"
    ],
    "ratt": 2
  },
  "ledtradar": [
    "\\(V'(t)\\) är hur snabbt volymen ändras, dvs. flödet i liter/minut.",
    "Den totala förändringen av en storhet får man genom att integrera dess förändringshastighet."
  ],
  "losning": "<p>\\(V'(t)\\) är förändringshastigheten för volymen (liter/min). Enligt integralkalkylens fundamentalsats är</p>\\[\\int_2^5 V'(t)\\,dt=V(5)-V(2)\\]<p>vilket är volymökningen mellan \\(t=2\\) och \\(t=5\\). Enheten blir \\(\\text{liter/min}\\cdot\\text{min}=\\text{liter}\\).</p><p>\\(\\int_2^5V(t)\\,dt\\) har enheten liter·minut och är inte en volymändring.</p><p>Svar: \\(\\displaystyle\\int_2^5 V'(t)\\,dt\\)</p>"
},
{
  "id": "int-012",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Primitiva funktioner",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Vilket uttryck anger samtliga primitiva funktioner till \\(f(x)=5^x\\)?</p>",
  "svar": {
    "alternativ": [
      "\\(F(x)=5^x\\ln5+C\\)",
      "\\(F(x)=\\dfrac{5^{x+1}}{x+1}+C\\)",
      "\\(F(x)=\\dfrac{5^x}{\\ln5}+C\\)",
      "\\(F(x)=x\\cdot5^{x-1}+C\\)"
    ],
    "ratt": 2
  },
  "ledtradar": [
    "\\(5^x\\) är en exponentialfunktion – variabeln står i exponenten. Regeln för \\(x^n\\) gäller inte.",
    "Formelbladet: en primitiv funktion till \\(a^x\\) är \\(\\dfrac{a^x}{\\ln a}\\)."
  ],
  "losning": "<ol><li>Enligt formelbladet är \\(\\dfrac{a^x}{\\ln a}+C\\) samtliga primitiva funktioner till \\(a^x\\) (\\(a\\gt0,\\ a\\ne1\\)).</li><li>Med \\(a=5\\): \\(F(x)=\\dfrac{5^x}{\\ln5}+C\\).</li><li>Kontroll: \\(F'(x)=\\dfrac{5^x\\ln5}{\\ln5}=5^x\\).</li></ol><p>\\(5^x\\ln 5\\) är derivatan av \\(5^x\\), och de två andra alternativen kommer från att felaktigt behandla \\(5^x\\) som en potensfunktion.</p><p>Svar: \\(F(x)=\\dfrac{5^x}{\\ln5}+C\\)</p>"
},
{
  "id": "int-013",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Area mellan kurvor",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Kurvan \\(y=x^2\\) och linjen \\(y=2x\\) begränsar ett område.</p><p>Beräkna områdets area. Svara exakt, t.ex. i bråkform.</p>",
  "svar": {
    "varde": 1.333333,
    "tolerans": 0.002,
    "enhet": "a.e."
  },
  "ledtradar": [
    "Bestäm skärningspunkterna genom att lösa \\(x^2=2x\\).",
    "Vilken graf ligger överst mellan skärningspunkterna? Testa t.ex. \\(x=1\\).",
    "Arean är \\(\\displaystyle\\int_a^b\\big(\\text{övre}-\\text{undre}\\big)\\,dx\\)."
  ],
  "losning": "<ol><li>Skärning: \\(x^2=2x\\;\\Leftrightarrow\\;x(x-2)=0\\;\\Leftrightarrow\\;x=0\\) eller \\(x=2\\).</li><li>För \\(x=1\\) är \\(2x=2\\) och \\(x^2=1\\), så linjen ligger överst i intervallet.</li><li>\\(\\displaystyle A=\\int_0^2\\left(2x-x^2\\right)dx=\\left[x^2-\\frac{x^3}{3}\\right]_0^2=4-\\frac83=\\frac43\\)</li></ol><p>Svar: \\(\\dfrac43\\) a.e.</p>"
},
{
  "id": "int-014",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Integraler och area",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "tal",
  "fraga": "<p>Kurvan \\(y=ax-x^2\\), där \\(a\\) är en positiv konstant, och \\(x\\)-axeln begränsar ett område med arean \\(36\\) a.e.</p><p>Bestäm \\(a\\).</p>",
  "svar": {
    "varde": 6,
    "tolerans": 0
  },
  "ledtradar": [
    "Bestäm kurvans nollställen uttryckt i \\(a\\): lös \\(ax-x^2=0\\).",
    "Ställ upp arean som en integral mellan nollställena och beräkna den uttryckt i \\(a\\).",
    "Du ska få \\(\\dfrac{a^3}{6}=36\\)."
  ],
  "losning": "<ol><li>Nollställen: \\(ax-x^2=x(a-x)=0\\;\\Rightarrow\\;x=0\\) eller \\(x=a\\). Mellan dem är \\(y\\gt0\\) (parabeln är ledsen).</li><li>\\(\\displaystyle A=\\int_0^a\\left(ax-x^2\\right)dx=\\left[\\frac{ax^2}{2}-\\frac{x^3}{3}\\right]_0^a=\\frac{a^3}{2}-\\frac{a^3}{3}=\\frac{a^3}{6}\\)</li><li>\\(\\dfrac{a^3}{6}=36\\;\\Rightarrow\\;a^3=216\\;\\Rightarrow\\;a=6\\)</li></ol><p>Svar: \\(a=6\\)</p>"
},
{
  "id": "int-015",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Integraler",
  "moment": "Grafisk integralberäkning",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "tal",
  "fraga": "<p>Figuren visar grafen till <strong>derivatan</strong> \\(f'\\) av en funktion \\(f\\). Grafen består av raka linjestycken. Det gäller att \\(f(0)=1\\).</p><p>Bestäm \\(f(5)\\).</p>",
  "figur": "<svg viewBox=\"0 0 288 270\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M26 246V22M60 246V22M94 246V22M128 246V22M162 246V22M196 246V22M230 246V22M264 246V22M26 246H264M26 214H264M26 182H264M26 150H264M26 118H264M26 86H264M26 54H264M26 22H264\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M60 54L60.6 54.6L61.3 55.2L61.9 55.8L62.5 56.4L63.2 57L63.8 57.6L64.5 58.2L65.1 58.8L65.7 59.4L66.4 60L67 60.6L67.7 61.2L68.3 61.8L68.9 62.4L69.6 63L70.2 63.6L70.8 64.2L71.5 64.8L72.1 65.4L72.8 66L73.4 66.6L74 67.2L74.7 67.8L75.3 68.4L75.9 69L76.6 69.6L77.2 70.2L77.8 70.8L78.5 71.4L79.1 72L79.8 72.6L80.4 73.2L81 73.8L81.7 74.4L82.3 75L83 75.6L83.6 76.2L84.2 76.8L84.9 77.4L85.5 78L86.1 78.6L86.8 79.2L87.4 79.8L88 80.4L88.7 81L89.3 81.6L90 82.2L90.6 82.8L91.2 83.4L91.9 84L92.5 84.6L93.2 85.2L93.8 85.8L94.4 86.4L95.1 87L95.7 87.6L96.3 88.2L97 88.8L97.6 89.4L98.2 90L98.9 90.6L99.5 91.2L100.2 91.8L100.8 92.4L101.4 93L102.1 93.6L102.7 94.2L103.3 94.8L104 95.4L104.6 96L105.3 96.6L105.9 97.2L106.5 97.8L107.2 98.4L107.8 99L108.4 99.6L109.1 100.2L109.7 100.8L110.4 101.4L111 102L111.6 102.6L112.3 103.2L112.9 103.8L113.6 104.4L114.2 105L114.8 105.6L115.5 106.2L116.1 106.8L116.7 107.4L117.4 108L118 108.6L118.7 109.2L119.3 109.8L119.9 110.4L120.6 111L121.2 111.6L121.8 112.2L122.5 112.8L123.1 113.4L123.8 114L124.4 114.6L125 115.2L125.7 115.8L126.3 116.4L126.9 117L127.6 117.6L128.2 118.2L128.8 118.8L129.5 119.4L130.1 120L130.8 120.6L131.4 121.2L132 121.8L132.7 122.4L133.3 123L133.9 123.6L134.6 124.2L135.2 124.8L135.9 125.4L136.5 126L137.1 126.6L137.8 127.2L138.4 127.8L139.1 128.4L139.7 129L140.3 129.6L141 130.2L141.6 130.8L142.2 131.4L142.9 132L143.5 132.6L144.2 133.2L144.8 133.8L145.4 134.4L146.1 135L146.7 135.6L147.3 136.2L148 136.8L148.6 137.4L149.2 138L149.9 138.6L150.5 139.2L151.2 139.8L151.8 140.4L152.4 141L153.1 141.6L153.7 142.2L154.3 142.8L155 143.4L155.6 144L156.3 144.6L156.9 145.2L157.5 145.8L158.2 146.4L158.8 147L159.4 147.6L160.1 148.2L160.7 148.8L161.4 149.4L162 150L162 150L161.4 150L160.7 150L160.1 150L159.4 150L158.8 150L158.2 150L157.5 150L156.9 150L156.3 150L155.6 150L155 150L154.3 150L153.7 150L153.1 150L152.4 150L151.8 150L151.2 150L150.5 150L149.9 150L149.2 150L148.6 150L148 150L147.3 150L146.7 150L146.1 150L145.4 150L144.8 150L144.2 150L143.5 150L142.9 150L142.2 150L141.6 150L141 150L140.3 150L139.7 150L139.1 150L138.4 150L137.8 150L137.1 150L136.5 150L135.9 150L135.2 150L134.6 150L133.9 150L133.3 150L132.7 150L132 150L131.4 150L130.8 150L130.1 150L129.5 150L128.8 150L128.2 150L127.6 150L126.9 150L126.3 150L125.7 150L125 150L124.4 150L123.8 150L123.1 150L122.5 150L121.8 150L121.2 150L120.6 150L119.9 150L119.3 150L118.7 150L118 150L117.4 150L116.7 150L116.1 150L115.5 150L114.8 150L114.2 150L113.6 150L112.9 150L112.3 150L111.6 150L111 150L110.4 150L109.7 150L109.1 150L108.4 150L107.8 150L107.2 150L106.5 150L105.9 150L105.3 150L104.6 150L104 150L103.3 150L102.7 150L102.1 150L101.4 150L100.8 150L100.2 150L99.5 150L98.9 150L98.2 150L97.6 150L97 150L96.3 150L95.7 150L95.1 150L94.4 150L93.8 150L93.2 150L92.5 150L91.9 150L91.2 150L90.6 150L90 150L89.3 150L88.7 150L88 150L87.4 150L86.8 150L86.1 150L85.5 150L84.9 150L84.2 150L83.6 150L83 150L82.3 150L81.7 150L81 150L80.4 150L79.8 150L79.1 150L78.5 150L77.8 150L77.2 150L76.6 150L75.9 150L75.3 150L74.7 150L74 150L73.4 150L72.8 150L72.1 150L71.5 150L70.8 150L70.2 150L69.6 150L68.9 150L68.3 150L67.7 150L67 150L66.4 150L65.7 150L65.1 150L64.5 150L63.8 150L63.2 150L62.5 150L61.9 150L61.3 150L60.6 150L60 150Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M162 150L162.4 150L162.9 150L163.3 150L163.7 150L164.1 150L164.6 150L165 150L165.4 150L165.8 150L166.2 150L166.7 150L167.1 150L167.5 150L167.9 150L168.4 150L168.8 150L169.2 150L169.6 150L170.1 150L170.5 150L170.9 150L171.4 150L171.8 150L172.2 150L172.6 150L173.1 150L173.5 150L173.9 150L174.3 150L174.8 150L175.2 150L175.6 150L176 150L176.4 150L176.9 150L177.3 150L177.7 150L178.1 150L178.6 150L179 150L179.4 150L179.9 150L180.3 150L180.7 150L181.1 150L181.6 150L182 150L182.4 150L182.8 150L183.2 150L183.7 150L184.1 150L184.5 150L184.9 150L185.4 150L185.8 150L186.2 150L186.6 150L187.1 150L187.5 150L187.9 150L188.4 150L188.8 150L189.2 150L189.6 150L190.1 150L190.5 150L190.9 150L191.3 150L191.8 150L192.2 150L192.6 150L193 150L193.4 150L193.9 150L194.3 150L194.7 150L195.1 150L195.6 150L196 150L196.4 150L196.9 150L197.3 150L197.7 150L198.1 150L198.6 150L199 150L199.4 150L199.8 150L200.2 150L200.7 150L201.1 150L201.5 150L201.9 150L202.4 150L202.8 150L203.2 150L203.6 150L204.1 150L204.5 150L204.9 150L205.4 150L205.8 150L206.2 150L206.6 150L207.1 150L207.5 150L207.9 150L208.3 150L208.8 150L209.2 150L209.6 150L210 150L210.4 150L210.9 150L211.3 150L211.7 150L212.1 150L212.6 150L213 150L213.4 150L213.9 150L214.3 150L214.7 150L215.1 150L215.6 150L216 150L216.4 150L216.8 150L217.2 150L217.7 150L218.1 150L218.5 150L218.9 150L219.4 150L219.8 150L220.2 150L220.6 150L221.1 150L221.5 150L221.9 150L222.4 150L222.8 150L223.2 150L223.6 150L224.1 150L224.5 150L224.9 150L225.3 150L225.8 150L226.2 150L226.6 150L227 150L227.4 150L227.9 150L228.3 150L228.7 150L229.1 150L229.6 150L230 150L230 214L229.6 213.6L229.1 213.2L228.7 212.8L228.3 212.4L227.9 212L227.4 211.6L227 211.2L226.6 210.8L226.2 210.4L225.8 210L225.3 209.6L224.9 209.2L224.5 208.8L224.1 208.4L223.6 208L223.2 207.6L222.8 207.2L222.4 206.8L221.9 206.4L221.5 206L221.1 205.6L220.6 205.2L220.2 204.8L219.8 204.4L219.4 204L218.9 203.6L218.5 203.2L218.1 202.8L217.7 202.4L217.2 202L216.8 201.6L216.4 201.2L216 200.8L215.6 200.4L215.1 200L214.7 199.6L214.3 199.2L213.9 198.8L213.4 198.4L213 198L212.6 197.6L212.1 197.2L211.7 196.8L211.3 196.4L210.9 196L210.4 195.6L210 195.2L209.6 194.8L209.2 194.4L208.8 194L208.3 193.6L207.9 193.2L207.5 192.8L207.1 192.4L206.6 192L206.2 191.6L205.8 191.2L205.4 190.8L204.9 190.4L204.5 190L204.1 189.6L203.6 189.2L203.2 188.8L202.8 188.4L202.4 188L201.9 187.6L201.5 187.2L201.1 186.8L200.7 186.4L200.2 186L199.8 185.6L199.4 185.2L199 184.8L198.6 184.4L198.1 184L197.7 183.6L197.3 183.2L196.9 182.8L196.4 182.4L196 182L195.6 181.6L195.1 181.2L194.7 180.8L194.3 180.4L193.9 180L193.4 179.6L193 179.2L192.6 178.8L192.2 178.4L191.8 178L191.3 177.6L190.9 177.2L190.5 176.8L190.1 176.4L189.6 176L189.2 175.6L188.8 175.2L188.4 174.8L187.9 174.4L187.5 174L187.1 173.6L186.6 173.2L186.2 172.8L185.8 172.4L185.4 172L184.9 171.6L184.5 171.2L184.1 170.8L183.7 170.4L183.2 170L182.8 169.6L182.4 169.2L182 168.8L181.6 168.4L181.1 168L180.7 167.6L180.3 167.2L179.9 166.8L179.4 166.4L179 166L178.6 165.6L178.1 165.2L177.7 164.8L177.3 164.4L176.9 164L176.4 163.6L176 163.2L175.6 162.8L175.2 162.4L174.8 162L174.3 161.6L173.9 161.2L173.5 160.8L173.1 160.4L172.6 160L172.2 159.6L171.8 159.2L171.4 158.8L170.9 158.4L170.5 158L170.1 157.6L169.6 157.2L169.2 156.8L168.8 156.4L168.4 156L167.9 155.6L167.5 155.2L167.1 154.8L166.7 154.4L166.2 154L165.8 153.6L165.4 153.2L165 152.8L164.6 152.4L164.1 152L163.7 151.6L163.3 151.2L162.9 150.8L162.4 150.4L162 150Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M20 150H278M60 252V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M272 146.5L278 150L272 153.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M56.5 14L60 8L63.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"278\" y=\"142\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">x</text><text x=\"67\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y</text><text x=\"26\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"94\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"128\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"162\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"196\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"230\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"264\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">6</text><text x=\"56\" y=\"250.6\" text-anchor=\"end\" fill=\"currentColor\">−3</text><text x=\"56\" y=\"218.6\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"56\" y=\"186.6\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"56\" y=\"122.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"56\" y=\"90.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"56\" y=\"58.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"56\" y=\"26.6\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"56\" y=\"166\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M60 54L162 150L230 214\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"121.2\" y=\"66.8\" text-anchor=\"start\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = f ′(x)</text></svg>",
  "svar": {
    "varde": 3.5,
    "tolerans": 0
  },
  "ledtradar": [
    "Enligt integralkalkylens fundamentalsats är \\(\\int_0^5 f'(x)\\,dx=f(5)-f(0)\\).",
    "Beräkna integralen med hjälp av arean av de två trianglarna. Tänk på tecknet för den del som ligger under \\(x\\)-axeln.",
    "Integralen ger hur mycket \\(f\\) <em>ändras</em>. Lägg till startvärdet."
  ],
  "losning": "<ol><li>Eftersom \\(f\\) är en primitiv funktion till \\(f'\\) gäller \\(\\displaystyle\\int_0^5 f'(x)\\,dx=f(5)-f(0)\\).</li><li>Triangeln ovanför \\(x\\)-axeln (\\(0\\le x\\le3\\)): \\(\\dfrac{3\\cdot3}{2}=4{,}5\\).</li><li>Triangeln under \\(x\\)-axeln (\\(3\\le x\\le5\\)): arean \\(\\dfrac{2\\cdot2}{2}=2\\), bidrag \\(-2\\).</li><li>\\(\\displaystyle\\int_0^5 f'(x)\\,dx=4{,}5-2=2{,}5\\)</li><li>\\(f(5)=f(0)+2{,}5=1+2{,}5=3{,}5\\)</li></ol><p>Svar: \\(f(5)=3{,}5\\)</p>"
},
{
  "id": "int-016",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Digitala metoder",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Beräkna \\[\\int_0^3\\left(e^{0{,}5x}+x^2\\right)dx\\] Svara med två decimaler.</p>",
  "svar": {
    "varde": 15.96,
    "tolerans": 0.006
  },
  "ledtradar": [
    "I GeoGebra kan du definiera funktionen och använda kommandot <code>Integral(f, a, b)</code>.",
    "Skriv <code>e^(0.5x)</code> – använd punkt som decimaltecken i GeoGebra."
  ],
  "losning": "<p><strong>GeoGebra:</strong> Skriv <code>f(x)=e^(0.5x)+x^2</code> och sedan <code>Integral(f, 0, 3)</code>. Resultat: \\(15{,}963\\ldots\\)</p><p>Kontroll för hand: \\(\\displaystyle\\Big[2e^{0{,}5x}+\\frac{x^3}{3}\\Big]_0^3=2e^{1{,}5}+9-2\\approx15{,}96\\).</p><p>Svar: \\(15{,}96\\)</p>"
},
{
  "id": "int-017",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Integraler och area",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Kurvan \\(y=6x-x^2-5\\) och \\(x\\)-axeln begränsar ett område.</p><p>Bestäm områdets area. Svara med två decimaler.</p>",
  "svar": {
    "varde": 10.67,
    "tolerans": 0.006,
    "enhet": "a.e."
  },
  "ledtradar": [
    "Rita kurvan i GeoGebra och bestäm var den skär \\(x\\)-axeln, t.ex. med <code>Nollställe(f)</code>.",
    "Använd sedan <code>Integral(f, a, b)</code> med nollställena som gränser."
  ],
  "losning": "<p><strong>GeoGebra:</strong></p><ol><li><code>f(x)=6x-x^2-5</code></li><li><code>Nollställe(f)</code> ger \\(x=1\\) och \\(x=5\\). Mellan nollställena ligger kurvan ovanför \\(x\\)-axeln.</li><li><code>Integral(f, 1, 5)</code> ger \\(10{,}666\\ldots=\\dfrac{32}{3}\\).</li></ol><p>Svar: ca \\(10{,}67\\) a.e.</p>"
},
{
  "id": "int-018",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Digitala metoder",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Funktionerna \\(f\\) och \\(g\\) är definierade i GeoGebra. I intervallet \\(1\\le x\\le3\\) gäller att \\(f(x)\\ge g(x)\\).</p><p>Vilket kommando ger arean av området mellan graferna till \\(f\\) och \\(g\\) i intervallet \\(1\\le x\\le3\\)?</p>",
  "svar": {
    "alternativ": [
      "<code>Integral(f, 1, 3)</code>",
      "<code>IntegralMellan(g, f, 1, 3)</code>",
      "<code>IntegralMellan(f, g, 1, 3)</code>",
      "<code>Integral(f - g, 3, 1)</code>"
    ],
    "ratt": 2
  },
  "ledtradar": [
    "Arean mellan två kurvor är \\(\\int_a^b\\big(\\text{övre}-\\text{undre}\\big)\\,dx\\).",
    "<code>IntegralMellan(f, g, a, b)</code> beräknar \\(\\int_a^b\\big(f(x)-g(x)\\big)\\,dx\\). Vad händer om man byter ordning på funktionerna eller gränserna?"
  ],
  "losning": "<p><code>IntegralMellan(f, g, 1, 3)</code> beräknar \\(\\displaystyle\\int_1^3\\big(f(x)-g(x)\\big)\\,dx\\), vilket är arean eftersom \\(f\\) ligger överst.</p><ul><li><code>Integral(f, 1, 3)</code> ger arean under \\(f\\) ner till \\(x\\)-axeln, inte mellan kurvorna.</li><li><code>IntegralMellan(g, f, 1, 3)</code> ger \\(\\int_1^3(g-f)\\,dx\\), dvs. arean med negativt tecken.</li><li><code>Integral(f - g, 3, 1)</code> har omvända gränser och ger också arean med negativt tecken.</li></ul><p>Svar: <code>IntegralMellan(f, g, 1, 3)</code></p>"
},
{
  "id": "int-019",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Primitiva funktioner",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Funktionen \\(F\\) är en primitiv funktion till \\(f(x)=3e^{0{,}4x}+2x\\) och \\(F(0)=10\\).</p><p>Bestäm \\(F(5)\\). Svara med en decimal.</p>",
  "svar": {
    "varde": 82.9,
    "tolerans": 0.06
  },
  "ledtradar": [
    "Bestäm samtliga primitiva funktioner för hand eller med CAS-kommandot <code>Integral(f)</code>.",
    "Bestäm konstanten med villkoret \\(F(0)=10\\). Kom ihåg att \\(e^0=1\\)."
  ],
  "losning": "<ol><li><strong>CAS:</strong> <code>Integral(3e^(0.4x)+2x)</code> ger \\(7{,}5e^{0{,}4x}+x^2+C\\). (För hand: \\(3\\cdot\\dfrac{e^{0{,}4x}}{0{,}4}=7{,}5e^{0{,}4x}\\).)</li><li>\\(F(0)=7{,}5\\cdot1+0+C=10\\;\\Rightarrow\\;C=2{,}5\\).</li><li>\\(F(5)=7{,}5e^{2}+25+2{,}5\\approx82{,}9\\)</li></ol><p>Alternativt: \\(F(5)=F(0)+\\int_0^5f(x)\\,dx\\), dvs. <code>10+Integral(f, 0, 5)</code>.</p><p>Svar: \\(F(5)\\approx82{,}9\\)</p>"
},
{
  "id": "int-020",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Integraler i tillämpningar",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>En bil accelererar från stillastående. Bilens hastighet \\(v\\) m/s efter \\(t\\) sekunder kan beskrivas med \\[v(t)=30\\left(1-e^{-0{,}25t}\\right)\\]</p><p>Hur lång sträcka färdas bilen under de första 10 sekunderna? Svara i hela meter.</p>",
  "svar": {
    "varde": 190,
    "tolerans": 0.6,
    "enhet": "m"
  },
  "ledtradar": [
    "Sträckan är arean under hastighetsgrafen.",
    "Beräkna \\(\\int_0^{10} v(t)\\,dt\\) med <code>Integral</code> i GeoGebra."
  ],
  "losning": "<ol><li>Sträckan är \\(\\displaystyle s=\\int_0^{10}v(t)\\,dt\\).</li><li><strong>GeoGebra:</strong> <code>v(x)=30(1-e^(-0.25x))</code> och <code>Integral(v, 0, 10)</code> ger \\(189{,}85\\ldots\\)</li></ol><p>Rimlighet: hastigheten ökar från 0 till ca 27,5 m/s, så sträckan bör ligga mellan 0 och \\(275\\) m.</p><p>Svar: ca \\(190\\) m</p>"
},
{
  "id": "int-021",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Area mellan kurvor",
  "niva": "C",
  "poang": "1/1/0",
  "typ": "redovisning",
  "fraga": "<p>Graferna till funktionerna \\[f(x)=5-x^2\\quad\\text{och}\\quad g(x)=e^{0{,}5x}\\] begränsar ett område.</p><p>Bestäm områdets area.</p>",
  "svar": {
    "facit": "Ca \\(10{,}3\\) a.e. (skärning i \\(x\\approx-2{,}16\\) och \\(x\\approx1{,}65\\))"
  },
  "ledtradar": [
    "Rita båda graferna i GeoGebra och bestäm skärningspunkterna med <code>Skärning(f, g)</code>.",
    "Vilken graf ligger överst mellan skärningspunkterna?",
    "Använd <code>IntegralMellan(f, g, a, b)</code> där \\(a\\) och \\(b\\) är skärningspunkternas \\(x\\)-koordinater."
  ],
  "losning": "<p><strong>GeoGebra:</strong></p><ol><li><code>f(x)=5-x^2</code> och <code>g(x)=e^(0.5x)</code>.</li><li><code>Skärning(f, g)</code> ger \\(A\\approx(-2{,}159;\\;0{,}340)\\) och \\(B\\approx(1{,}649;\\;2{,}281)\\).</li><li>Mellan skärningspunkterna ligger \\(f\\) överst (t.ex. \\(f(0)=5\\gt g(0)=1\\)).</li><li><code>IntegralMellan(f, g, x(A), x(B))</code> ger \\(10{,}308\\ldots\\)</li></ol>\\[\\text{Area}=\\int_{-2{,}159}^{1{,}649}\\left(5-x^2-e^{0{,}5x}\\right)dx\\approx10{,}3\\]<p>Svar: ca \\(10{,}3\\) a.e.</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt bestämda skärningspunkter, \\(x\\approx-2{,}16\\) och \\(x\\approx1{,}65\\)",
    "+C<sub>P</sub> för korrekt uppställd integral (övre minus undre funktion) med korrekt svar, ca \\(10{,}3\\) a.e."
  ]
},
{
  "id": "int-022",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Integraler i tillämpningar",
  "niva": "C",
  "poang": "2/1/0",
  "typ": "redovisning",
  "fraga": "<p>Effekten \\(P\\) kW från en solcellsanläggning under en solig sommardag kan beskrivas med modellen \\[P(t)=-0{,}25t^2+6t-27,\\qquad 6\\le t\\le18\\] där \\(t\\) är tiden i timmar efter midnatt. Den energi (i kWh) som anläggningen producerar motsvaras av arean under grafen till \\(P\\).</p><ol type='a'><li>Hur mycket energi producerar anläggningen under dagen enligt modellen?</li><li>Vid vilken tidpunkt har anläggningen producerat hälften av dagens energi? Motivera ditt svar.</li></ol>",
  "svar": {
    "facit": "a) \\(72\\) kWh &nbsp; b) Kl. 12:00 (\\(t=12\\))"
  },
  "ledtradar": [
    "Energin är \\(\\displaystyle\\int_6^{18}P(t)\\,dt\\). Enheten blir kW·h = kWh.",
    "b) Grafen är en parabel. Var ligger dess symmetrilinje? Du kan också lösa \\(\\int_6^{T}P(t)\\,dt=36\\) med CAS."
  ],
  "losning": "<ol type='a'><li><strong>GeoGebra:</strong> <code>P(x)=-0.25x^2+6x-27</code> och <code>Integral(P, 6, 18)</code> ger \\(72\\). Energin under dagen är \\(\\displaystyle\\int_6^{18}P(t)\\,dt=72\\) kWh.</li><li>\\(P(6)=P(18)=0\\) och grafen är en parabel, så den är symmetrisk kring \\(t=\\dfrac{6+18}{2}=12\\). Arean från \\(t=6\\) till \\(t=12\\) är därför hälften av den totala arean. (Kontroll med CAS: <code>Lös(Integral(P, 6, T)=36, T)</code> ger \\(T=12\\) i intervallet.)<br>Hälften av energin har producerats kl. 12:00.</li></ol><p>Svar: a) \\(72\\) kWh &nbsp; b) kl. 12:00</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt uppställd integral, \\(\\int_6^{18}P(t)\\,dt\\)",
    "+E<sub>P</sub> för korrekt svar, \\(72\\) kWh",
    "+C<sub>R</sub> för korrekt tidpunkt, kl. 12, med godtagbar motivering (t.ex. symmetri eller lösning av \\(\\int_6^T P(t)\\,dt=36\\))"
  ]
},
{
  "id": "int-023",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Integraler i tillämpningar",
  "niva": "A",
  "poang": "1/1/1",
  "typ": "redovisning",
  "fraga": "<p>En bassäng innehåller \\(150\\) liter vatten. När en ventil öppnas rinner vatten ut med hastigheten \\[r(t)=12\\cdot0{,}9^t\\ \\text{liter/minut}\\] där \\(t\\) är tiden i minuter efter att ventilen öppnats.</p><ol type='a'><li>Hur mycket vatten rinner ut under de första 10 minuterna?</li><li>Hur lång tid tar det innan 100 liter har runnit ut?</li><li>Kommer bassängen att tömmas helt enligt modellen? Motivera.</li></ol>",
  "svar": {
    "facit": "a) Ca \\(74\\) liter &nbsp; b) Ca \\(20\\) minuter &nbsp; c) Nej, det totala utflödet närmar sig ca \\(114\\) liter, så ca \\(36\\) liter blir kvar."
  },
  "ledtradar": [
    "Den mängd som runnit ut från \\(t=0\\) till \\(t=T\\) är \\(\\int_0^T r(t)\\,dt\\).",
    "b) Lös ekvationen \\(\\int_0^T r(t)\\,dt=100\\) med CAS, t.ex. <code>NLös(Integral(r, 0, T)=100)</code>.",
    "c) Undersök vad \\(\\int_0^T r(t)\\,dt\\) närmar sig när \\(T\\) blir mycket stort, t.ex. \\(T=200\\) eller \\(T=1000\\)."
  ],
  "losning": "<p><strong>GeoGebra:</strong> <code>r(x)=12*0.9^x</code></p><ol type='a'><li><code>Integral(r, 0, 10)</code> ger \\(74{,}18\\ldots\\) Under de första 10 minuterna rinner ca \\(74\\) liter ut.</li><li>CAS: <code>NLös(Integral(12*0.9^x, 0, T)=100, T)</code> ger \\(T\\approx19{,}97\\). Det tar ca \\(20\\) minuter.</li><li>Med CAS: \\(\\displaystyle\\int_0^T12\\cdot0{,}9^t\\,dt=\\frac{12\\left(1-0{,}9^T\\right)}{\\ln(10/9)}\\). När \\(T\\) växer går \\(0{,}9^T\\to0\\), så den totala mängden närmar sig \\(\\dfrac{12}{\\ln(10/9)}\\approx113{,}9\\) liter (kontroll: <code>Integral(r, 0, 1000)</code> \\(\\approx113{,}9\\)). Eftersom \\(113{,}9\\lt150\\) töms bassängen aldrig helt enligt modellen – ca \\(36\\) liter blir kvar. (I verkligheten minskar flödet när vattennivån sjunker, men modellen säger att utflödet avtar så snabbt att det aldrig når 150 liter.)</li></ol><p>Svar: a) ca 74 liter &nbsp; b) ca 20 min &nbsp; c) Nej, högst ca 114 liter rinner ut.</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt svar på a), ca \\(74\\) liter, med uppställd integral",
    "+C<sub>PL</sub> för korrekt svar på b), ca \\(20\\) minuter",
    "+A<sub>R</sub> för välgrundat resonemang om att den totala utströmmade mängden närmar sig ca \\(114\\) liter, vilket är mindre än \\(150\\) liter, och korrekt slutsats"
  ]
},
{
  "id": "int-024",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Integraler",
  "moment": "Area mellan kurvor",
  "niva": "A",
  "poang": "0/1/2",
  "typ": "redovisning",
  "fraga": "<p>Kurvan \\(y=4x-x^2\\) och \\(x\\)-axeln begränsar ett område. Linjen \\(y=kx\\), där \\(0\\lt k\\lt4\\), delar området i två delar med lika stor area.</p><p>Bestäm \\(k\\).</p>",
  "svar": {
    "facit": "\\(k=4-\\sqrt[3]{32}\\approx0{,}83\\)"
  },
  "ledtradar": [
    "Beräkna först hela områdets area, \\(\\int_0^4(4x-x^2)\\,dx\\).",
    "Linjen och kurvan skär varandra i origo och i ytterligare en punkt. Bestäm den uttryckt i \\(k\\).",
    "Ställ upp arean mellan kurvan och linjen som en integral med \\(k\\) kvar och sätt den lika med halva totalarean. Lös med CAS."
  ],
  "losning": "<ol><li>Hela området: \\(\\displaystyle\\int_0^4\\left(4x-x^2\\right)dx=\\frac{32}{3}\\). Varje del ska alltså ha arean \\(\\dfrac{16}{3}\\).</li><li>Skärning mellan kurva och linje: \\(4x-x^2=kx\\;\\Leftrightarrow\\;x(4-k-x)=0\\;\\Rightarrow\\;x=0\\) eller \\(x=4-k\\).</li><li>Mellan dessa ligger kurvan över linjen. Arean mellan dem är \\[\\int_0^{4-k}\\left(4x-x^2-kx\\right)dx\\]</li><li><strong>CAS:</strong> <code>Integral(4x-x^2-k x, x, 0, 4-k)</code> ger \\(\\dfrac{(4-k)^3}{6}\\).</li><li><code>Lös((4-k)^3/6=16/3, k)</code>: \\((4-k)^3=32\\;\\Rightarrow\\;k=4-\\sqrt[3]{32}\\approx0{,}825\\).</li></ol><p>Kontroll: \\(0\\lt0{,}825\\lt4\\) ✓.</p><p>Svar: \\(k\\approx0{,}83\\)</p>",
  "bedomning": [
    "+C<sub>PL</sub> för att bestämma hela områdets area, \\(32/3\\), och ange skärningspunkten \\(x=4-k\\) mellan linje och kurva",
    "+A<sub>PL</sub> för att ställa upp en ekvation där arean mellan kurvan och linjen är lika med halva totalarean, t.ex. \\(\\int_0^{4-k}(4x-x^2-kx)\\,dx=\\frac{16}{3}\\)",
    "+A<sub>P</sub> för korrekt lösning, \\(k\\approx0{,}83\\)"
  ]
},
{
  "id": "int-025",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Primitiva funktioner",
  "niva": "E",
  "poang": "2/0/0",
  "typ": "redovisning",
  "fraga": "<p>Bestäm den primitiva funktion \\(F\\) till \\(f(x)=3x^2-4x+1\\) som uppfyller villkoret \\(F(2)=5\\).</p>",
  "svar": {
    "facit": "\\(F(x)=x^3-2x^2+x+3\\)"
  },
  "ledtradar": [
    "Bestäm först samtliga primitiva funktioner. Glöm inte konstanten.",
    "Sätt in \\(x=2\\) och använd att \\(F(2)=5\\) för att bestämma konstanten."
  ],
  "losning": "<ol><li>Samtliga primitiva funktioner: \\(F(x)=x^3-2x^2+x+C\\).</li><li>Kontroll: \\(F'(x)=3x^2-4x+1=f(x)\\).</li><li>Villkoret: \\(F(2)=2^3-2\\cdot2^2+2+C=8-8+2+C=2+C\\). \\(2+C=5\\;\\Rightarrow\\;C=3\\).</li></ol><p>Svar: \\(F(x)=x^3-2x^2+x+3\\)</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt bestämda primitiva funktioner, \\(x^3-2x^2+x\\) plus en konstant",
    "+E<sub>P</sub> för korrekt bestämd konstant och korrekt svar, \\(F(x)=x^3-2x^2+x+3\\)"
  ]
},
{
  "id": "int-026",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Bestämd integral",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Beräkna \\[\\int_1^3\\left(4x^3-\\frac{2}{x^2}\\right)dx\\] Svara exakt eller med två decimaler.</p>",
  "svar": {
    "varde": 78.6667,
    "tolerans": 0.006
  },
  "ledtradar": [
    "Skriv om \\(\\dfrac{2}{x^2}\\) som \\(2x^{-2}\\).",
    "En primitiv funktion till \\(x^{-2}\\) är \\(\\dfrac{x^{-1}}{-1}=-\\dfrac1x\\). Var noga med tecknen."
  ],
  "losning": "<ol><li>\\(4x^3-\\dfrac{2}{x^2}=4x^3-2x^{-2}\\).</li><li>En primitiv funktion är \\(F(x)=x^4-2\\cdot\\dfrac{x^{-1}}{-1}=x^4+\\dfrac{2}{x}\\). Kontroll: \\(F'(x)=4x^3-\\dfrac{2}{x^2}\\).</li><li>\\(\\displaystyle\\int_1^3\\left(4x^3-\\frac{2}{x^2}\\right)dx=\\left[x^4+\\frac2x\\right]_1^3=\\left(81+\\frac23\\right)-(1+2)=78+\\frac23=\\frac{236}{3}\\)</li></ol><p>Svar: \\(\\dfrac{236}{3}\\approx78{,}67\\)</p>"
},
{
  "id": "int-027",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Grafisk integralberäkning",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>En cyklist startar vid ett rödljus och stannar vid nästa. Grafen visar cyklistens hastighet \\(v\\) m/s som funktion av tiden \\(t\\) sekunder.</p><p>Hur lång är sträckan mellan de två trafikljusen?</p>",
  "figur": "<svg viewBox=\"0 0 346 238\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"14\"><path d=\"M30 214V22M56 214V22M82 214V22M108 214V22M134 214V22M160 214V22M186 214V22M212 214V22M238 214V22M264 214V22M290 214V22M316 214V22M30 214H316M30 190H316M30 166H316M30 142H316M30 118H316M30 94H316M30 70H316M30 46H316M30 22H316\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M30 214L31.6 209.5L33.2 205L34.9 200.5L36.5 196L38.1 191.5L39.8 187L41.4 182.5L43 178L44.6 173.5L46.2 169L47.9 164.5L49.5 160L51.1 155.5L52.8 151L54.4 146.5L56 142L57.6 137.5L59.2 133L60.9 128.5L62.5 124L64.1 119.5L65.8 115L67.4 110.5L69 106L70.6 101.5L72.2 97L73.9 92.5L75.5 88L77.1 83.5L78.8 79L80.4 74.5L82 70L83.6 70L85.2 70L86.9 70L88.5 70L90.1 70L91.8 70L93.4 70L95 70L96.6 70L98.2 70L99.9 70L101.5 70L103.1 70L104.8 70L106.4 70L108 70L109.6 70L111.2 70L112.9 70L114.5 70L116.1 70L117.8 70L119.4 70L121 70L122.6 70L124.2 70L125.9 70L127.5 70L129.1 70L130.8 70L132.4 70L134 70L135.6 70L137.2 70L138.9 70L140.5 70L142.1 70L143.8 70L145.4 70L147 70L148.6 70L150.2 70L151.9 70L153.5 70L155.1 70L156.8 70L158.4 70L160 70L161.6 70L163.2 70L164.9 70L166.5 70L168.1 70L169.8 70L171.4 70L173 70L174.6 70L176.2 70L177.9 70L179.5 70L181.1 70L182.8 70L184.4 70L186 70L187.6 70L189.2 70L190.9 70L192.5 70L194.1 70L195.8 70L197.4 70L199 70L200.6 70L202.2 70L203.9 70L205.5 70L207.1 70L208.8 70L210.4 70L212 70L213.6 70L215.2 70L216.9 70L218.5 70L220.1 70L221.8 70L223.4 70L225 70L226.6 70L228.2 70L229.9 70L231.5 70L233.1 70L234.8 70L236.4 70L238 70L239.6 74.5L241.2 79L242.9 83.5L244.5 88L246.1 92.5L247.8 97L249.4 101.5L251 106L252.6 110.5L254.2 115L255.9 119.5L257.5 124L259.1 128.5L260.8 133L262.4 137.5L264 142L265.6 146.5L267.2 151L268.9 155.5L270.5 160L272.1 164.5L273.8 169L275.4 173.5L277 178L278.6 182.5L280.2 187L281.9 191.5L283.5 196L285.1 200.5L286.8 205L288.4 209.5L290 214L290 214L288.4 214L286.8 214L285.1 214L283.5 214L281.9 214L280.2 214L278.6 214L277 214L275.4 214L273.8 214L272.1 214L270.5 214L268.9 214L267.2 214L265.6 214L264 214L262.4 214L260.8 214L259.1 214L257.5 214L255.9 214L254.2 214L252.6 214L251 214L249.4 214L247.8 214L246.1 214L244.5 214L242.9 214L241.2 214L239.6 214L238 214L236.4 214L234.8 214L233.1 214L231.5 214L229.9 214L228.2 214L226.6 214L225 214L223.4 214L221.8 214L220.1 214L218.5 214L216.9 214L215.2 214L213.6 214L212 214L210.4 214L208.8 214L207.1 214L205.5 214L203.9 214L202.2 214L200.6 214L199 214L197.4 214L195.8 214L194.1 214L192.5 214L190.9 214L189.2 214L187.6 214L186 214L184.4 214L182.8 214L181.1 214L179.5 214L177.9 214L176.2 214L174.6 214L173 214L171.4 214L169.8 214L168.1 214L166.5 214L164.9 214L163.2 214L161.6 214L160 214L158.4 214L156.8 214L155.1 214L153.5 214L151.9 214L150.2 214L148.6 214L147 214L145.4 214L143.8 214L142.1 214L140.5 214L138.9 214L137.2 214L135.6 214L134 214L132.4 214L130.8 214L129.1 214L127.5 214L125.9 214L124.2 214L122.6 214L121 214L119.4 214L117.8 214L116.1 214L114.5 214L112.9 214L111.2 214L109.6 214L108 214L106.4 214L104.8 214L103.1 214L101.5 214L99.9 214L98.2 214L96.6 214L95 214L93.4 214L91.8 214L90.1 214L88.5 214L86.9 214L85.2 214L83.6 214L82 214L80.4 214L78.8 214L77.1 214L75.5 214L73.9 214L72.2 214L70.6 214L69 214L67.4 214L65.8 214L64.1 214L62.5 214L60.9 214L59.2 214L57.6 214L56 214L54.4 214L52.8 214L51.1 214L49.5 214L47.9 214L46.2 214L44.6 214L43 214L41.4 214L39.8 214L38.1 214L36.5 214L34.9 214L33.2 214L31.6 214L30 214Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M24 214H330M30 220V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M324 210.5L330 214L324 217.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M26.5 14L30 8L33.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"330\" y=\"206\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"15\">t (s)</text><text x=\"37\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"15\">v (m/s)</text><text x=\"82\" y=\"231\" text-anchor=\"middle\" fill=\"currentColor\">10</text><text x=\"134\" y=\"231\" text-anchor=\"middle\" fill=\"currentColor\">20</text><text x=\"186\" y=\"231\" text-anchor=\"middle\" fill=\"currentColor\">30</text><text x=\"238\" y=\"231\" text-anchor=\"middle\" fill=\"currentColor\">40</text><text x=\"290\" y=\"231\" text-anchor=\"middle\" fill=\"currentColor\">50</text><text x=\"26\" y=\"170.9\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"26\" y=\"122.9\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"26\" y=\"74.9\" text-anchor=\"end\" fill=\"currentColor\">6</text><text x=\"26\" y=\"26.9\" text-anchor=\"end\" fill=\"currentColor\">8</text><text x=\"26\" y=\"231\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M30 214L82 70L238 70L290 214\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/></svg>",
  "svar": {
    "varde": 240,
    "tolerans": 0,
    "enhet": "m"
  },
  "ledtradar": [
    "Sträckan motsvaras av arean under hastighetsgrafen.",
    "Området är ett parallelltrapets – eller två trianglar och en rektangel."
  ],
  "losning": "<p>Sträckan är \\(\\displaystyle\\int_0^{50}v(t)\\,dt\\), dvs. arean under grafen.</p><ol><li>\\(0\\le t\\le10\\): triangel \\(\\dfrac{10\\cdot6}{2}=30\\) m.</li><li>\\(10\\le t\\le40\\): rektangel \\(30\\cdot6=180\\) m.</li><li>\\(40\\le t\\le50\\): triangel \\(\\dfrac{10\\cdot6}{2}=30\\) m.</li></ol><p>Totalt: \\(30+180+30=240\\) m. (Eller som parallelltrapets: \\(\\dfrac{6(50+30)}{2}=240\\).)</p><p>Svar: \\(240\\) m</p>"
},
{
  "id": "int-028",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Integraler och area",
  "niva": "C",
  "poang": "1/1/0",
  "typ": "redovisning",
  "fraga": "<p>Figuren visar grafen till \\(f(x)=x^2-4x\\). Det skuggade området begränsas av grafen och \\(x\\)-axeln.</p><p>Beräkna det skuggade områdets area.</p>",
  "figur": "<svg viewBox=\"0 0 290 242\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M26 218V22M66 218V22M106 218V22M146 218V22M186 218V22M226 218V22M266 218V22M26 218H266M26 190H266M26 162H266M26 134H266M26 106H266M26 78H266M26 50H266M26 22H266\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M66 78L67 78L68 78L69 78L70 78L71 78L72 78L73 78L74 78L75 78L76 78L77 78L78 78L79 78L80 78L81 78L82 78L83 78L84 78L85 78L86 78L87 78L88 78L89 78L90 78L91 78L92 78L93 78L94 78L95 78L96 78L97 78L98 78L99 78L100 78L101 78L102 78L103 78L104 78L105 78L106 78L107 78L108 78L109 78L110 78L111 78L112 78L113 78L114 78L115 78L116 78L117 78L118 78L119 78L120 78L121 78L122 78L123 78L124 78L125 78L126 78L127 78L128 78L129 78L130 78L131 78L132 78L133 78L134 78L135 78L136 78L137 78L138 78L139 78L140 78L141 78L142 78L143 78L144 78L145 78L146 78L147 78L148 78L149 78L150 78L151 78L152 78L153 78L154 78L155 78L156 78L157 78L158 78L159 78L160 78L161 78L162 78L163 78L164 78L165 78L166 78L167 78L168 78L169 78L170 78L171 78L172 78L173 78L174 78L175 78L176 78L177 78L178 78L179 78L180 78L181 78L182 78L183 78L184 78L185 78L186 78L187 78L188 78L189 78L190 78L191 78L192 78L193 78L194 78L195 78L196 78L197 78L198 78L199 78L200 78L201 78L202 78L203 78L204 78L205 78L206 78L207 78L208 78L209 78L210 78L211 78L212 78L213 78L214 78L215 78L216 78L217 78L218 78L219 78L220 78L221 78L222 78L223 78L224 78L225 78L226 78L226 78L225 80.8L224 83.5L223 86.2L222 88.9L221 91.6L220 94.2L219 96.7L218 99.3L217 101.8L216 104.2L215 106.7L214 109.1L213 111.4L212 113.8L211 116.1L210 118.3L209 120.5L208 122.7L207 124.9L206 127L205 129.1L204 131.1L203 133.1L202 135.1L201 137.1L200 139L199 140.8L198 142.7L197 144.5L196 146.2L195 148L194 149.7L193 151.3L192 153L191 154.6L190 156.1L189 157.6L188 159.1L187 160.6L186 162L185 163.4L184 164.7L183 166L182 167.3L181 168.6L180 169.8L179 170.9L178 172.1L177 173.2L176 174.2L175 175.3L174 176.3L173 177.2L172 178.2L171 179.1L170 179.9L169 180.7L168 181.5L167 182.3L166 183L165 183.7L164 184.3L163 184.9L162 185.5L161 186.1L160 186.6L159 187L158 187.5L157 187.9L156 188.2L155 188.6L154 188.9L153 189.1L152 189.4L151 189.6L150 189.7L149 189.8L148 189.9L147 190L146 190L145 190L144 189.9L143 189.8L142 189.7L141 189.6L140 189.4L139 189.1L138 188.9L137 188.6L136 188.2L135 187.9L134 187.5L133 187L132 186.6L131 186.1L130 185.5L129 184.9L128 184.3L127 183.7L126 183L125 182.3L124 181.5L123 180.7L122 179.9L121 179.1L120 178.2L119 177.2L118 176.3L117 175.3L116 174.2L115 173.2L114 172.1L113 170.9L112 169.8L111 168.6L110 167.3L109 166L108 164.7L107 163.4L106 162L105 160.6L104 159.1L103 157.6L102 156.1L101 154.6L100 153L99 151.3L98 149.7L97 148L96 146.2L95 144.5L94 142.7L93 140.8L92 139L91 137.1L90 135.1L89 133.1L88 131.1L87 129.1L86 127L85 124.9L84 122.7L83 120.5L82 118.3L81 116.1L80 113.8L79 111.4L78 109.1L77 106.7L76 104.2L75 101.8L74 99.3L73 96.7L72 94.2L71 91.6L70 88.9L69 86.2L68 83.5L67 80.8L66 78Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M20 78H280M66 224V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M274 74.5L280 78L274 81.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M62.5 14L66 8L69.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"280\" y=\"70\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">x</text><text x=\"73\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y</text><text x=\"26\" y=\"94\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"106\" y=\"94\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"146\" y=\"94\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"186\" y=\"94\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"226\" y=\"94\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"266\" y=\"94\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"62\" y=\"222.6\" text-anchor=\"end\" fill=\"currentColor\">−5</text><text x=\"62\" y=\"194.6\" text-anchor=\"end\" fill=\"currentColor\">−4</text><text x=\"62\" y=\"166.6\" text-anchor=\"end\" fill=\"currentColor\">−3</text><text x=\"62\" y=\"138.6\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"62\" y=\"110.5\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"62\" y=\"54.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"62\" y=\"26.6\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"62\" y=\"94\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M50 28.7L51.2 32.7L52.4 36.7L53.6 40.6L54.8 44.4L56 48.2L57.2 52L58.4 55.7L59.6 59.4L60.8 63L62 66.5L63.2 70L64.4 73.5L65.6 76.9L66.8 80.2L68 83.5L69.2 86.8L70.4 90L71.6 93.1L72.8 96.2L74 99.3L75.2 102.3L76.4 105.2L77.6 108.1L78.8 111L80 113.8L81.2 116.5L82.4 119.2L83.6 121.9L84.8 124.5L86 127L87.2 129.5L88.4 131.9L89.6 134.3L90.8 136.7L92 139L93.2 141.2L94.4 143.4L95.6 145.5L96.8 147.6L98 149.7L99.2 151.7L100.4 153.6L101.6 155.5L102.8 157.3L104 159.1L105.2 160.9L106.4 162.6L107.6 164.2L108.8 165.8L110 167.3L111.2 168.8L112.4 170.2L113.6 171.6L114.8 173L116 174.3L117.2 175.5L118.4 176.7L119.6 177.8L120.8 178.9L122 179.9L123.2 180.9L124.4 181.8L125.6 182.7L126.8 183.5L128 184.3L129.2 185.1L130.4 185.7L131.6 186.4L132.8 187L134 187.5L135.2 188L136.4 188.4L137.6 188.8L138.8 189.1L140 189.4L141.2 189.6L142.4 189.8L143.6 189.9L144.8 190L146 190L147.2 190L148.4 189.9L149.6 189.8L150.8 189.6L152 189.4L153.2 189.1L154.4 188.8L155.6 188.4L156.8 188L158 187.5L159.2 187L160.4 186.4L161.6 185.7L162.8 185.1L164 184.3L165.2 183.5L166.4 182.7L167.6 181.8L168.8 180.9L170 179.9L171.2 178.9L172.4 177.8L173.6 176.7L174.8 175.5L176 174.2L177.2 173L178.4 171.6L179.6 170.2L180.8 168.8L182 167.3L183.2 165.8L184.4 164.2L185.6 162.6L186.8 160.9L188 159.1L189.2 157.3L190.4 155.5L191.6 153.6L192.8 151.7L194 149.7L195.2 147.6L196.4 145.5L197.6 143.4L198.8 141.2L200 139L201.2 136.7L202.4 134.3L203.6 131.9L204.8 129.5L206 127L207.2 124.5L208.4 121.9L209.6 119.2L210.8 116.5L212 113.8L213.2 111L214.4 108.1L215.6 105.2L216.8 102.3L218 99.3L219.2 96.2L220.4 93.1L221.6 90L222.8 86.8L224 83.5L225.2 80.2L226.4 76.9L227.6 73.5L228.8 70L230 66.5L231.2 63L232.4 59.4L233.6 55.7L234.8 52L236 48.2L237.2 44.4L238.4 40.6L239.6 36.7L240.8 32.7L242 28.7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"210\" y=\"41.6\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = x² − 4x</text></svg>",
  "svar": {
    "facit": "\\(\\dfrac{32}{3}\\approx10{,}7\\) a.e."
  },
  "ledtradar": [
    "Bestäm grafens nollställen – de blir integrationsgränser.",
    "Beräkna \\(\\int_0^4 f(x)\\,dx\\). Vilket tecken får integralen och varför?",
    "En area kan aldrig vara negativ."
  ],
  "losning": "<ol><li>Nollställen: \\(x^2-4x=x(x-4)=0\\;\\Rightarrow\\;x=0\\) och \\(x=4\\).</li><li>\\(\\displaystyle\\int_0^4\\left(x^2-4x\\right)dx=\\left[\\frac{x^3}{3}-2x^2\\right]_0^4=\\frac{64}{3}-32=-\\frac{32}{3}\\)</li><li>Integralen är negativ eftersom grafen ligger under \\(x\\)-axeln i hela intervallet. Arean är därför \\(\\left|-\\dfrac{32}{3}\\right|=\\dfrac{32}{3}\\approx10{,}7\\) a.e.</li></ol><p>Svar: \\(\\dfrac{32}{3}\\approx10{,}7\\) a.e.</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt beräknad integral, \\(-\\frac{32}{3}\\)",
    "+C<sub>B</sub> för att inse att arean är integralens absolutbelopp eftersom grafen ligger under \\(x\\)-axeln, med korrekt svar \\(\\frac{32}{3}\\) a.e."
  ]
},
{
  "id": "int-029",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Area mellan kurvor",
  "niva": "C",
  "poang": "1/2/0",
  "typ": "redovisning",
  "fraga": "<p>I figuren visas graferna till \\[f(x)=-x^2+6x-3\\quad\\text{och}\\quad g(x)=x+1\\] Graferna begränsar det skuggade området.</p><p>Beräkna det skuggade områdets area.</p>",
  "figur": "<svg viewBox=\"0 0 288 254\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M26 230V22M60 230V22M94 230V22M128 230V22M162 230V22M196 230V22M230 230V22M264 230V22M26 230H264M26 204H264M26 178H264M26 152H264M26 126H264M26 100H264M26 74H264M26 48H264M26 22H264\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M94 152L94.6 150.1L95.3 148.1L95.9 146.2L96.6 144.3L97.2 142.5L97.8 140.6L98.5 138.8L99.1 137L99.7 135.2L100.4 133.4L101 131.7L101.7 129.9L102.3 128.2L102.9 126.5L103.6 124.8L104.2 123.1L104.8 121.5L105.5 119.9L106.1 118.2L106.8 116.7L107.4 115.1L108 113.5L108.7 112L109.3 110.5L109.9 109L110.6 107.5L111.2 106L111.8 104.6L112.5 103.1L113.1 101.7L113.8 100.3L114.4 99L115 97.6L115.7 96.3L116.3 94.9L116.9 93.6L117.6 92.4L118.2 91.1L118.9 89.9L119.5 88.6L120.1 87.4L120.8 86.2L121.4 85.1L122.1 83.9L122.7 82.8L123.3 81.6L124 80.5L124.6 79.5L125.2 78.4L125.9 77.4L126.5 76.3L127.2 75.3L127.8 74.3L128.4 73.4L129.1 72.4L129.7 71.5L130.3 70.5L131 69.6L131.6 68.8L132.2 67.9L132.9 67.1L133.5 66.2L134.2 65.4L134.8 64.6L135.4 63.9L136.1 63.1L136.7 62.4L137.3 61.7L138 61L138.6 60.3L139.3 59.6L139.9 59L140.5 58.4L141.2 57.8L141.8 57.2L142.4 56.6L143.1 56L143.7 55.5L144.4 55L145 54.5L145.6 54L146.3 53.6L146.9 53.1L147.6 52.7L148.2 52.3L148.8 51.9L149.5 51.5L150.1 51.2L150.7 50.9L151.4 50.5L152 50.2L152.7 50L153.3 49.7L153.9 49.5L154.6 49.2L155.2 49L155.8 48.9L156.5 48.7L157.1 48.5L157.8 48.4L158.4 48.3L159 48.2L159.7 48.1L160.3 48.1L160.9 48L161.6 48L162.2 48L162.9 48L163.5 48L164.1 48.1L164.8 48.2L165.4 48.3L166 48.4L166.7 48.5L167.3 48.6L167.9 48.8L168.6 49L169.2 49.2L169.9 49.4L170.5 49.6L171.1 49.9L171.8 50.1L172.4 50.4L173.1 50.7L173.7 51.1L174.3 51.4L175 51.8L175.6 52.2L176.2 52.6L176.9 53L177.5 53.4L178.1 53.9L178.8 54.3L179.4 54.8L180.1 55.3L180.7 55.9L181.3 56.4L182 57L182.6 57.6L183.2 58.2L183.9 58.8L184.5 59.4L185.2 60.1L185.8 60.7L186.4 61.4L187.1 62.1L187.7 62.9L188.4 63.6L189 64.4L189.6 65.2L190.3 66L190.9 66.8L191.5 67.6L192.2 68.5L192.8 69.4L193.4 70.2L194.1 71.2L194.7 72.1L195.4 73L196 74L196 74L195.4 74.5L194.7 75L194.1 75.5L193.4 76L192.8 76.4L192.2 76.9L191.5 77.4L190.9 77.9L190.3 78.4L189.6 78.9L189 79.4L188.4 79.8L187.7 80.3L187.1 80.8L186.4 81.3L185.8 81.8L185.2 82.3L184.5 82.8L183.9 83.3L183.2 83.8L182.6 84.2L182 84.7L181.3 85.2L180.7 85.7L180.1 86.2L179.4 86.7L178.8 87.2L178.1 87.7L177.5 88.1L176.9 88.6L176.2 89.1L175.6 89.6L175 90.1L174.3 90.6L173.7 91.1L173.1 91.5L172.4 92L171.8 92.5L171.1 93L170.5 93.5L169.9 94L169.2 94.5L168.6 95L167.9 95.5L167.3 95.9L166.7 96.4L166 96.9L165.4 97.4L164.8 97.9L164.1 98.4L163.5 98.9L162.9 99.3L162.2 99.8L161.6 100.3L160.9 100.8L160.3 101.3L159.7 101.8L159 102.3L158.4 102.8L157.8 103.2L157.1 103.7L156.5 104.2L155.8 104.7L155.2 105.2L154.6 105.7L153.9 106.2L153.3 106.7L152.7 107.1L152 107.6L151.4 108.1L150.7 108.6L150.1 109.1L149.5 109.6L148.8 110.1L148.2 110.6L147.6 111L146.9 111.5L146.3 112L145.6 112.5L145 113L144.4 113.5L143.7 114L143.1 114.5L142.4 115L141.8 115.4L141.2 115.9L140.5 116.4L139.9 116.9L139.3 117.4L138.6 117.9L138 118.4L137.3 118.9L136.7 119.3L136.1 119.8L135.4 120.3L134.8 120.8L134.2 121.3L133.5 121.8L132.9 122.3L132.2 122.8L131.6 123.2L131 123.7L130.3 124.2L129.7 124.7L129.1 125.2L128.4 125.7L127.8 126.2L127.2 126.7L126.5 127.1L125.9 127.6L125.2 128.1L124.6 128.6L124 129.1L123.3 129.6L122.7 130.1L122.1 130.6L121.4 131L120.8 131.5L120.1 132L119.5 132.5L118.9 133L118.2 133.5L117.6 134L116.9 134.4L116.3 134.9L115.7 135.4L115 135.9L114.4 136.4L113.8 136.9L113.1 137.4L112.5 137.9L111.8 138.3L111.2 138.8L110.6 139.3L109.9 139.8L109.3 140.3L108.7 140.8L108 141.3L107.4 141.8L106.8 142.2L106.1 142.7L105.5 143.2L104.8 143.7L104.2 144.2L103.6 144.7L102.9 145.2L102.3 145.7L101.7 146.2L101 146.6L100.4 147.1L99.7 147.6L99.1 148.1L98.5 148.6L97.8 149.1L97.2 149.6L96.6 150L95.9 150.5L95.3 151L94.6 151.5L94 152Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M20 204H278M60 236V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M272 200.5L278 204L272 207.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M56.5 14L60 8L63.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"278\" y=\"196\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">x</text><text x=\"67\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y</text><text x=\"26\" y=\"220\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"94\" y=\"220\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"128\" y=\"220\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"162\" y=\"220\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"196\" y=\"220\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"230\" y=\"220\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"264\" y=\"220\" text-anchor=\"middle\" fill=\"currentColor\">6</text><text x=\"56\" y=\"234.6\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"56\" y=\"182.6\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"56\" y=\"156.6\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"56\" y=\"130.6\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"56\" y=\"104.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"56\" y=\"78.5\" text-anchor=\"end\" fill=\"currentColor\">5</text><text x=\"56\" y=\"52.5\" text-anchor=\"end\" fill=\"currentColor\">6</text><text x=\"56\" y=\"26.6\" text-anchor=\"end\" fill=\"currentColor\">7</text><text x=\"56\" y=\"220\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M77 210.5L78.1 206.4L79.2 202.3L80.3 198.3L81.3 194.3L82.4 190.4L83.5 186.6L84.6 182.8L85.7 179L86.8 175.3L87.8 171.7L88.9 168.1L90 164.6L91.1 161.1L92.2 157.7L93.3 154.3L94.3 151L95.4 147.7L96.5 144.5L97.6 141.3L98.7 138.2L99.8 135.1L100.8 132.1L101.9 129.2L103 126.3L104.1 123.4L105.2 120.6L106.3 117.9L107.3 115.2L108.4 112.5L109.5 110L110.6 107.4L111.7 105L112.8 102.5L113.8 100.1L114.9 97.8L116 95.6L117.1 93.3L118.2 91.2L119.3 89.1L120.3 87L121.4 85L122.5 83.1L123.6 81.2L124.7 79.3L125.8 77.5L126.9 75.8L127.9 74.1L129 72.5L130.1 70.9L131.2 69.4L132.3 67.9L133.4 66.5L134.4 65.1L135.5 63.8L136.6 62.5L137.7 61.3L138.8 60.1L139.9 59L140.9 58L142 57L143.1 56L144.2 55.1L145.3 54.3L146.4 53.5L147.4 52.8L148.5 52.1L149.6 51.5L150.7 50.9L151.8 50.3L152.9 49.9L153.9 49.5L155 49.1L156.1 48.8L157.2 48.5L158.3 48.3L159.4 48.2L160.4 48.1L161.5 48L162.6 48L163.7 48.1L164.8 48.2L165.9 48.3L167 48.6L168 48.8L169.1 49.1L170.2 49.5L171.3 49.9L172.4 50.4L173.5 51L174.5 51.5L175.6 52.2L176.7 52.9L177.8 53.6L178.9 54.4L180 55.3L181 56.2L182.1 57.1L183.2 58.1L184.3 59.2L185.4 60.3L186.5 61.5L187.5 62.7L188.6 63.9L189.7 65.3L190.8 66.6L191.9 68.1L193 69.6L194 71.1L195.1 72.7L196.2 74.3L197.3 76L198.4 77.8L199.5 79.6L200.5 81.4L201.6 83.3L202.7 85.3L203.8 87.3L204.9 89.4L206 91.5L207.1 93.6L208.1 95.9L209.2 98.1L210.3 100.5L211.4 102.9L212.5 105.3L213.6 107.8L214.6 110.3L215.7 112.9L216.8 115.6L217.9 118.2L219 121L220.1 123.8L221.1 126.7L222.2 129.6L223.3 132.5L224.4 135.5L225.5 138.6L226.6 141.7L227.6 144.9L228.7 148.1L229.8 151.4L230.9 154.7L232 158.1L233.1 161.6L234.1 165.1L235.2 168.6L236.3 172.2L237.4 175.8L238.5 179.6L239.6 183.3L240.6 187.1L241.7 191L242.8 194.9L243.9 198.9L245 202.9L246.1 206.9L247.1 211.1L248.2 215.2L249.3 219.5L250.4 223.8\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><path d=\"M26 204L27.4 202.9L28.8 201.9L30.2 200.8L31.6 199.7L33 198.6L34.4 197.6L35.8 196.5L37.2 195.4L38.6 194.3L40 193.3L41.4 192.2L42.8 191.1L44.2 190.1L45.6 189L47 187.9L48.4 186.8L49.8 185.8L51.2 184.7L52.6 183.6L54 182.5L55.5 181.5L56.9 180.4L58.3 179.3L59.7 178.3L61.1 177.2L62.5 176.1L63.9 175L65.3 174L66.7 172.9L68.1 171.8L69.5 170.8L70.9 169.7L72.3 168.6L73.7 167.5L75.1 166.5L76.5 165.4L77.9 164.3L79.3 163.2L80.7 162.2L82.1 161.1L83.5 160L84.9 159L86.3 157.9L87.7 156.8L89.1 155.7L90.5 154.7L91.9 153.6L93.3 152.5L94.7 151.4L96.1 150.4L97.5 149.3L98.9 148.2L100.3 147.2L101.7 146.1L103.1 145L104.5 143.9L105.9 142.9L107.3 141.8L108.7 140.7L110.2 139.7L111.6 138.6L113 137.5L114.4 136.4L115.8 135.4L117.2 134.3L118.6 133.2L120 132.1L121.4 131.1L122.8 130L124.2 128.9L125.6 127.9L127 126.8L128.4 125.7L129.8 124.6L131.2 123.6L132.6 122.5L134 121.4L135.4 120.3L136.8 119.3L138.2 118.2L139.6 117.1L141 116.1L142.4 115L143.8 113.9L145.2 112.8L146.6 111.8L148 110.7L149.4 109.6L150.8 108.5L152.2 107.5L153.6 106.4L155 105.3L156.4 104.3L157.8 103.2L159.2 102.1L160.6 101L162 100L163.4 98.9L164.8 97.8L166.2 96.8L167.7 95.7L169.1 94.6L170.5 93.5L171.9 92.5L173.3 91.4L174.7 90.3L176.1 89.2L177.5 88.2L178.9 87.1L180.3 86L181.7 85L183.1 83.9L184.5 82.8L185.9 81.7L187.3 80.7L188.7 79.6L190.1 78.5L191.5 77.4L192.9 76.4L194.3 75.3L195.7 74.2L197.1 73.2L198.5 72.1L199.9 71L201.3 69.9L202.7 68.9L204.1 67.8L205.5 66.7L206.9 65.6L208.3 64.6L209.7 63.5L211.1 62.4L212.5 61.4L213.9 60.3L215.3 59.2L216.7 58.1L218.1 57.1L219.5 56L220.9 54.9L222.4 53.8L223.8 52.8L225.2 51.7L226.6 50.6L228 49.6L229.4 48.5L230.8 47.4L232.2 46.3L233.6 45.3L235 44.2L236.4 43.1L237.8 42.1L239.2 41L240.6 39.9L242 38.8L243.4 37.8L244.8 36.7L246.2 35.6L247.6 34.5L249 33.5L250.4 32.4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><circle cx=\"94\" cy=\"152\" r=\"2.8\" fill=\"currentColor\"/><circle cx=\"196\" cy=\"74\" r=\"2.8\" fill=\"currentColor\"/><text x=\"128\" y=\"38.9\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = f(x)</text><text x=\"250.4\" y=\"23.3\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = g(x)</text></svg>",
  "svar": {
    "facit": "\\(4{,}5\\) a.e."
  },
  "ledtradar": [
    "Bestäm skärningspunkterna algebraiskt genom att lösa \\(f(x)=g(x)\\).",
    "Arean är \\(\\int_a^b\\big(f(x)-g(x)\\big)\\,dx\\) eftersom \\(f\\) ligger överst.",
    "Förenkla \\(f(x)-g(x)\\) innan du integrerar."
  ],
  "losning": "<ol><li>Skärning: \\(-x^2+6x-3=x+1\\;\\Leftrightarrow\\;x^2-5x+4=0\\;\\Leftrightarrow\\;x=\\dfrac52\\pm\\sqrt{\\dfrac{25}{4}-4}=\\dfrac52\\pm\\dfrac32\\), dvs. \\(x_1=1\\) och \\(x_2=4\\).</li><li>I intervallet ligger \\(f\\) överst (t.ex. \\(f(2)=5\\gt g(2)=3\\)): \\(f(x)-g(x)=-x^2+5x-4\\).</li><li>\\(\\displaystyle A=\\int_1^4\\left(-x^2+5x-4\\right)dx=\\left[-\\frac{x^3}{3}+\\frac{5x^2}{2}-4x\\right]_1^4\\)</li><li>\\(=\\left(-\\dfrac{64}{3}+40-16\\right)-\\left(-\\dfrac13+\\dfrac52-4\\right)=\\dfrac83-\\left(-\\dfrac{11}{6}\\right)=\\dfrac{16}{6}+\\dfrac{11}{6}=\\dfrac{27}{6}=4{,}5\\)</li></ol><p>Svar: \\(4{,}5\\) a.e.</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt bestämda skärningspunkter, \\(x=1\\) och \\(x=4\\)",
    "+C<sub>PL</sub> för korrekt uppställd integral, \\(\\int_1^4\\big(f(x)-g(x)\\big)\\,dx\\)",
    "+C<sub>P</sub> för korrekt beräknad area, \\(4{,}5\\) a.e."
  ]
},
{
  "id": "int-030",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Integraler i tillämpningar",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Ett träd är \\(2{,}0\\) m högt när det planteras. Trädets höjd ökar med hastigheten \\[h'(t)=0{,}4+0{,}06t\\ \\text{meter per år}\\] där \\(t\\) är tiden i år efter planteringen.</p><p>Hur högt är trädet 10 år efter planteringen enligt modellen?</p>",
  "svar": {
    "varde": 9,
    "tolerans": 0.01,
    "enhet": "m"
  },
  "ledtradar": [
    "Trädets tillväxt under de 10 åren är \\(\\int_0^{10}h'(t)\\,dt\\).",
    "Glöm inte att lägga till trädets höjd vid planteringen."
  ],
  "losning": "<ol><li>Tillväxten under 10 år: \\(\\displaystyle\\int_0^{10}\\left(0{,}4+0{,}06t\\right)dt=\\Big[0{,}4t+0{,}03t^2\\Big]_0^{10}=4+3=7\\) m.</li><li>Höjd efter 10 år: \\(2{,}0+7=9{,}0\\) m.</li></ol><p>Svar: \\(9{,}0\\) m</p>"
},
{
  "id": "int-031",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Integraler i tillämpningar",
  "niva": "C",
  "poang": "1/2/0",
  "typ": "redovisning",
  "fraga": "<p>En patient får ett läkemedel via dropp. Läkemedlet tillförs med hastigheten \\[r(t)=50e^{-0{,}2t}\\ \\text{mg/h}\\] där \\(t\\) är tiden i timmar efter att droppet startade.</p><ol type='a'><li>Hur mycket läkemedel tillförs under de första 5 timmarna?</li><li>Efter hur lång tid har totalt 200 mg tillförts?</li></ol>",
  "svar": {
    "facit": "a) Ca \\(158\\) mg &nbsp; b) Efter ca \\(8{,}0\\) h (\\(5\\ln5\\) h)"
  },
  "ledtradar": [
    "Mängden som tillförs mellan \\(t=0\\) och \\(t=T\\) är \\(\\int_0^T r(t)\\,dt\\).",
    "En primitiv funktion till \\(50e^{-0{,}2t}\\) är \\(\\dfrac{50e^{-0{,}2t}}{-0{,}2}=-250e^{-0{,}2t}\\).",
    "b) Ställ upp \\(\\int_0^T r(t)\\,dt=200\\) och lös ekvationen med naturlig logaritm."
  ],
  "losning": "<ol type='a'><li>\\(\\displaystyle\\int_0^5 50e^{-0{,}2t}\\,dt=\\Big[-250e^{-0{,}2t}\\Big]_0^5=-250e^{-1}+250e^{0}=250\\left(1-e^{-1}\\right)\\approx158\\) mg</li><li>\\(\\displaystyle\\int_0^T 50e^{-0{,}2t}\\,dt=250\\left(1-e^{-0{,}2T}\\right)\\). \\[250\\left(1-e^{-0{,}2T}\\right)=200\\;\\Leftrightarrow\\;e^{-0{,}2T}=0{,}2\\;\\Leftrightarrow\\;-0{,}2T=\\ln0{,}2\\;\\Leftrightarrow\\;T=\\frac{\\ln0{,}2}{-0{,}2}=5\\ln5\\approx8{,}0\\]</li></ol><p>Svar: a) ca 158 mg &nbsp; b) efter ca 8,0 timmar</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt uppställd integral, \\(\\int_0^5 50e^{-0{,}2t}\\,dt\\)",
    "+C<sub>P</sub> för korrekt primitiv funktion och korrekt svar på a), ca \\(158\\) mg",
    "+C<sub>PL</sub> för korrekt lösning av b), ca \\(8{,}0\\) h"
  ]
},
{
  "id": "int-032",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Motivering av integrationsmetoder",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "redovisning",
  "fraga": "<ol type='a'><li>Beräkna \\(\\displaystyle\\int_0^2 3^x\\,dx\\). Svara med två decimaler.</li><li>I formelbladet står att \\(\\dfrac{a^x}{\\ln a}+C\\) är de primitiva funktionerna till \\(a^x\\) (\\(a\\gt0,\\ a\\ne1\\)). Motivera varför detta stämmer.</li></ol>",
  "svar": {
    "facit": "a) \\(\\dfrac{8}{\\ln3}\\approx7{,}28\\) &nbsp; b) \\(\\dfrac{d}{dx}\\left(\\dfrac{a^x}{\\ln a}\\right)=\\dfrac{a^x\\ln a}{\\ln a}=a^x\\)"
  },
  "ledtradar": [
    "a) Använd formeln från formelbladet med \\(a=3\\) och sätt in gränserna.",
    "b) En funktion \\(F\\) är en primitiv funktion till \\(f\\) om \\(F'(x)=f(x)\\). Derivera \\(\\dfrac{a^x}{\\ln a}\\).",
    "b) \\(\\ln a\\) är en konstant. Derivatan av \\(a^x\\) är \\(a^x\\ln a\\)."
  ],
  "losning": "<ol type='a'><li>\\(\\displaystyle\\int_0^2 3^x\\,dx=\\left[\\frac{3^x}{\\ln3}\\right]_0^2=\\frac{9}{\\ln3}-\\frac{1}{\\ln3}=\\frac{8}{\\ln3}\\approx7{,}28\\)</li><li>\\(F\\) är en primitiv funktion till \\(f\\) om \\(F'(x)=f(x)\\). Låt \\(F(x)=\\dfrac{a^x}{\\ln a}+C\\). Eftersom \\(\\ln a\\) är en konstant (skild från noll då \\(a\\ne1\\)) och derivatan av \\(a^x\\) är \\(a^x\\ln a\\) får vi \\[F'(x)=\\frac{1}{\\ln a}\\cdot a^x\\ln a+0=a^x\\] Alltså är \\(F\\) en primitiv funktion till \\(a^x\\). Eftersom två primitiva funktioner till samma funktion bara skiljer sig åt med en konstant, är detta samtliga primitiva funktioner.<br>(Alternativ motivering: \\(a^x=e^{x\\ln a}\\), som är på formen \\(e^{kx}\\) med \\(k=\\ln a\\). En primitiv funktion är \\(\\dfrac{e^{kx}}{k}=\\dfrac{a^x}{\\ln a}\\).)</li></ol><p>Svar: a) \\(\\approx7{,}28\\)</p>",
  "bedomning": [
    "+C<sub>P</sub> för korrekt beräknad integral i a), ca \\(7{,}28\\)",
    "+A<sub>R</sub> för en fullständig motivering i b), t.ex. genom att visa att derivatan av \\(\\frac{a^x}{\\ln a}\\) är \\(a^x\\) med hänvisning till att \\(\\ln a\\) är en konstant"
  ]
},
{
  "id": "int-033",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Integraler och area",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "redovisning",
  "fraga": "<p>Figuren visar grafen till \\(y=x^3\\). Alva ska beräkna den skuggade arean och skriver:</p><p style='text-align:center'>”Arean är \\(\\displaystyle\\int_{-1}^{2}x^3\\,dx\\).”</p><p>Beräkna Alvas integral och bestäm den skuggade arean. Förklara varför resultaten skiljer sig åt.</p>",
  "figur": "<svg viewBox=\"0 0 310 226\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M26 202V22M78 202V22M130 202V22M182 202V22M234 202V22M286 202V22M26 202H286M26 184H286M26 166H286M26 148H286M26 130H286M26 112H286M26 94H286M26 76H286M26 58H286M26 40H286M26 22H286\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M78 166L78.3 166L78.7 166L79 166L79.3 166L79.6 166L80 166L80.3 166L80.6 166L80.9 166L81.2 166L81.6 166L81.9 166L82.2 166L82.5 166L82.9 166L83.2 166L83.5 166L83.8 166L84.2 166L84.5 166L84.8 166L85.2 166L85.5 166L85.8 166L86.1 166L86.5 166L86.8 166L87.1 166L87.4 166L87.8 166L88.1 166L88.4 166L88.7 166L89 166L89.4 166L89.7 166L90 166L90.4 166L90.7 166L91 166L91.3 166L91.6 166L92 166L92.3 166L92.6 166L93 166L93.3 166L93.6 166L93.9 166L94.2 166L94.6 166L94.9 166L95.2 166L95.5 166L95.9 166L96.2 166L96.5 166L96.9 166L97.2 166L97.5 166L97.8 166L98.1 166L98.5 166L98.8 166L99.1 166L99.5 166L99.8 166L100.1 166L100.4 166L100.8 166L101.1 166L101.4 166L101.7 166L102 166L102.4 166L102.7 166L103 166L103.4 166L103.7 166L104 166L104.3 166L104.6 166L105 166L105.3 166L105.6 166L106 166L106.3 166L106.6 166L106.9 166L107.2 166L107.6 166L107.9 166L108.2 166L108.5 166L108.9 166L109.2 166L109.5 166L109.9 166L110.2 166L110.5 166L110.8 166L111.1 166L111.5 166L111.8 166L112.1 166L112.5 166L112.8 166L113.1 166L113.4 166L113.8 166L114.1 166L114.4 166L114.7 166L115 166L115.4 166L115.7 166L116 166L116.4 166L116.7 166L117 166L117.3 166L117.6 166L118 166L118.3 166L118.6 166L119 166L119.3 166L119.6 166L119.9 166L120.2 166L120.6 166L120.9 166L121.2 166L121.5 166L121.9 166L122.2 166L122.5 166L122.9 166L123.2 166L123.5 166L123.8 166L124.1 166L124.5 166L124.8 166L125.1 166L125.5 166L125.8 166L126.1 166L126.4 166L126.8 166L127.1 166L127.4 166L127.7 166L128.1 166L128.4 166L128.7 166L129 166L129.4 166L129.7 166L130 166L130 166L129.7 166L129.4 166L129 166L128.7 166L128.4 166L128.1 166L127.7 166L127.4 166L127.1 166L126.8 166L126.4 166L126.1 166L125.8 166L125.5 166L125.1 166L124.8 166L124.5 166L124.1 166L123.8 166L123.5 166L123.2 166L122.9 166L122.5 166.1L122.2 166.1L121.9 166.1L121.5 166.1L121.2 166.1L120.9 166.1L120.6 166.1L120.2 166.1L119.9 166.1L119.6 166.1L119.3 166.2L119 166.2L118.6 166.2L118.3 166.2L118 166.2L117.6 166.2L117.3 166.3L117 166.3L116.7 166.3L116.4 166.3L116 166.3L115.7 166.4L115.4 166.4L115 166.4L114.7 166.5L114.4 166.5L114.1 166.5L113.8 166.5L113.4 166.6L113.1 166.6L112.8 166.7L112.5 166.7L112.1 166.7L111.8 166.8L111.5 166.8L111.1 166.9L110.8 166.9L110.5 166.9L110.2 167L109.9 167L109.5 167.1L109.2 167.2L108.9 167.2L108.5 167.3L108.2 167.3L107.9 167.4L107.6 167.4L107.2 167.5L106.9 167.6L106.6 167.6L106.3 167.7L106 167.8L105.6 167.9L105.3 167.9L105 168L104.6 168.1L104.3 168.2L104 168.2L103.7 168.3L103.4 168.4L103 168.5L102.7 168.6L102.4 168.7L102 168.8L101.7 168.9L101.4 169L101.1 169.1L100.8 169.2L100.4 169.3L100.1 169.4L99.8 169.5L99.5 169.7L99.1 169.8L98.8 169.9L98.5 170L98.1 170.1L97.8 170.3L97.5 170.4L97.2 170.5L96.9 170.7L96.5 170.8L96.2 170.9L95.9 171.1L95.5 171.2L95.2 171.4L94.9 171.5L94.6 171.7L94.2 171.8L93.9 172L93.6 172.2L93.3 172.3L93 172.5L92.6 172.7L92.3 172.9L92 173L91.6 173.2L91.3 173.4L91 173.6L90.7 173.8L90.4 174L90 174.2L89.7 174.4L89.4 174.6L89 174.8L88.7 175L88.4 175.2L88.1 175.4L87.8 175.7L87.4 175.9L87.1 176.1L86.8 176.3L86.5 176.6L86.1 176.8L85.8 177.1L85.5 177.3L85.2 177.5L84.8 177.8L84.5 178.1L84.2 178.3L83.8 178.6L83.5 178.9L83.2 179.1L82.9 179.4L82.5 179.7L82.2 180L81.9 180.2L81.6 180.5L81.2 180.8L80.9 181.1L80.6 181.4L80.3 181.7L80 182L79.6 182.4L79.3 182.7L79 183L78.7 183.3L78.3 183.7L78 184Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M130 166L130.7 166L131.3 166L131.9 166L132.6 166L133.2 166L133.9 166L134.6 166L135.2 166L135.8 166L136.5 166L137.2 166L137.8 165.9L138.4 165.9L139.1 165.9L139.8 165.9L140.4 165.9L141.1 165.8L141.7 165.8L142.3 165.8L143 165.7L143.7 165.7L144.3 165.6L144.9 165.6L145.6 165.5L146.2 165.5L146.9 165.4L147.6 165.3L148.2 165.2L148.8 165.1L149.5 165.1L150.2 165L150.8 164.8L151.4 164.7L152.1 164.6L152.8 164.5L153.4 164.4L154 164.2L154.7 164.1L155.3 163.9L156 163.8L156.7 163.6L157.3 163.4L158 163.2L158.6 163L159.2 162.8L159.9 162.6L160.5 162.3L161.2 162.1L161.8 161.9L162.5 161.6L163.2 161.3L163.8 161.1L164.5 160.8L165.1 160.5L165.8 160.2L166.4 159.8L167 159.5L167.7 159.1L168.3 158.8L169 158.4L169.7 158L170.3 157.6L171 157.2L171.6 156.8L172.2 156.3L172.9 155.9L173.5 155.4L174.2 154.9L174.8 154.5L175.5 153.9L176.2 153.4L176.8 152.9L177.5 152.3L178.1 151.8L178.8 151.2L179.4 150.6L180 150L180.7 149.3L181.3 148.7L182 148L182.7 147.3L183.3 146.6L184 145.9L184.6 145.2L185.2 144.4L185.9 143.6L186.5 142.8L187.2 142L187.8 141.2L188.5 140.4L189.2 139.5L189.8 138.6L190.5 137.7L191.1 136.8L191.8 135.9L192.4 134.9L193 133.9L193.7 132.9L194.3 131.9L195 130.8L195.7 129.8L196.3 128.7L197 127.6L197.6 126.5L198.2 125.3L198.9 124.1L199.5 122.9L200.2 121.7L200.8 120.5L201.5 119.2L202.2 117.9L202.8 116.6L203.5 115.3L204.1 113.9L204.8 112.5L205.4 111.1L206 109.7L206.7 108.2L207.3 106.8L208 105.2L208.7 103.7L209.3 102.2L210 100.6L210.6 99L211.2 97.3L211.9 95.7L212.5 94L213.2 92.3L213.8 90.5L214.5 88.8L215.2 87L215.8 85.1L216.5 83.3L217.1 81.4L217.8 79.5L218.4 77.6L219 75.6L219.7 73.6L220.3 71.6L221 69.5L221.7 67.4L222.3 65.3L223 63.2L223.6 61L224.2 58.8L224.9 56.6L225.5 54.3L226.2 52L226.8 49.7L227.5 47.3L228.2 45L228.8 42.5L229.5 40.1L230.1 37.6L230.8 35.1L231.4 32.5L232 29.9L232.7 27.3L233.3 24.7L234 22L234 166L233.3 166L232.7 166L232 166L231.4 166L230.8 166L230.1 166L229.5 166L228.8 166L228.2 166L227.5 166L226.8 166L226.2 166L225.5 166L224.9 166L224.2 166L223.6 166L223 166L222.3 166L221.7 166L221 166L220.3 166L219.7 166L219 166L218.4 166L217.8 166L217.1 166L216.5 166L215.8 166L215.2 166L214.5 166L213.8 166L213.2 166L212.5 166L211.9 166L211.2 166L210.6 166L210 166L209.3 166L208.7 166L208 166L207.3 166L206.7 166L206 166L205.4 166L204.8 166L204.1 166L203.5 166L202.8 166L202.2 166L201.5 166L200.8 166L200.2 166L199.5 166L198.9 166L198.2 166L197.6 166L197 166L196.3 166L195.7 166L195 166L194.3 166L193.7 166L193 166L192.4 166L191.8 166L191.1 166L190.5 166L189.8 166L189.2 166L188.5 166L187.8 166L187.2 166L186.5 166L185.9 166L185.2 166L184.6 166L184 166L183.3 166L182.7 166L182 166L181.3 166L180.7 166L180 166L179.4 166L178.8 166L178.1 166L177.5 166L176.8 166L176.2 166L175.5 166L174.8 166L174.2 166L173.5 166L172.9 166L172.2 166L171.6 166L171 166L170.3 166L169.7 166L169 166L168.3 166L167.7 166L167 166L166.4 166L165.8 166L165.1 166L164.5 166L163.8 166L163.2 166L162.5 166L161.8 166L161.2 166L160.5 166L159.9 166L159.2 166L158.6 166L158 166L157.3 166L156.7 166L156 166L155.3 166L154.7 166L154 166L153.4 166L152.8 166L152.1 166L151.4 166L150.8 166L150.2 166L149.5 166L148.8 166L148.2 166L147.6 166L146.9 166L146.2 166L145.6 166L144.9 166L144.3 166L143.7 166L143 166L142.3 166L141.7 166L141.1 166L140.4 166L139.8 166L139.1 166L138.4 166L137.8 166L137.2 166L136.5 166L135.8 166L135.2 166L134.6 166L133.9 166L133.2 166L132.6 166L131.9 166L131.3 166L130.7 166L130 166Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M20 166H300M130 208V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M294 162.5L300 166L294 169.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M126.5 14L130 8L133.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"300\" y=\"158\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">x</text><text x=\"137\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y</text><text x=\"26\" y=\"182\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"78\" y=\"182\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"182\" y=\"182\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"234\" y=\"182\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"286\" y=\"182\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"126\" y=\"206.6\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"126\" y=\"134.6\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"126\" y=\"98.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"126\" y=\"62.5\" text-anchor=\"end\" fill=\"currentColor\">6</text><text x=\"126\" y=\"26.6\" text-anchor=\"end\" fill=\"currentColor\">8</text><text x=\"126\" y=\"182\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M66.6 198.7L67.6 197.1L68.7 195.5L69.7 194L70.8 192.5L71.9 191.1L72.9 189.8L74 188.5L75.1 187.2L76.1 186L77.2 184.9L78.3 183.7L79.3 182.7L80.4 181.6L81.4 180.7L82.5 179.7L83.6 178.8L84.6 178L85.7 177.1L86.8 176.4L87.8 175.6L88.9 174.9L89.9 174.2L91 173.6L92.1 173L93.1 172.4L94.2 171.9L95.3 171.4L96.3 170.9L97.4 170.4L98.4 170L99.5 169.6L100.6 169.3L101.6 168.9L102.7 168.6L103.8 168.3L104.8 168L105.9 167.8L106.9 167.6L108 167.4L109.1 167.2L110.1 167L111.2 166.9L112.3 166.7L113.3 166.6L114.4 166.5L115.4 166.4L116.5 166.3L117.6 166.2L118.6 166.2L119.7 166.1L120.8 166.1L121.8 166.1L122.9 166L123.9 166L125 166L126.1 166L127.1 166L128.2 166L129.3 166L130.3 166L131.4 166L132.5 166L133.5 166L134.6 166L135.6 166L136.7 166L137.8 165.9L138.8 165.9L139.9 165.9L141 165.8L142 165.8L143.1 165.7L144.1 165.6L145.2 165.6L146.3 165.4L147.3 165.3L148.4 165.2L149.5 165.1L150.5 164.9L151.6 164.7L152.6 164.5L153.7 164.3L154.8 164.1L155.8 163.8L156.9 163.5L158 163.2L159 162.9L160.1 162.5L161.1 162.1L162.2 161.7L163.3 161.3L164.3 160.8L165.4 160.3L166.5 159.8L167.5 159.2L168.6 158.6L169.6 158L170.7 157.4L171.8 156.7L172.8 155.9L173.9 155.2L175 154.4L176 153.5L177.1 152.6L178.1 151.7L179.2 150.7L180.3 149.7L181.3 148.7L182.4 147.6L183.5 146.4L184.5 145.2L185.6 144L186.7 142.7L187.7 141.4L188.8 140L189.8 138.6L190.9 137.1L192 135.5L193 133.9L194.1 132.3L195.2 130.6L196.2 128.8L197.3 127L198.3 125.1L199.4 123.2L200.5 121.2L201.5 119.1L202.6 117L203.7 114.8L204.7 112.6L205.8 110.3L206.8 107.9L207.9 105.5L209 103L210 100.4L211.1 97.7L212.2 95L213.2 92.2L214.3 89.4L215.3 86.4L216.4 83.4L217.5 80.3L218.5 77.2L219.6 73.9L220.7 70.6L221.7 67.2L222.8 63.7L223.8 60.2L224.9 56.6L226 52.8L227 49L228.1 45.2L229.2 41.2L230.2 37.1L231.3 33L232.3 28.7L233.4 24.4L234.5 20L235.5 15.5L236.6 10.9\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"240.2\" y=\"36.4\" text-anchor=\"start\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = x³</text></svg>",
  "svar": {
    "facit": "Integralen är \\(3{,}75\\), arean är \\(4{,}25\\) a.e. Integralen räknar området under \\(x\\)-axeln som negativt."
  },
  "ledtradar": [
    "Beräkna \\(\\int_{-1}^{2}x^3\\,dx\\) med primitiven \\(\\dfrac{x^4}{4}\\).",
    "Dela upp området vid \\(x=0\\). Vad blir \\(\\int_{-1}^{0}x^3\\,dx\\)? Vilket tecken har den?",
    "Area räknas alltid positivt."
  ],
  "losning": "<ol><li>Alvas integral: \\(\\displaystyle\\int_{-1}^{2}x^3\\,dx=\\left[\\frac{x^4}{4}\\right]_{-1}^{2}=\\frac{16}{4}-\\frac{1}{4}=\\frac{15}{4}=3{,}75\\).</li><li>Dela upp vid nollstället \\(x=0\\): \\(\\displaystyle\\int_{-1}^{0}x^3\\,dx=0-\\frac14=-\\frac14\\) och \\(\\displaystyle\\int_0^2x^3\\,dx=4\\).</li><li>Den skuggade arean är \\(\\dfrac14+4=\\dfrac{17}{4}=4{,}25\\) a.e.</li><li>Förklaring: För \\(-1\\le x\\lt0\\) är \\(x^3\\lt0\\), så den delen av området ger ett negativt bidrag till integralen. Integralen blir därför arean ovanför \\(x\\)-axeln minus arean under, \\(4-0{,}25=3{,}75\\), medan den totala arean är summan \\(4+0{,}25=4{,}25\\).</li></ol><p>Svar: Integralen är \\(3{,}75\\) men arean är \\(4{,}25\\) a.e.</p>",
  "bedomning": [
    "+C<sub>P</sub> för korrekt beräknad integral, \\(3{,}75\\), eller korrekt beräknad area, \\(4{,}25\\) a.e.",
    "+A<sub>R</sub> för korrekt area, \\(4{,}25\\) a.e., och en tydlig förklaring av att delen under \\(x\\)-axeln ger ett negativt bidrag till integralen"
  ]
},
{
  "id": "int-034",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Bestämd integral",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Bestäm det positiva talet \\(a\\) så att \\[\\int_0^a(2x+1)\\,dx=12\\]</p>",
  "svar": {
    "varde": 3,
    "tolerans": 0
  },
  "ledtradar": [
    "Beräkna integralen uttryckt i \\(a\\).",
    "Du får en andragradsekvation. Endast den positiva lösningen gäller."
  ],
  "losning": "<ol><li>\\(\\displaystyle\\int_0^a(2x+1)\\,dx=\\Big[x^2+x\\Big]_0^a=a^2+a\\)</li><li>\\(a^2+a=12\\;\\Leftrightarrow\\;a^2+a-12=0\\;\\Leftrightarrow\\;a=-\\dfrac12\\pm\\sqrt{\\dfrac14+12}=-\\dfrac12\\pm\\dfrac72\\)</li><li>\\(a=3\\) eller \\(a=-4\\). Eftersom \\(a\\gt0\\) gäller \\(a=3\\).</li></ol><p>Svar: \\(a=3\\)</p>"
},
{
  "id": "int-035",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Grafisk integralberäkning",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Figuren visar grafen till funktionen \\(f\\). Rutnätets rutor har sidan \\(0{,}5\\) längdenheter.</p><p>Uppskatta \\(\\displaystyle\\int_0^4 f(x)\\,dx\\) med hjälp av grafen. Svara med en decimal.</p>",
  "figur": "<svg viewBox=\"0 0 314 286\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M26 262V22M48 262V22M70 262V22M92 262V22M114 262V22M136 262V22M158 262V22M180 262V22M202 262V22M224 262V22M246 262V22M268 262V22M290 262V22M26 262H290M26 242H290M26 222H290M26 202H290M26 182H290M26 162H290M26 142H290M26 122H290M26 102H290M26 82H290M26 62H290M26 42H290M26 22H290\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M70 62L71.1 62L72.2 62L73.3 62.1L74.4 62.1L75.5 62.2L76.6 62.2L77.7 62.3L78.8 62.4L79.9 62.5L81 62.6L82.1 62.8L83.2 62.9L84.3 63.1L85.4 63.2L86.5 63.4L87.6 63.6L88.7 63.8L89.8 64L90.9 64.3L92 64.5L93.1 64.8L94.2 65L95.3 65.3L96.4 65.6L97.5 65.9L98.6 66.2L99.7 66.6L100.8 66.9L101.9 67.3L103 67.6L104.1 68L105.2 68.4L106.3 68.8L107.4 69.2L108.5 69.7L109.6 70.1L110.7 70.6L111.8 71L112.9 71.5L114 72L115.1 72.5L116.2 73L117.3 73.6L118.4 74.1L119.5 74.7L120.6 75.2L121.7 75.8L122.8 76.4L123.9 77L125 77.6L126.1 78.3L127.2 78.9L128.3 79.6L129.4 80.2L130.5 80.9L131.6 81.6L132.7 82.3L133.8 83L134.9 83.8L136 84.5L137.1 85.3L138.2 86L139.3 86.8L140.4 87.6L141.5 88.4L142.6 89.2L143.7 90.1L144.8 90.9L145.9 91.8L147 92.6L148.1 93.5L149.2 94.4L150.3 95.3L151.4 96.2L152.5 97.2L153.6 98.1L154.7 99.1L155.8 100L156.9 101L158 102L159.1 103L160.2 104L161.3 105.1L162.4 106.1L163.5 107.2L164.6 108.2L165.7 109.3L166.8 110.4L167.9 111.5L169 112.6L170.1 113.8L171.2 114.9L172.3 116.1L173.4 117.2L174.5 118.4L175.6 119.6L176.7 120.8L177.8 122L178.9 123.3L180 124.5L181.1 125.8L182.2 127L183.3 128.3L184.4 129.6L185.5 130.9L186.6 132.2L187.7 133.6L188.8 134.9L189.9 136.3L191 137.6L192.1 139L193.2 140.4L194.3 141.8L195.4 143.2L196.5 144.7L197.6 146.1L198.7 147.6L199.8 149L200.9 150.5L202 152L203.1 153.5L204.2 155L205.3 156.6L206.4 158.1L207.5 159.7L208.6 161.2L209.7 162.8L210.8 164.4L211.9 166L213 167.6L214.1 169.3L215.2 170.9L216.3 172.6L217.4 174.2L218.5 175.9L219.6 177.6L220.7 179.3L221.8 181L222.9 182.8L224 184.5L225.1 186.3L226.2 188L227.3 189.8L228.4 191.6L229.5 193.4L230.6 195.2L231.7 197.1L232.8 198.9L233.9 200.8L235 202.6L236.1 204.5L237.2 206.4L238.3 208.3L239.4 210.2L240.5 212.2L241.6 214.1L242.7 216.1L243.8 218L244.9 220L246 222L246 222L244.9 222L243.8 222L242.7 222L241.6 222L240.5 222L239.4 222L238.3 222L237.2 222L236.1 222L235 222L233.9 222L232.8 222L231.7 222L230.6 222L229.5 222L228.4 222L227.3 222L226.2 222L225.1 222L224 222L222.9 222L221.8 222L220.7 222L219.6 222L218.5 222L217.4 222L216.3 222L215.2 222L214.1 222L213 222L211.9 222L210.8 222L209.7 222L208.6 222L207.5 222L206.4 222L205.3 222L204.2 222L203.1 222L202 222L200.9 222L199.8 222L198.7 222L197.6 222L196.5 222L195.4 222L194.3 222L193.2 222L192.1 222L191 222L189.9 222L188.8 222L187.7 222L186.6 222L185.5 222L184.4 222L183.3 222L182.2 222L181.1 222L180 222L178.9 222L177.8 222L176.7 222L175.6 222L174.5 222L173.4 222L172.3 222L171.2 222L170.1 222L169 222L167.9 222L166.8 222L165.7 222L164.6 222L163.5 222L162.4 222L161.3 222L160.2 222L159.1 222L158 222L156.9 222L155.8 222L154.7 222L153.6 222L152.5 222L151.4 222L150.3 222L149.2 222L148.1 222L147 222L145.9 222L144.8 222L143.7 222L142.6 222L141.5 222L140.4 222L139.3 222L138.2 222L137.1 222L136 222L134.9 222L133.8 222L132.7 222L131.6 222L130.5 222L129.4 222L128.3 222L127.2 222L126.1 222L125 222L123.9 222L122.8 222L121.7 222L120.6 222L119.5 222L118.4 222L117.3 222L116.2 222L115.1 222L114 222L112.9 222L111.8 222L110.7 222L109.6 222L108.5 222L107.4 222L106.3 222L105.2 222L104.1 222L103 222L101.9 222L100.8 222L99.7 222L98.6 222L97.5 222L96.4 222L95.3 222L94.2 222L93.1 222L92 222L90.9 222L89.8 222L88.7 222L87.6 222L86.5 222L85.4 222L84.3 222L83.2 222L82.1 222L81 222L79.9 222L78.8 222L77.7 222L76.6 222L75.5 222L74.4 222L73.3 222L72.2 222L71.1 222L70 222Z\" fill=\"currentColor\" fill-opacity=\"0.22\" stroke=\"none\"/><path d=\"M20 222H304M70 268V8\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M298 218.5L304 222L298 225.5\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M66.5 14L70 8L73.5 14\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/><text x=\"304\" y=\"214\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">x</text><text x=\"77\" y=\"16\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y</text><text x=\"26\" y=\"238\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"114\" y=\"238\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"158\" y=\"238\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"202\" y=\"238\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"246\" y=\"238\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"290\" y=\"238\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"66\" y=\"266.6\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"66\" y=\"186.6\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"66\" y=\"146.6\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"66\" y=\"106.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"66\" y=\"66.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"66\" y=\"26.6\" text-anchor=\"end\" fill=\"currentColor\">5</text><text x=\"66\" y=\"238\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M70 62L71.2 62L72.4 62L73.6 62.1L74.8 62.1L76 62.2L77.3 62.3L78.5 62.4L79.7 62.5L80.9 62.6L82.1 62.8L83.3 62.9L84.5 63.1L85.7 63.3L86.9 63.5L88.2 63.7L89.4 63.9L90.6 64.2L91.8 64.5L93 64.7L94.2 65L95.4 65.3L96.6 65.7L97.8 66L99 66.4L100.2 66.7L101.5 67.1L102.7 67.5L103.9 67.9L105.1 68.4L106.3 68.8L107.5 69.3L108.7 69.7L109.9 70.2L111.1 70.7L112.3 71.3L113.6 71.8L114.8 72.4L116 72.9L117.2 73.5L118.4 74.1L119.6 74.7L120.8 75.3L122 76L123.2 76.6L124.5 77.3L125.7 78L126.9 78.7L128.1 79.4L129.3 80.2L130.5 80.9L131.7 81.7L132.9 82.4L134.1 83.2L135.3 84.1L136.6 84.9L137.8 85.7L139 86.6L140.2 87.4L141.4 88.3L142.6 89.2L143.8 90.1L145 91.1L146.2 92L147.4 93L148.7 94L149.9 94.9L151.1 95.9L152.3 97L153.5 98L154.7 99.1L155.9 100.1L157.1 101.2L158.3 102.3L159.5 103.4L160.8 104.5L162 105.7L163.2 106.8L164.4 108L165.6 109.2L166.8 110.4L168 111.6L169.2 112.9L170.4 114.1L171.6 115.4L172.9 116.6L174.1 117.9L175.3 119.2L176.5 120.6L177.7 121.9L178.9 123.3L180.1 124.6L181.3 126L182.5 127.4L183.7 128.8L185 130.3L186.2 131.7L187.4 133.2L188.6 134.6L189.8 136.1L191 137.6L192.2 139.1L193.4 140.7L194.6 142.2L195.8 143.8L197.1 145.4L198.3 147L199.5 148.6L200.7 150.2L201.9 151.9L203.1 153.5L204.3 155.2L205.5 156.9L206.7 158.6L207.9 160.3L209.2 162L210.4 163.8L211.6 165.5L212.8 167.3L214 169.1L215.2 170.9L216.4 172.7L217.6 174.6L218.8 176.4L220 178.3L221.2 180.2L222.5 182.1L223.7 184L224.9 185.9L226.1 187.8L227.3 189.8L228.5 191.8L229.7 193.8L230.9 195.8L232.1 197.8L233.4 199.8L234.6 201.9L235.8 203.9L237 206L238.2 208.1L239.4 210.2L240.6 212.4L241.8 214.5L243 216.6L244.2 218.8L245.4 221L246.7 223.2L247.9 225.4L249.1 227.6L250.3 229.9L251.5 232.2L252.7 234.4L253.9 236.7L255.1 239L256.3 241.4L257.6 243.7L258.8 246L260 248.4L261.2 250.8L262.4 253.2L263.6 255.6\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"153.6\" y=\"48\" text-anchor=\"start\" fill=\"currentColor\" font-style=\"italic\" font-size=\"14\">y = f(x)</text></svg>",
  "svar": {
    "varde": 10.7,
    "tolerans": 0.7
  },
  "ledtradar": [
    "Integralen är lika med arean av det skuggade området.",
    "Varje liten ruta har arean \\(0{,}5\\cdot0{,}5=0{,}25\\) a.e. Räkna hela rutor och lägg ihop delrutor till ungefär hela.",
    "Kontrollera rimligheten: området är mindre än rektangeln \\(4\\cdot4=16\\) men större än triangeln \\(\\dfrac{4\\cdot4}{2}=8\\)."
  ],
  "losning": "<ol><li>Eftersom \\(f(x)\\ge0\\) för \\(0\\le x\\le4\\) är integralen lika med den skuggade arean.</li><li>Varje ruta har arean \\(0{,}25\\) a.e. Det skuggade området täcker ungefär \\(42\\)–\\(43\\) rutor (hela rutor plus ihoplagda delrutor).</li><li>\\(43\\cdot0{,}25\\approx10{,}7\\)</li></ol><p>Rimlighet: arean ligger mellan triangelns \\(8\\) och rektangelns \\(16\\). (Grafen är \\(f(x)=4-0{,}25x^2\\) och det exakta värdet är \\(\\tfrac{32}{3}\\approx10{,}67\\).)</p><p>Svar: ca \\(10{,}7\\) (värden mellan \\(10\\) och \\(11{,}4\\) godtas)</p>"
},
{
  "id": "int-036",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Integraler i tillämpningar",
  "niva": "A",
  "poang": "1/1/2",
  "typ": "redovisning",
  "fraga": "<p>Ett lands årliga koldioxidutsläpp minskar. Utsläppstakten kan beskrivas med modellen \\[u(t)=50\\cdot0{,}96^t\\ \\text{miljoner ton per år}\\] där \\(t\\) är tiden i år räknat från början av år 2025.</p><ol type='a'><li>Hur stora blir de totala utsläppen under perioden 2025–2034, dvs. från \\(t=0\\) till \\(t=10\\)?</li><li>Landet har satt upp en koldioxidbudget: de totala utsläppen från och med 2025 får vara högst 1000 miljoner ton. Undersök om budgeten håller enligt modellen. Om den inte håller, när överskrids den?</li></ol>",
  "svar": {
    "facit": "a) Ca \\(410\\) miljoner ton &nbsp; b) Nej, de totala utsläppen närmar sig ca \\(1225\\) miljoner ton. Budgeten överskrids efter ca \\(41{,}5\\) år, dvs. år 2066."
  },
  "ledtradar": [
    "Totala utsläppen från \\(t=0\\) till \\(t=T\\) är \\(\\int_0^T u(t)\\,dt\\). Använd att en primitiv funktion till \\(a^t\\) är \\(\\dfrac{a^t}{\\ln a}\\).",
    "\\(\\ln0{,}96\\) är negativt. Var noga med tecknen.",
    "b) Sätt \\(\\int_0^T u(t)\\,dt=1000\\) och lös ut \\(T\\). Du kan också undersöka vad integralen närmar sig när \\(T\\) blir mycket stort."
  ],
  "losning": "<ol type='a'><li>En primitiv funktion till \\(50\\cdot0{,}96^t\\) är \\(\\dfrac{50\\cdot0{,}96^t}{\\ln0{,}96}\\). \\[\\int_0^{10}50\\cdot0{,}96^t\\,dt=\\left[\\frac{50\\cdot0{,}96^t}{\\ln0{,}96}\\right]_0^{10}=\\frac{50\\left(0{,}96^{10}-1\\right)}{\\ln0{,}96}\\approx\\frac{50\\cdot(-0{,}3352)}{-0{,}04082}\\approx410\\] De totala utsläppen blir ca 410 miljoner ton.</li><li>På samma sätt är de totala utsläppen fram till tiden \\(T\\): \\[\\int_0^{T}50\\cdot0{,}96^t\\,dt=\\frac{50\\left(1-0{,}96^{T}\\right)}{-\\ln0{,}96}\\] Sätt detta lika med 1000: \\[1-0{,}96^T=\\frac{1000\\cdot(-\\ln0{,}96)}{50}\\approx0{,}8164\\;\\Rightarrow\\;0{,}96^T\\approx0{,}1836\\] \\[T=\\frac{\\ln0{,}1836}{\\ln0{,}96}\\approx41{,}5\\] (Alternativt: när \\(T\\) växer går \\(0{,}96^T\\to0\\), så de totala utsläppen närmar sig \\(\\dfrac{50}{-\\ln0{,}96}\\approx1225\\) miljoner ton, vilket är mer än budgeten.)<br>Budgeten håller alltså inte. Den överskrids efter ca 41,5 år, dvs. under år 2066.</li></ol><p>Svar: a) ca 410 miljoner ton &nbsp; b) Nej, budgeten överskrids efter ca 41,5 år (år 2066).</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt uppställd integral, \\(\\int_0^{10}50\\cdot0{,}96^t\\,dt\\)",
    "+C<sub>P</sub> för korrekt primitiv funktion och korrekt svar på a), ca \\(410\\) miljoner ton",
    "+A<sub>PL</sub> för en godtagbar metod för att undersöka budgeten, t.ex. att ställa upp \\(\\int_0^T u(t)\\,dt=1000\\) eller undersöka de totala utsläppen på lång sikt",
    "+A<sub>R</sub> för korrekt slutsats med motivering, att budgeten överskrids efter ca \\(41{,}5\\) år (år 2066)"
  ]
},
{
  "id": "int-037",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Integraler",
  "moment": "Tolkning av integraler",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Vattenvolymen i en sjö förändras med hastigheten \\(f(t)\\) miljoner m³ per månad, där \\(t\\) är tiden i månader från den 1 januari. Det gäller att \\[\\int_0^{12}f(t)\\,dt=-30\\]</p><p>Vilket påstående är korrekt?</p>",
  "svar": {
    "alternativ": [
      "Vattenvolymen minskade med 30 miljoner m³ per månad under året.",
      "Vattenvolymen var 30 miljoner m³ efter 12 månader.",
      "Vattenvolymen var 30 miljoner m³ mindre efter 12 månader än vid årets början.",
      "Vattenvolymen minskade hela tiden under de 12 månaderna."
    ],
    "ratt": 2
  },
  "ledtradar": [
    "Integralen av en förändringshastighet ger den totala förändringen under perioden.",
    "Kan volymen ha ökat under någon del av året även om integralen är negativ?"
  ],
  "losning": "<p>Om \\(V(t)\\) är vattenvolymen så är \\(f(t)=V'(t)\\), och enligt integralkalkylens fundamentalsats är</p>\\[\\int_0^{12}f(t)\\,dt=V(12)-V(0)=-30\\]<p>Volymen var alltså 30 miljoner m³ mindre efter 12 månader än vid årets början. Integralen säger bara något om nettoförändringen – volymen kan ha ökat under vissa månader (t.ex. vid snösmältning) och minskat mer under andra. Minskningen var i genomsnitt \\(30/12=2{,}5\\) miljoner m³ per månad, inte 30.</p><p>Svar: Vattenvolymen var 30 miljoner m³ mindre efter 12 månader än vid årets början.</p>"
}
);
