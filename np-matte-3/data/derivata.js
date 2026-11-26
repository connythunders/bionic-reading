window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(
{
  "id": "der-001",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Gränsvärden",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Bestäm gränsvärdet</p><p>\\[\\lim_{x\\to 3}\\frac{x^2-9}{x-3}\\]</p>",
  "svar": {
    "varde": 6,
    "tolerans": 0
  },
  "ledtradar": [
    "Du kan inte sätta in \\(x=3\\) direkt – då blir det \\(\\tfrac{0}{0}\\).",
    "Faktorisera täljaren med konjugatregeln: \\(x^2-9=(x+3)(x-3)\\)."
  ],
  "losning": "<p>Täljaren faktoriseras med konjugatregeln:</p><p>\\[\\frac{x^2-9}{x-3}=\\frac{(x+3)(x-3)}{x-3}=x+3,\\quad x\\neq 3\\]</p><p>När \\(x\\to 3\\) går uttrycket mot \\(3+3=6\\).</p><p>Svar: \\(6\\)</p>"
},
{
  "id": "der-002",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Deriveringsregler",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Bestäm \\(f'(x)\\) om \\(f(x)=x^3-4x^2+2x-7\\).</p>",
  "svar": {
    "alternativ": [
      "\\(f'(x)=3x^2-8x+2\\)",
      "\\(f'(x)=3x^2-8x+2-7\\)",
      "\\(f'(x)=3x^2-4x+2\\)",
      "\\(f'(x)=x^2-8x+2\\)",
      "\\(f'(x)=3x^2-8x\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Derivera term för term med regeln \\(D(x^n)=nx^{n-1}\\).",
    "Vad är derivatan av en konstant, t.ex. \\(-7\\)? Och av \\(2x\\)?"
  ],
  "losning": "<p>Derivera term för term:</p><ul><li>\\(D(x^3)=3x^2\\)</li><li>\\(D(-4x^2)=-8x\\)</li><li>\\(D(2x)=2\\)</li><li>\\(D(-7)=0\\) (en konstant ändras inte)</li></ul><p>Svar: \\(f'(x)=3x^2-8x+2\\)</p>"
},
{
  "id": "der-003",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Deriveringsregler",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Vilket av alternativen är derivatan av \\(f(x)=e^{2x}\\)?</p>",
  "svar": {
    "alternativ": [
      "\\(f'(x)=2e^{2x}\\)",
      "\\(f'(x)=e^{2x}\\)",
      "\\(f'(x)=2x\\,e^{2x-1}\\)",
      "\\(f'(x)=2x\\,e^{2x}\\)",
      "\\(f'(x)=e^{2}\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Se formelbladet: \\(D(e^{kx})=k\\,e^{kx}\\).",
    "Exponentialfunktioner deriveras <em>inte</em> med potensregeln – exponenten behålls."
  ],
  "losning": "<p>Enligt regeln \\(D(e^{kx})=k\\,e^{kx}\\) med \\(k=2\\) får vi</p><p>\\[f'(x)=2e^{2x}\\]</p><p>Vanligt fel: att använda potensregeln och skriva \\(2x\\,e^{2x-1}\\). Potensregeln gäller bara när variabeln står i basen, inte i exponenten.</p><p>Svar: \\(f'(x)=2e^{2x}\\)</p>"
},
{
  "id": "der-004",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Grafisk derivering",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Figuren visar grafen till funktionen \\(f\\) och tangenten till grafen i punkten där \\(x=3\\).</p><p>Bestäm \\(f'(3)\\).</p>",
  "figur": "<svg viewBox=\"0 0 330 330\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Graf till f med tangent i x = 3\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M16 314V20M58 314V20M100 314V20M142 314V20M184 314V20M226 314V20M268 314V20M310 314V20M16 314H310M16 272H310M16 230H310M16 188H310M16 146H310M16 104H310M16 62H310M16 20H310\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M10 230H322M58 320V8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M316 226.5L322 230L316 233.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M54.5 14L58 8L61.5 14\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"322\" y=\"223\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"65\" y=\"18\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"16\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"100\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"142\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"184\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"226\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"268\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"54\" y=\"318.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"54\" y=\"276.5\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"54\" y=\"192.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"54\" y=\"150.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"54\" y=\"108.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"54\" y=\"66.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"54\" y=\"244\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M16 146L16.7 144.5L17.5 143.1L18.2 141.6L18.9 140.2L19.7 138.8L20.4 137.4L21.1 136L21.9 134.7L22.6 133.3L23.4 131.9L24.1 130.6L24.8 129.3L25.6 128L26.3 126.7L27 125.4L27.8 124.1L28.5 122.9L29.2 121.6L30 120.4L30.7 119.2L31.4 118L32.2 116.8L32.9 115.6L33.6 114.4L34.4 113.3L35.1 112.1L35.8 111L36.6 109.9L37.3 108.8L38 107.7L38.8 106.6L39.5 105.5L40.3 104.5L41 103.5L41.7 102.4L42.5 101.4L43.2 100.4L43.9 99.4L44.7 98.5L45.4 97.5L46.1 96.5L46.9 95.6L47.6 94.7L48.3 93.8L49.1 92.9L49.8 92L50.5 91.1L51.3 90.3L52 89.4L52.8 88.6L53.5 87.8L54.2 87L55 86.2L55.7 85.4L56.4 84.6L57.2 83.8L57.9 83.1L58.6 82.4L59.4 81.7L60.1 81L60.8 80.3L61.6 79.6L62.3 78.9L63 78.3L63.8 77.6L64.5 77L65.2 76.4L66 75.8L66.7 75.2L67.5 74.6L68.2 74L68.9 73.5L69.7 73L70.4 72.4L71.1 71.9L71.9 71.4L72.6 70.9L73.3 70.5L74.1 70L74.8 69.6L75.5 69.1L76.3 68.7L77 68.3L77.7 67.9L78.5 67.5L79.2 67.1L79.9 66.8L80.7 66.4L81.4 66.1L82.1 65.8L82.9 65.5L83.6 65.2L84.4 64.9L85.1 64.6L85.8 64.4L86.6 64.2L87.3 63.9L88 63.7L88.8 63.5L89.5 63.3L90.2 63.1L91 63L91.7 62.8L92.4 62.7L93.2 62.6L93.9 62.4L94.6 62.3L95.4 62.3L96.1 62.2L96.9 62.1L97.6 62.1L98.3 62L99.1 62L99.8 62L100.5 62L101.3 62L102 62L102.7 62.1L103.5 62.1L104.2 62.2L104.9 62.3L105.7 62.4L106.4 62.5L107.1 62.6L107.9 62.7L108.6 62.9L109.3 63L110.1 63.2L110.8 63.4L111.5 63.6L112.3 63.8L113 64L113.8 64.3L114.5 64.5L115.2 64.8L116 65L116.7 65.3L117.4 65.6L118.2 65.9L118.9 66.3L119.6 66.6L120.4 66.9L121.1 67.3L121.8 67.7L122.6 68.1L123.3 68.5L124 68.9L124.8 69.3L125.5 69.8L126.2 70.2L127 70.7L127.7 71.1L128.5 71.6L129.2 72.1L129.9 72.7L130.7 73.2L131.4 73.7L132.1 74.3L132.9 74.9L133.6 75.4L134.3 76L135.1 76.6L135.8 77.3L136.5 77.9L137.3 78.5L138 79.2L138.7 79.9L139.5 80.6L140.2 81.3L140.9 82L141.7 82.7L142.4 83.4L143.2 84.2L143.9 84.9L144.6 85.7L145.4 86.5L146.1 87.3L146.8 88.1L147.6 88.9L148.3 89.8L149 90.6L149.8 91.5L150.5 92.4L151.2 93.3L152 94.2L152.7 95.1L153.4 96L154.2 96.9L154.9 97.9L155.7 98.9L156.4 99.8L157.1 100.8L157.9 101.8L158.6 102.9L159.3 103.9L160.1 104.9L160.8 106L161.5 107.1L162.3 108.2L163 109.2L163.7 110.4L164.5 111.5L165.2 112.6L165.9 113.8L166.7 114.9L167.4 116.1L168.1 117.3L168.9 118.5L169.6 119.7L170.3 120.9L171.1 122.2L171.8 123.4L172.6 124.7L173.3 125.9L174 127.2L174.8 128.5L175.5 129.9L176.2 131.2L177 132.5L177.7 133.9L178.4 135.2L179.2 136.6L179.9 138L180.6 139.4L181.4 140.8L182.1 142.3L182.8 143.7L183.6 145.2L184.3 146.6L185.1 148.1L185.8 149.6L186.5 151.1L187.3 152.6L188 154.2L188.7 155.7L189.5 157.3L190.2 158.8L190.9 160.4L191.7 162L192.4 163.6L193.1 165.3L193.9 166.9L194.6 168.5L195.3 170.2L196.1 171.9L196.8 173.6L197.5 175.3L198.3 177L199 178.7L199.8 180.5L200.5 182.2L201.2 184L202 185.7L202.7 187.5L203.4 189.3L204.2 191.2L204.9 193L205.6 194.8L206.4 196.7L207.1 198.6L207.8 200.4L208.6 202.3L209.3 204.2L210 206.2L210.8 208.1L211.5 210L212.2 212L213 214L213.7 215.9L214.4 217.9L215.2 219.9L215.9 222L216.7 224L217.4 226.1L218.1 228.1L218.9 230.2L219.6 232.3L220.3 234.4L221.1 236.5L221.8 238.6L222.5 240.7L223.3 242.9L224 245.1L224.7 247.2L225.5 249.4L226.2 251.6L226.9 253.8L227.7 256.1L228.4 258.3L229.2 260.6L229.9 262.8L230.6 265.1L231.4 267.4L232.1 269.7L232.8 272L233.6 274.4L234.3 276.7L235 279.1L235.8 281.4L236.5 283.8L237.2 286.2L238 288.6L238.7 291L239.4 293.5L240.2 295.9L240.9 298.4L241.6 300.8L242.4 303.3L243.1 305.8L243.8 308.3L244.6 310.9L245.3 313.4\" stroke=\"currentColor\" stroke-width=\"2.2\" fill=\"none\" stroke-linejoin=\"round\"/><path d=\"M121.8 21.7L123.3 24.6L124.8 27.6L126.2 30.5L127.7 33.4L129.2 36.4L130.7 39.3L132.1 42.3L133.6 45.2L135.1 48.1L136.5 51.1L138 54L139.5 57L140.9 59.9L142.4 62.8L143.9 65.8L145.4 68.7L146.8 71.7L148.3 74.6L149.8 77.5L151.2 80.5L152.7 83.4L154.2 86.4L155.7 89.3L157.1 92.2L158.6 95.2L160.1 98.1L161.5 101.1L163 104L164.5 106.9L165.9 109.9L167.4 112.8L168.9 115.8L170.3 118.7L171.8 121.6L173.3 124.6L174.8 127.5L176.2 130.5L177.7 133.4L179.2 136.3L180.6 139.3L182.1 142.2L183.6 145.2L185.1 148.1L186.5 151L188 154L189.5 156.9L190.9 159.9L192.4 162.8L193.9 165.7L195.3 168.7L196.8 171.6L198.3 174.6L199.8 177.5L201.2 180.4L202.7 183.4L204.2 186.3L205.6 189.3L207.1 192.2L208.6 195.1L210 198.1L211.5 201L213 204L214.4 206.9L215.9 209.8L217.4 212.8L218.9 215.7L220.3 218.7L221.8 221.6L223.3 224.5L224.7 227.5L226.2 230.4L227.7 233.4L229.2 236.3L230.6 239.2L232.1 242.2L233.6 245.1L235 248.1L236.5 251L238 253.9L239.4 256.9L240.9 259.8L242.4 262.8L243.8 265.7L245.3 268.6L246.8 271.6L248.3 274.5L249.7 277.5L251.2 280.4L252.7 283.3L254.1 286.3L255.6 289.2L257.1 292.2L258.6 295.1L260 298L261.5 301L263 303.9L264.4 306.9L265.9 309.8L267.4 312.7\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\" stroke-linejoin=\"round\"/><circle cx=\"184\" cy=\"146\" r=\"3.2\" fill=\"currentColor\"/><text x=\"305.8\" y=\"83\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">y = f(x)</text><text x=\"232.3\" y=\"181.7\" text-anchor=\"start\" fill=\"currentColor\">tangent</text></svg>",
  "svar": {
    "varde": -2,
    "tolerans": 0
  },
  "ledtradar": [
    "\\(f'(3)\\) är lutningen (riktningskoefficienten) för tangenten i \\(x=3\\).",
    "Välj två punkter på tangenten där den skär rutnätets hörn, t.ex. \\((3,\\,2)\\) och \\((4,\\,0)\\), och beräkna \\(\\tfrac{\\Delta y}{\\Delta x}\\)."
  ],
  "losning": "<p>Derivatan \\(f'(3)\\) är lika med tangentens lutning. Tangenten går genom \\((3,\\,2)\\) och \\((4,\\,0)\\):</p><p>\\[k=\\frac{\\Delta y}{\\Delta x}=\\frac{0-2}{4-3}=-2\\]</p><p>Svar: \\(f'(3)=-2\\)</p>"
},
{
  "id": "der-005",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Grafisk derivering",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Figuren visar grafen till funktionen \\(f\\).</p><p>För vilka \\(x\\) gäller att \\(f'(x)\\lt 0\\)?</p>",
  "figur": "<svg viewBox=\"0 0 324 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Graf till f(x)\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M16 284V20M64 284V20M112 284V20M160 284V20M208 284V20M256 284V20M304 284V20M16 284H304M16 240H304M16 196H304M16 152H304M16 108H304M16 64H304M16 20H304\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M10 152H316M160 290V8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M310 148.5L316 152L310 155.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M156.5 14L160 8L163.5 14\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"316\" y=\"145\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"167\" y=\"18\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"16\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">−3</text><text x=\"64\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"112\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"208\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"256\" y=\"166\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"156\" y=\"288.5\" text-anchor=\"end\" fill=\"currentColor\">−3</text><text x=\"156\" y=\"244.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"156\" y=\"200.5\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"156\" y=\"112.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"156\" y=\"68.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"156\" y=\"166\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M59.2 282.3L59.9 275.6L60.6 269L61.4 262.6L62.1 256.3L62.8 250.1L63.5 244L64.2 238L65 232.2L65.7 226.5L66.4 220.9L67.1 215.4L67.8 210L68.6 204.7L69.3 199.6L70 194.5L70.7 189.6L71.4 184.8L72.2 180.1L72.9 175.5L73.6 171L74.3 166.6L75 162.4L75.8 158.2L76.5 154.1L77.2 150.1L77.9 146.3L78.6 142.5L79.4 138.9L80.1 135.3L80.8 131.9L81.5 128.5L82.2 125.2L83 122.1L83.7 119L84.4 116L85.1 113.1L85.8 110.3L86.6 107.6L87.3 105L88 102.5L88.7 100.1L89.4 97.7L90.2 95.5L90.9 93.3L91.6 91.2L92.3 89.2L93 87.3L93.8 85.5L94.5 83.7L95.2 82.1L95.9 80.5L96.6 79L97.4 77.5L98.1 76.2L98.8 74.9L99.5 73.7L100.2 72.6L101 71.5L101.7 70.5L102.4 69.6L103.1 68.8L103.8 68L104.6 67.3L105.3 66.7L106 66.1L106.7 65.7L107.4 65.2L108.2 64.9L108.9 64.6L109.6 64.3L110.3 64.2L111 64.1L111.8 64L112.5 64L113.2 64.1L113.9 64.2L114.6 64.4L115.4 64.6L116.1 64.9L116.8 65.3L117.5 65.7L118.2 66.1L119 66.6L119.7 67.2L120.4 67.8L121.1 68.5L121.8 69.2L122.6 69.9L123.3 70.7L124 71.6L124.7 72.5L125.4 73.4L126.2 74.4L126.9 75.4L127.6 76.4L128.3 77.5L129 78.7L129.8 79.8L130.5 81.1L131.2 82.3L131.9 83.6L132.6 84.9L133.4 86.3L134.1 87.6L134.8 89.1L135.5 90.5L136.2 92L137 93.5L137.7 95L138.4 96.6L139.1 98.2L139.8 99.8L140.6 101.5L141.3 103.1L142 104.8L142.7 106.5L143.4 108.3L144.2 110L144.9 111.8L145.6 113.6L146.3 115.4L147 117.2L147.8 119.1L148.5 120.9L149.2 122.8L149.9 124.7L150.6 126.6L151.4 128.5L152.1 130.4L152.8 132.3L153.5 134.3L154.2 136.2L155 138.2L155.7 140.2L156.4 142.1L157.1 144.1L157.8 146.1L158.6 148L159.3 150L160 152L160.7 154L161.4 156L162.2 157.9L162.9 159.9L163.6 161.9L164.3 163.8L165 165.8L165.8 167.8L166.5 169.7L167.2 171.7L167.9 173.6L168.6 175.5L169.4 177.4L170.1 179.3L170.8 181.2L171.5 183.1L172.2 184.9L173 186.8L173.7 188.6L174.4 190.4L175.1 192.2L175.8 194L176.6 195.7L177.3 197.5L178 199.2L178.7 200.9L179.4 202.5L180.2 204.2L180.9 205.8L181.6 207.4L182.3 209L183 210.5L183.8 212L184.5 213.5L185.2 214.9L185.9 216.4L186.6 217.7L187.4 219.1L188.1 220.4L188.8 221.7L189.5 222.9L190.2 224.2L191 225.3L191.7 226.5L192.4 227.6L193.1 228.6L193.8 229.6L194.6 230.6L195.3 231.5L196 232.4L196.7 233.3L197.4 234.1L198.2 234.8L198.9 235.5L199.6 236.2L200.3 236.8L201 237.4L201.8 237.9L202.5 238.3L203.2 238.7L203.9 239.1L204.6 239.4L205.4 239.6L206.1 239.8L206.8 239.9L207.5 240L208.2 240L209 239.9L209.7 239.8L210.4 239.7L211.1 239.4L211.8 239.1L212.6 238.8L213.3 238.3L214 237.9L214.7 237.3L215.4 236.7L216.2 236L216.9 235.2L217.6 234.4L218.3 233.5L219 232.5L219.8 231.4L220.5 230.3L221.2 229.1L221.9 227.8L222.6 226.5L223.4 225L224.1 223.5L224.8 221.9L225.5 220.3L226.2 218.5L227 216.7L227.7 214.8L228.4 212.8L229.1 210.7L229.8 208.5L230.6 206.3L231.3 203.9L232 201.5L232.7 199L233.4 196.4L234.2 193.7L234.9 190.9L235.6 188L236.3 185L237 181.9L237.8 178.8L238.5 175.5L239.2 172.1L239.9 168.7L240.6 165.1L241.4 161.5L242.1 157.7L242.8 153.9L243.5 149.9L244.2 145.8L245 141.6L245.7 137.4L246.4 133L247.1 128.5L247.8 123.9L248.6 119.2L249.3 114.4L250 109.5L250.7 104.4L251.4 99.3L252.2 94L252.9 88.6L253.6 83.1L254.3 77.5L255 71.8L255.8 66L256.5 60L257.2 53.9L257.9 47.7L258.6 41.4L259.4 35L260.1 28.4L260.8 21.7\" stroke=\"currentColor\" stroke-width=\"2.2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"253.6\" y=\"48.6\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">y = f(x)</text></svg>",
  "svar": {
    "alternativ": [
      "\\(-1\\lt x\\lt 1\\)",
      "\\(x\\lt -1\\) eller \\(x\\gt 1\\)",
      "\\(x\\lt 0\\)",
      "\\(-1{,}7\\lt x\\lt 1{,}7\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "\\(f'(x)\\lt 0\\) betyder att funktionen är <em>avtagande</em>.",
    "Läs av mellan vilka \\(x\\)-värden grafen går nedåt (från vänster till höger)."
  ],
  "losning": "<p>Derivatan är negativ där grafen är avtagande. Grafen har en maximipunkt i \\(x=-1\\) och en minimipunkt i \\(x=1\\) och går nedåt däremellan.</p><p>Svar: \\(-1\\lt x\\lt 1\\)</p><p>Observera att grafens nollställen (\\(x\\approx\\pm 1{,}7\\)) och var grafen ligger ovanför eller under \\(x\\)-axeln, dvs. tecknet på \\(f(x)\\), inte säger något om tecknet på \\(f'(x)\\).</p>"
},
{
  "id": "der-006",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Ändringskvot och sekant",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Figuren visar grafen till funktionen \\(f\\). Två punkter på grafen är markerade.</p><p>Bestäm ändringskvoten \\(\\dfrac{\\Delta y}{\\Delta x}\\) för \\(f\\) i intervallet \\(0\\le x\\le 2\\).</p>",
  "figur": "<svg viewBox=\"0 0 330 330\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Graf till f med två markerade punkter\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M16 314V20M58 314V20M100 314V20M142 314V20M184 314V20M226 314V20M268 314V20M310 314V20M16 314H310M16 272H310M16 230H310M16 188H310M16 146H310M16 104H310M16 62H310M16 20H310\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M10 272H322M58 320V8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M316 268.5L322 272L316 275.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M54.5 14L58 8L61.5 14\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"322\" y=\"265\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"65\" y=\"18\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"16\" y=\"286\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"100\" y=\"286\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"142\" y=\"286\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"184\" y=\"286\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"226\" y=\"286\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"268\" y=\"286\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"54\" y=\"318.5\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"54\" y=\"234.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"54\" y=\"192.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"54\" y=\"150.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"54\" y=\"108.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"54\" y=\"66.5\" text-anchor=\"end\" fill=\"currentColor\">5</text><text x=\"54\" y=\"286\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M32.9 312.8L33.6 310.1L34.4 307.5L35.1 304.9L35.8 302.3L36.6 299.7L37.3 297.1L38 294.6L38.8 292L39.5 289.5L40.3 287L41 284.5L41.7 282L42.5 279.5L43.2 277L43.9 274.6L44.7 272.1L45.4 269.7L46.1 267.3L46.9 264.9L47.6 262.5L48.3 260.1L49.1 257.7L49.8 255.4L50.5 253L51.3 250.7L52 248.4L52.8 246.1L53.5 243.8L54.2 241.5L55 239.2L55.7 237L56.4 234.8L57.2 232.5L57.9 230.3L58.6 228.1L59.4 225.9L60.1 223.8L60.8 221.6L61.6 219.4L62.3 217.3L63 215.2L63.8 213.1L64.5 211L65.2 208.9L66 206.8L66.7 204.8L67.5 202.7L68.2 200.7L68.9 198.7L69.7 196.7L70.4 194.7L71.1 192.7L71.9 190.7L72.6 188.8L73.3 186.8L74.1 184.9L74.8 183L75.5 181.1L76.3 179.2L77 177.3L77.7 175.4L78.5 173.6L79.2 171.7L79.9 169.9L80.7 168.1L81.4 166.3L82.1 164.5L82.9 162.7L83.6 161L84.4 159.2L85.1 157.5L85.8 155.7L86.6 154L87.3 152.3L88 150.6L88.8 149L89.5 147.3L90.2 145.7L91 144L91.7 142.4L92.4 140.8L93.2 139.2L93.9 137.6L94.6 136.1L95.4 134.5L96.1 132.9L96.9 131.4L97.6 129.9L98.3 128.4L99.1 126.9L99.8 125.4L100.5 124L101.3 122.5L102 121.1L102.7 119.6L103.5 118.2L104.2 116.8L104.9 115.4L105.7 114L106.4 112.7L107.1 111.3L107.9 110L108.6 108.7L109.3 107.3L110.1 106L110.8 104.8L111.5 103.5L112.3 102.2L113 101L113.8 99.7L114.5 98.5L115.2 97.3L116 96.1L116.7 94.9L117.4 93.8L118.2 92.6L118.9 91.5L119.6 90.3L120.4 89.2L121.1 88.1L121.8 87L122.6 85.9L123.3 84.8L124 83.8L124.8 82.8L125.5 81.7L126.2 80.7L127 79.7L127.7 78.7L128.5 77.7L129.2 76.8L129.9 75.8L130.7 74.9L131.4 73.9L132.1 73L132.9 72.1L133.6 71.2L134.3 70.4L135.1 69.5L135.8 68.7L136.5 67.8L137.3 67L138 66.2L138.7 65.4L139.5 64.6L140.2 63.8L140.9 63.1L141.7 62.3L142.4 61.6L143.2 60.9L143.9 60.2L144.6 59.5L145.4 58.8L146.1 58.1L146.8 57.4L147.6 56.8L148.3 56.2L149 55.6L149.8 54.9L150.5 54.4L151.2 53.8L152 53.2L152.7 52.7L153.4 52.1L154.2 51.6L154.9 51.1L155.7 50.6L156.4 50.1L157.1 49.6L157.9 49.1L158.6 48.7L159.3 48.2L160.1 47.8L160.8 47.4L161.5 47L162.3 46.6L163 46.2L163.7 45.9L164.5 45.5L165.2 45.2L165.9 44.9L166.7 44.6L167.4 44.3L168.1 44L168.9 43.7L169.6 43.5L170.3 43.2L171.1 43L171.8 42.8L172.6 42.6L173.3 42.4L174 42.2L174.8 42L175.5 41.9L176.2 41.7L177 41.6L177.7 41.5L178.4 41.4L179.2 41.3L179.9 41.2L180.6 41.1L181.4 41.1L182.1 41L182.8 41L183.6 41L184.3 41L185.1 41L185.8 41L186.5 41.1L187.3 41.1L188 41.2L188.7 41.3L189.5 41.4L190.2 41.5L190.9 41.6L191.7 41.7L192.4 41.8L193.1 42L193.9 42.2L194.6 42.3L195.3 42.5L196.1 42.7L196.8 43L197.5 43.2L198.3 43.4L199 43.7L199.8 44L200.5 44.2L201.2 44.5L202 44.8L202.7 45.2L203.4 45.5L204.2 45.8L204.9 46.2L205.6 46.6L206.4 47L207.1 47.4L207.8 47.8L208.6 48.2L209.3 48.6L210 49.1L210.8 49.5L211.5 50L212.2 50.5L213 51L213.7 51.5L214.4 52L215.2 52.6L215.9 53.1L216.7 53.7L217.4 54.3L218.1 54.9L218.9 55.5L219.6 56.1L220.3 56.7L221.1 57.4L221.8 58L222.5 58.7L223.3 59.4L224 60.1L224.7 60.8L225.5 61.5L226.2 62.2L226.9 63L227.7 63.7L228.4 64.5L229.2 65.3L229.9 66.1L230.6 66.9L231.4 67.7L232.1 68.5L232.8 69.4L233.6 70.2L234.3 71.1L235 72L235.8 72.9L236.5 73.8L237.2 74.7L238 75.7L238.7 76.6L239.4 77.6L240.2 78.6L240.9 79.6L241.6 80.6L242.4 81.6L243.1 82.6L243.8 83.6L244.6 84.7L245.3 85.8L246.1 86.8L246.8 87.9L247.5 89L248.3 90.2L249 91.3L249.7 92.4L250.5 93.6L251.2 94.8L251.9 95.9L252.7 97.1L253.4 98.3L254.1 99.6L254.9 100.8L255.6 102L256.3 103.3L257.1 104.6L257.8 105.9L258.6 107.2L259.3 108.5L260 109.8L260.8 111.1L261.5 112.5L262.2 113.8L263 115.2L263.7 116.6L264.4 118L265.2 119.4L265.9 120.9L266.6 122.3L267.4 123.7L268.1 125.2L268.8 126.7L269.6 128.2L270.3 129.7L271 131.2L271.8 132.7L272.5 134.3L273.2 135.8L274 137.4L274.7 139L275.5 140.6L276.2 142.2L276.9 143.8L277.7 145.4L278.4 147.1L279.1 148.7L279.9 150.4L280.6 152.1L281.3 153.8L282.1 155.5L282.8 157.2L283.5 159L284.3 160.7L285 162.5L285.7 164.2L286.5 166L287.2 167.8L287.9 169.6L288.7 171.5L289.4 173.3L290.2 175.2L290.9 177L291.6 178.9L292.4 180.8L293.1 182.7L293.8 184.6L294.6 186.5L295.3 188.5L296 190.4L296.8 192.4L297.5 194.4L298.2 196.4L299 198.4L299.7 200.4L300.4 202.4L301.2 204.5L301.9 206.5L302.7 208.6L303.4 210.7L304.1 212.8L304.9 214.9L305.6 217L306.3 219.1L307.1 221.3L307.8 223.4L308.5 225.6L309.3 227.8L310 230\" stroke=\"currentColor\" stroke-width=\"2.2\" fill=\"none\" stroke-linejoin=\"round\"/><path d=\"M20.2 305.6L20.9 304.2L21.6 302.7L22.3 301.3L23.1 299.9L23.8 298.5L24.5 297L25.2 295.6L25.9 294.2L26.6 292.7L27.3 291.3L28.1 289.9L28.8 288.5L29.5 287L30.2 285.6L30.9 284.2L31.6 282.8L32.3 281.3L33.1 279.9L33.8 278.5L34.5 277L35.2 275.6L35.9 274.2L36.6 272.8L37.3 271.3L38 269.9L38.8 268.5L39.5 267L40.2 265.6L40.9 264.2L41.6 262.8L42.3 261.3L43 259.9L43.8 258.5L44.5 257L45.2 255.6L45.9 254.2L46.6 252.8L47.3 251.3L48 249.9L48.8 248.5L49.5 247.1L50.2 245.6L50.9 244.2L51.6 242.8L52.3 241.3L53 239.9L53.8 238.5L54.5 237.1L55.2 235.6L55.9 234.2L56.6 232.8L57.3 231.3L58 229.9L58.8 228.5L59.5 227.1L60.2 225.6L60.9 224.2L61.6 222.8L62.3 221.3L63 219.9L63.8 218.5L64.5 217.1L65.2 215.6L65.9 214.2L66.6 212.8L67.3 211.4L68 209.9L68.8 208.5L69.5 207.1L70.2 205.6L70.9 204.2L71.6 202.8L72.3 201.4L73 199.9L73.8 198.5L74.5 197.1L75.2 195.6L75.9 194.2L76.6 192.8L77.3 191.4L78 189.9L78.7 188.5L79.5 187.1L80.2 185.6L80.9 184.2L81.6 182.8L82.3 181.4L83 179.9L83.7 178.5L84.5 177.1L85.2 175.7L85.9 174.2L86.6 172.8L87.3 171.4L88 169.9L88.7 168.5L89.5 167.1L90.2 165.7L90.9 164.2L91.6 162.8L92.3 161.4L93 159.9L93.7 158.5L94.5 157.1L95.2 155.7L95.9 154.2L96.6 152.8L97.3 151.4L98 149.9L98.7 148.5L99.5 147.1L100.2 145.7L100.9 144.2L101.6 142.8L102.3 141.4L103 140L103.7 138.5L104.5 137.1L105.2 135.7L105.9 134.2L106.6 132.8L107.3 131.4L108 130L108.7 128.5L109.5 127.1L110.2 125.7L110.9 124.2L111.6 122.8L112.3 121.4L113 120L113.7 118.5L114.4 117.1L115.2 115.7L115.9 114.2L116.6 112.8L117.3 111.4L118 110L118.7 108.5L119.4 107.1L120.2 105.7L120.9 104.3L121.6 102.8L122.3 101.4L123 100L123.7 98.5L124.4 97.1L125.2 95.7L125.9 94.3L126.6 92.8L127.3 91.4L128 90L128.7 88.5L129.4 87.1L130.2 85.7L130.9 84.3L131.6 82.8L132.3 81.4L133 80L133.7 78.5L134.4 77.1L135.2 75.7L135.9 74.3L136.6 72.8L137.3 71.4L138 70L138.7 68.6L139.4 67.1L140.2 65.7L140.9 64.3L141.6 62.8L142.3 61.4L143 60L143.7 58.6L144.4 57.1L145.2 55.7L145.9 54.3L146.6 52.8L147.3 51.4L148 50L148.7 48.6L149.4 47.1L150.1 45.7L150.9 44.3L151.6 42.8L152.3 41.4L153 40L153.7 38.6L154.4 37.1L155.1 35.7L155.9 34.3L156.6 32.9L157.3 31.4L158 30L158.7 28.6L159.4 27.1L160.1 25.7L160.9 24.3L161.6 22.9L162.3 21.4L163 20\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-dasharray=\"5 3\"/><circle cx=\"58\" cy=\"230\" r=\"3.2\" fill=\"currentColor\"/><circle cx=\"142\" cy=\"62\" r=\"3.2\" fill=\"currentColor\"/><text x=\"268\" y=\"196.4\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">y = f(x)</text></svg>",
  "svar": {
    "varde": 2,
    "tolerans": 0
  },
  "ledtradar": [
    "Ändringskvoten är lutningen för sekanten (den streckade linjen) genom de två punkterna.",
    "Läs av \\(f(0)\\) och \\(f(2)\\) i figuren."
  ],
  "losning": "<p>Ur figuren: \\(f(0)=1\\) och \\(f(2)=5\\).</p><p>\\[\\frac{\\Delta y}{\\Delta x}=\\frac{f(2)-f(0)}{2-0}=\\frac{5-1}{2}=2\\]</p><p>Svar: \\(2\\)</p>"
},
{
  "id": "der-007",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Deriveringsregler",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Funktionen \\(g\\) ges av \\(g(x)=3e^{x}+x^2\\). Vilket alternativ är \\(g'(x)\\)?</p>",
  "svar": {
    "alternativ": [
      "\\(g'(x)=3e^{x}+2x\\)",
      "\\(g'(x)=3x\\,e^{x-1}+2x\\)",
      "\\(g'(x)=e^{x}+2x\\)",
      "\\(g'(x)=3e^{x}+x\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Derivatan av \\(e^x\\) är \\(e^x\\). En konstant faktor följer med.",
    "\\(D(x^2)=2x\\)."
  ],
  "losning": "<p>\\(D(3e^x)=3e^x\\) eftersom \\(D(e^x)=e^x\\) och konstanten 3 står kvar. \\(D(x^2)=2x\\).</p><p>Svar: \\(g'(x)=3e^{x}+2x\\)</p>"
},
{
  "id": "der-008",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Tangentens ekvation",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "text",
  "fraga": "<p>Bestäm ekvationen för tangenten till kurvan \\(y=x^2+3\\) i den punkt där \\(x=1\\).</p><p>Svara på formen \\(y=kx+m\\).</p>",
  "svar": {
    "godkanda": [
      "y=2x+2",
      "2x+2",
      "y=2+2x",
      "2+2x",
      "y=2(x+1)",
      "2(x+1)"
    ]
  },
  "ledtradar": [
    "Tangeringspunkten: \\(y(1)=1^2+3\\). Lutningen: \\(k=y'(1)\\).",
    "Använd enpunktsformeln \\(y-y_1=k(x-x_1)\\)."
  ],
  "losning": "<p>Tangeringspunkt: \\(y(1)=1+3=4\\), alltså \\((1,\\,4)\\).</p><p>\\(y'=2x\\) ger \\(k=y'(1)=2\\).</p><p>\\[y-4=2(x-1)\\iff y=2x+2\\]</p><p>Svar: \\(y=2x+2\\)</p>"
},
{
  "id": "der-009",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Extrempunkter",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "flera",
  "fraga": "<p>Funktionen \\(f(x)=x^3-12x\\) har två extrempunkter.</p><p>Bestäm extrempunkternas \\(x\\)-koordinater.</p>",
  "svar": {
    "varden": [
      -2,
      2
    ],
    "tolerans": 0
  },
  "ledtradar": [
    "I en extrempunkt är \\(f'(x)=0\\).",
    "\\(f'(x)=3x^2-12\\). Lös ekvationen \\(3x^2-12=0\\)."
  ],
  "losning": "<p>\\(f'(x)=3x^2-12\\). Sätt \\(f'(x)=0\\):</p><p>\\[3x^2=12\\iff x^2=4\\iff x=\\pm 2\\]</p><p>Derivatan byter tecken i båda punkterna (\\(+\\,0\\,-\\,0\\,+\\)), så det är extrempunkter (maximum i \\(x=-2\\), minimum i \\(x=2\\)).</p><p>Svar: \\(x=-2\\) och \\(x=2\\)</p>"
},
{
  "id": "der-010",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Deriveringsregler",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Bestäm \\(f'(x)\\) om \\(f(x)=2^x\\).</p>",
  "svar": {
    "alternativ": [
      "\\(f'(x)=2^x\\ln 2\\)",
      "\\(f'(x)=x\\cdot 2^{x-1}\\)",
      "\\(f'(x)=2^x\\)",
      "\\(f'(x)=\\dfrac{2^x}{\\ln 2}\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Se formelbladet: derivatan av \\(a^x\\).",
    "Bara när basen är \\(e\\) blir derivatan samma som funktionen."
  ],
  "losning": "<p>Enligt formelbladet gäller \\(D(a^x)=a^x\\ln a\\) för \\(a\\gt 0\\). Med \\(a=2\\):</p><p>\\[f'(x)=2^x\\ln 2\\]</p><p>(\\(\\tfrac{2^x}{\\ln 2}\\) är en primitiv funktion, inte derivatan.)</p><p>Svar: \\(f'(x)=2^x\\ln 2\\)</p>"
},
{
  "id": "der-011",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Villkor för deriverbarhet",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "val",
  "fraga": "<p>Figuren visar grafen till funktionen \\(f\\). Grafen består av en rät linje för \\(x\\le 1\\) och en del av en parabel för \\(x\\ge 1\\).</p><p>Vilket påstående är sant?</p>",
  "figur": "<svg viewBox=\"0 0 330 330\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Graf till f med ett hörn\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M16 314V20M58 314V20M100 314V20M142 314V20M184 314V20M226 314V20M268 314V20M310 314V20M16 314H310M16 272H310M16 230H310M16 188H310M16 146H310M16 104H310M16 62H310M16 20H310\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M10 230H322M142 320V8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M316 226.5L322 230L316 233.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M138.5 14L142 8L145.5 14\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"322\" y=\"223\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"149\" y=\"18\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"16\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">−3</text><text x=\"58\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"100\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"184\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"226\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"268\" y=\"244\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"138\" y=\"318.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"138\" y=\"276.5\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"138\" y=\"192.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"138\" y=\"150.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"138\" y=\"108.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"138\" y=\"66.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"138\" y=\"244\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M16 272L16.4 271.6L16.8 271.2L17.3 270.7L17.7 270.3L18.1 269.9L18.5 269.5L18.9 269.1L19.4 268.6L19.8 268.2L20.2 267.8L20.6 267.4L21 267L21.5 266.5L21.9 266.1L22.3 265.7L22.7 265.3L23.1 264.9L23.6 264.4L24 264L24.4 263.6L24.8 263.2L25.2 262.8L25.7 262.3L26.1 261.9L26.5 261.5L26.9 261.1L27.3 260.7L27.8 260.2L28.2 259.8L28.6 259.4L29 259L29.4 258.6L29.9 258.1L30.3 257.7L30.7 257.3L31.1 256.9L31.5 256.5L32 256L32.4 255.6L32.8 255.2L33.2 254.8L33.6 254.4L34.1 253.9L34.5 253.5L34.9 253.1L35.3 252.7L35.7 252.3L36.2 251.8L36.6 251.4L37 251L37.4 250.6L37.8 250.2L38.3 249.7L38.7 249.3L39.1 248.9L39.5 248.5L39.9 248.1L40.4 247.6L40.8 247.2L41.2 246.8L41.6 246.4L42 246L42.5 245.5L42.9 245.1L43.3 244.7L43.7 244.3L44.1 243.9L44.6 243.4L45 243L45.4 242.6L45.8 242.2L46.2 241.8L46.7 241.3L47.1 240.9L47.5 240.5L47.9 240.1L48.3 239.7L48.8 239.2L49.2 238.8L49.6 238.4L50 238L50.4 237.6L50.9 237.1L51.3 236.7L51.7 236.3L52.1 235.9L52.5 235.5L53 235L53.4 234.6L53.8 234.2L54.2 233.8L54.6 233.4L55.1 232.9L55.5 232.5L55.9 232.1L56.3 231.7L56.7 231.3L57.2 230.8L57.6 230.4L58 230L58.4 229.6L58.8 229.2L59.3 228.7L59.7 228.3L60.1 227.9L60.5 227.5L60.9 227.1L61.4 226.6L61.8 226.2L62.2 225.8L62.6 225.4L63 225L63.5 224.5L63.9 224.1L64.3 223.7L64.7 223.3L65.1 222.9L65.6 222.4L66 222L66.4 221.6L66.8 221.2L67.2 220.8L67.7 220.3L68.1 219.9L68.5 219.5L68.9 219.1L69.3 218.7L69.8 218.2L70.2 217.8L70.6 217.4L71 217L71.4 216.6L71.9 216.1L72.3 215.7L72.7 215.3L73.1 214.9L73.5 214.5L74 214L74.4 213.6L74.8 213.2L75.2 212.8L75.6 212.4L76.1 211.9L76.5 211.5L76.9 211.1L77.3 210.7L77.7 210.3L78.2 209.8L78.6 209.4L79 209L79.4 208.6L79.8 208.2L80.3 207.7L80.7 207.3L81.1 206.9L81.5 206.5L81.9 206.1L82.4 205.6L82.8 205.2L83.2 204.8L83.6 204.4L84 204L84.5 203.5L84.9 203.1L85.3 202.7L85.7 202.3L86.1 201.9L86.6 201.4L87 201L87.4 200.6L87.8 200.2L88.2 199.8L88.7 199.3L89.1 198.9L89.5 198.5L89.9 198.1L90.3 197.7L90.8 197.2L91.2 196.8L91.6 196.4L92 196L92.4 195.6L92.9 195.1L93.3 194.7L93.7 194.3L94.1 193.9L94.5 193.5L95 193L95.4 192.6L95.8 192.2L96.2 191.8L96.6 191.4L97.1 190.9L97.5 190.5L97.9 190.1L98.3 189.7L98.7 189.3L99.2 188.8L99.6 188.4L100 188L100.4 187.6L100.8 187.2L101.3 186.7L101.7 186.3L102.1 185.9L102.5 185.5L102.9 185.1L103.4 184.6L103.8 184.2L104.2 183.8L104.6 183.4L105 183L105.5 182.5L105.9 182.1L106.3 181.7L106.7 181.3L107.1 180.9L107.6 180.4L108 180L108.4 179.6L108.8 179.2L109.2 178.8L109.7 178.3L110.1 177.9L110.5 177.5L110.9 177.1L111.3 176.7L111.8 176.2L112.2 175.8L112.6 175.4L113 175L113.4 174.6L113.9 174.1L114.3 173.7L114.7 173.3L115.1 172.9L115.5 172.5L116 172L116.4 171.6L116.8 171.2L117.2 170.8L117.6 170.4L118.1 169.9L118.5 169.5L118.9 169.1L119.3 168.7L119.7 168.3L120.2 167.8L120.6 167.4L121 167L121.4 166.6L121.8 166.2L122.3 165.7L122.7 165.3L123.1 164.9L123.5 164.5L123.9 164.1L124.4 163.6L124.8 163.2L125.2 162.8L125.6 162.4L126 162L126.5 161.5L126.9 161.1L127.3 160.7L127.7 160.3L128.1 159.9L128.6 159.4L129 159L129.4 158.6L129.8 158.2L130.2 157.8L130.7 157.3L131.1 156.9L131.5 156.5L131.9 156.1L132.3 155.7L132.8 155.2L133.2 154.8L133.6 154.4L134 154L134.4 153.6L134.9 153.1L135.3 152.7L135.7 152.3L136.1 151.9L136.5 151.5L137 151L137.4 150.6L137.8 150.2L138.2 149.8L138.6 149.4L139.1 148.9L139.5 148.5L139.9 148.1L140.3 147.7L140.7 147.3L141.2 146.8L141.6 146.4L142 146L142.4 145.6L142.8 145.2L143.3 144.7L143.7 144.3L144.1 143.9L144.5 143.5L144.9 143.1L145.4 142.6L145.8 142.2L146.2 141.8L146.6 141.4L147 141L147.5 140.5L147.9 140.1L148.3 139.7L148.7 139.3L149.1 138.9L149.6 138.4L150 138L150.4 137.6L150.8 137.2L151.2 136.8L151.7 136.3L152.1 135.9L152.5 135.5L152.9 135.1L153.3 134.7L153.8 134.2L154.2 133.8L154.6 133.4L155 133L155.4 132.6L155.9 132.1L156.3 131.7L156.7 131.3L157.1 130.9L157.5 130.5L158 130L158.4 129.6L158.8 129.2L159.2 128.8L159.6 128.4L160.1 127.9L160.5 127.5L160.9 127.1L161.3 126.7L161.7 126.3L162.2 125.8L162.6 125.4L163 125L163.4 124.6L163.8 124.2L164.3 123.7L164.7 123.3L165.1 122.9L165.5 122.5L165.9 122.1L166.4 121.6L166.8 121.2L167.2 120.8L167.6 120.4L168 120L168.5 119.5L168.9 119.1L169.3 118.7L169.7 118.3L170.1 117.9L170.6 117.4L171 117L171.4 116.6L171.8 116.2L172.2 115.8L172.7 115.3L173.1 114.9L173.5 114.5L173.9 114.1L174.3 113.7L174.8 113.2L175.2 112.8L175.6 112.4L176 112L176.4 111.6L176.9 111.1L177.3 110.7L177.7 110.3L178.1 109.9L178.5 109.5L179 109L179.4 108.6L179.8 108.2L180.2 107.8L180.6 107.4L181.1 106.9L181.5 106.5L181.9 106.1L182.3 105.7L182.7 105.3L183.2 104.8L183.6 104.4L184 104L184.4 104L184.8 104L185.3 104L185.7 104.1L186.1 104.1L186.5 104.2L186.9 104.2L187.4 104.3L187.8 104.3L188.2 104.4L188.6 104.5L189 104.6L189.5 104.7L189.9 104.8L190.3 104.9L190.7 105.1L191.1 105.2L191.6 105.4L192 105.5L192.4 105.7L192.8 105.9L193.2 106L193.7 106.2L194.1 106.4L194.5 106.6L194.9 106.8L195.3 107.1L195.8 107.3L196.2 107.5L196.6 107.8L197 108L197.4 108.3L197.9 108.6L198.3 108.9L198.7 109.1L199.1 109.4L199.5 109.7L200 110.1L200.4 110.4L200.8 110.7L201.2 111.1L201.6 111.4L202.1 111.8L202.5 112.1L202.9 112.5L203.3 112.9L203.7 113.3L204.2 113.7L204.6 114.1L205 114.5L205.4 114.9L205.8 115.4L206.3 115.8L206.7 116.2L207.1 116.7L207.5 117.2L207.9 117.6L208.4 118.1L208.8 118.6L209.2 119.1L209.6 119.6L210 120.1L210.5 120.7L210.9 121.2L211.3 121.7L211.7 122.3L212.1 122.9L212.6 123.4L213 124L213.4 124.6L213.8 125.2L214.2 125.8L214.7 126.4L215.1 127L215.5 127.6L215.9 128.3L216.3 128.9L216.8 129.6L217.2 130.2L217.6 130.9L218 131.6L218.4 132.2L218.9 132.9L219.3 133.6L219.7 134.3L220.1 135.1L220.5 135.8L221 136.5L221.4 137.3L221.8 138L222.2 138.8L222.6 139.5L223.1 140.3L223.5 141.1L223.9 141.9L224.3 142.7L224.7 143.5L225.2 144.3L225.6 145.2L226 146L226.4 146.8L226.8 147.7L227.3 148.6L227.7 149.4L228.1 150.3L228.5 151.2L228.9 152.1L229.4 153L229.8 153.9L230.2 154.8L230.6 155.7L231 156.7L231.5 157.6L231.9 158.6L232.3 159.5L232.7 160.5L233.1 161.5L233.6 162.5L234 163.5L234.4 164.5L234.8 165.5L235.2 166.5L235.7 167.5L236.1 168.6L236.5 169.6L236.9 170.7L237.3 171.7L237.8 172.8L238.2 173.9L238.6 175L239 176.1L239.4 177.2L239.9 178.3L240.3 179.4L240.7 180.5L241.1 181.7L241.5 182.8L242 184L242.4 185.1L242.8 186.3L243.2 187.5L243.6 188.7L244.1 189.9L244.5 191.1L244.9 192.3L245.3 193.5L245.7 194.8L246.2 196L246.6 197.2L247 198.5L247.4 199.8L247.8 201L248.3 202.3L248.7 203.6L249.1 204.9L249.5 206.2L249.9 207.5L250.4 208.8L250.8 210.2L251.2 211.5L251.6 212.9L252 214.2L252.5 215.6L252.9 217L253.3 218.3L253.7 219.7L254.1 221.1L254.6 222.5L255 224L255.4 225.4L255.8 226.8L256.2 228.3L256.7 229.7L257.1 231.2L257.5 232.6L257.9 234.1L258.3 235.6L258.8 237.1L259.2 238.6L259.6 240.1L260 241.6L260.4 243.1L260.9 244.7L261.3 246.2L261.7 247.7L262.1 249.3L262.5 250.9L263 252.4L263.4 254L263.8 255.6L264.2 257.2L264.6 258.8L265.1 260.4L265.5 262.1L265.9 263.7L266.3 265.3L266.7 267L267.2 268.7L267.6 270.3L268 272L268.4 273.7L268.8 275.4L269.3 277.1L269.7 278.8L270.1 280.5L270.5 282.2L270.9 284L271.4 285.7L271.8 287.5L272.2 289.2L272.6 291L273 292.8L273.5 294.5L273.9 296.3L274.3 298.1L274.7 300L275.1 301.8L275.6 303.6L276 305.4L276.4 307.3L276.8 309.1L277.2 311L277.7 312.9\" stroke=\"currentColor\" stroke-width=\"2.2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"83.2\" y=\"156.5\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">y = f(x)</text></svg>",
  "svar": {
    "alternativ": [
      "\\(f'(1)\\) existerar inte",
      "\\(f'(1)=0\\)",
      "\\(f'(1)=1\\)",
      "\\(f\\) är inte kontinuerlig i \\(x=1\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Titta på grafens lutning strax till vänster om och strax till höger om \\(x=1\\).",
    "En funktion är deriverbar i en punkt bara om grafen har en entydig tangent där."
  ],
  "losning": "<p>Grafen hänger ihop i \\(x=1\\), så \\(f\\) är kontinuerlig där. Men till vänster har grafen lutningen 1 (linjen) och till höger börjar parabeln med lutningen 0. Grafen har alltså ett hörn i \\(x=1\\) och ingen entydig tangent.</p><p>Svar: \\(f'(1)\\) existerar inte.</p>"
},
{
  "id": "der-012",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Deriveringsregler",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=\\dfrac{4}{x}+\\sqrt{x}\\), \\(x\\gt 0\\).</p><p>Beräkna \\(f'(4)\\).</p>",
  "svar": {
    "varde": 0,
    "tolerans": 0
  },
  "ledtradar": [
    "Skriv om som potenser: \\(\\tfrac{4}{x}=4x^{-1}\\) och \\(\\sqrt{x}=x^{1/2}\\).",
    "Potensregeln ger \\(f'(x)=-4x^{-2}+\\tfrac12 x^{-1/2}=-\\tfrac{4}{x^2}+\\tfrac{1}{2\\sqrt x}\\)."
  ],
  "losning": "<p>\\(f(x)=4x^{-1}+x^{1/2}\\) ger</p><p>\\[f'(x)=-4x^{-2}+\\tfrac12x^{-1/2}=-\\frac{4}{x^2}+\\frac{1}{2\\sqrt{x}}\\]</p><p>\\[f'(4)=-\\frac{4}{16}+\\frac{1}{2\\cdot 2}=-\\frac14+\\frac14=0\\]</p><p>Svar: \\(f'(4)=0\\)</p>"
},
{
  "id": "der-013",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Deriveringsregler",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=e^{3x}+x\\).</p><p>Lös ekvationen \\(f'(x)=4\\).</p>",
  "svar": {
    "varde": 0,
    "tolerans": 0
  },
  "ledtradar": [
    "\\(f'(x)=3e^{3x}+1\\).",
    "Ekvationen blir \\(3e^{3x}=3\\). För vilket \\(x\\) är \\(e^{3x}=1\\)?"
  ],
  "losning": "<p>\\(f'(x)=3e^{3x}+1\\).</p><p>\\[3e^{3x}+1=4\\iff e^{3x}=1\\iff 3x=\\ln 1=0\\iff x=0\\]</p><p>Svar: \\(x=0\\)</p>"
},
{
  "id": "der-014",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Gränsvärden",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Bestäm gränsvärdet</p><p>\\[\\lim_{x\\to 2}\\frac{x^2+x-6}{x^2-4}\\]</p><p>Svara exakt eller i decimalform.</p>",
  "svar": {
    "varde": 1.25,
    "tolerans": 0.001
  },
  "ledtradar": [
    "Både täljare och nämnare blir 0 för \\(x=2\\), så båda innehåller faktorn \\((x-2)\\).",
    "\\(x^2+x-6=(x-2)(x+3)\\) och \\(x^2-4=(x-2)(x+2)\\)."
  ],
  "losning": "<p>Faktorisera och förkorta:</p><p>\\[\\frac{x^2+x-6}{x^2-4}=\\frac{(x-2)(x+3)}{(x-2)(x+2)}=\\frac{x+3}{x+2},\\quad x\\neq 2\\]</p><p>När \\(x\\to 2\\): \\(\\dfrac{2+3}{2+2}=\\dfrac54\\).</p><p>Svar: \\(\\tfrac54=1{,}25\\)</p>"
},
{
  "id": "der-015",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Derivatans definition",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Bestäm värdet av</p><p>\\[\\lim_{h\\to 0}\\frac{(2+h)^3-8}{h}\\]</p>",
  "svar": {
    "varde": 12,
    "tolerans": 0
  },
  "ledtradar": [
    "Jämför med derivatans definition \\(f'(a)=\\lim\\limits_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\). Vilken funktion \\(f\\) och vilket \\(a\\) passar?",
    "Med \\(f(x)=x^3\\) och \\(a=2\\) är \\(f(2)=8\\). Gränsvärdet är alltså \\(f'(2)\\)."
  ],
  "losning": "<p>Uttrycket är derivatans definition för \\(f(x)=x^3\\) i \\(a=2\\), eftersom \\(f(2+h)=(2+h)^3\\) och \\(f(2)=8\\).</p><p>\\(f'(x)=3x^2\\) ger \\(f'(2)=3\\cdot 4=12\\).</p><p>(Alternativt: \\((2+h)^3-8=12h+6h^2+h^3\\), dividera med \\(h\\) och låt \\(h\\to 0\\).)</p><p>Svar: \\(12\\)</p>"
},
{
  "id": "der-016",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Terrasspunkter",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "val",
  "fraga": "<p>För funktionen \\(f(x)=x^3-3x^2+3x+1\\) gäller att \\(f'(1)=0\\).</p><p>Vilket påstående om grafen i punkten där \\(x=1\\) är sant?</p>",
  "svar": {
    "alternativ": [
      "Det är en terrasspunkt.",
      "Det är en maximipunkt.",
      "Det är en minimipunkt.",
      "Det är ingen stationär punkt."
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Faktorisera \\(f'(x)=3x^2-6x+3\\).",
    "\\(f'(x)=3(x-1)^2\\). Byter derivatan tecken när \\(x\\) passerar 1?"
  ],
  "losning": "<p>\\(f'(x)=3x^2-6x+3=3(x-1)^2\\).</p><p>Teckenstudium: \\(f'(x)\\gt 0\\) både för \\(x\\lt 1\\) och \\(x\\gt 1\\), och \\(f'(1)=0\\). Derivatan byter alltså inte tecken – funktionen växer på båda sidor.</p><p>Svar: Det är en terrasspunkt.</p>"
},
{
  "id": "der-017",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Normalens ekvation",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Normalen till kurvan \\(y=x^2\\) i punkten \\((1,\\,1)\\) är den räta linje som går genom punkten och är vinkelrät mot tangenten där.</p><p>I vilken punkt skär normalen \\(y\\)-axeln? Ange \\(y\\)-koordinaten.</p>",
  "svar": {
    "varde": 1.5,
    "tolerans": 0.001
  },
  "ledtradar": [
    "Tangentens lutning är \\(k_t=y'(1)\\).",
    "För vinkelräta linjer gäller \\(k_t\\cdot k_n=-1\\)."
  ],
  "losning": "<p>\\(y'=2x\\) ger tangentens lutning \\(k_t=2\\). Normalen har \\(k_n=-\\tfrac12\\) eftersom \\(k_t\\cdot k_n=-1\\).</p><p>\\[y-1=-\\tfrac12(x-1)\\iff y=-\\tfrac12x+\\tfrac32\\]</p><p>Normalen skär \\(y\\)-axeln där \\(y=\\tfrac32\\).</p><p>Svar: \\(1{,}5\\)</p>"
},
{
  "id": "der-018",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Grafisk derivering",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "val",
  "fraga": "<p>Figuren visar grafen till <strong>derivatan</strong> \\(f'\\) av en funktion \\(f\\).</p><p>Vilket påstående om funktionen \\(f\\) är sant?</p>",
  "figur": "<svg viewBox=\"0 0 332 324\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Graf till derivatan f′\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M16 308V20M53 308V20M90 308V20M127 308V20M164 308V20M201 308V20M238 308V20M275 308V20M312 308V20M16 308H312M16 272H312M16 236H312M16 200H312M16 164H312M16 128H312M16 92H312M16 56H312M16 20H312\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M10 200H324M127 314V8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M318 196.5L324 200L318 203.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M123.5 14L127 8L130.5 14\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"324\" y=\"193\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"134\" y=\"18\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"16\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">−3</text><text x=\"53\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"90\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"164\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"201\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"238\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"275\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"123\" y=\"312.5\" text-anchor=\"end\" fill=\"currentColor\">−3</text><text x=\"123\" y=\"276.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"123\" y=\"240.5\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"123\" y=\"168.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"123\" y=\"132.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"123\" y=\"96.5\" text-anchor=\"end\" fill=\"currentColor\">3</text><text x=\"123\" y=\"60.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"123\" y=\"214\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M25.6 20.2L26.4 22.9L27.1 25.6L27.8 28.2L28.6 30.9L29.3 33.5L30.1 36.1L30.8 38.7L31.5 41.3L32.3 43.9L33 46.4L33.8 49L34.5 51.5L35.2 54L36 56.5L36.7 59L37.5 61.5L38.2 63.9L38.9 66.4L39.7 68.8L40.4 71.2L41.2 73.6L41.9 76L42.6 78.3L43.4 80.7L44.1 83L44.9 85.4L45.6 87.7L46.3 90L47.1 92.3L47.8 94.5L48.6 96.8L49.3 99L50 101.2L50.8 103.5L51.5 105.7L52.3 107.8L53 110L53.7 112.2L54.5 114.3L55.2 116.4L56 118.5L56.7 120.6L57.4 122.7L58.2 124.8L58.9 126.8L59.7 128.9L60.4 130.9L61.1 132.9L61.9 134.9L62.6 136.9L63.4 138.8L64.1 140.8L64.8 142.7L65.6 144.6L66.3 146.5L67.1 148.4L67.8 150.3L68.5 152.2L69.3 154L70 155.9L70.8 157.7L71.5 159.5L72.2 161.3L73 163.1L73.7 164.8L74.5 166.6L75.2 168.3L75.9 170L76.7 171.7L77.4 173.4L78.2 175.1L78.9 176.8L79.6 178.4L80.4 180.1L81.1 181.7L81.9 183.3L82.6 184.9L83.3 186.5L84.1 188L84.8 189.6L85.6 191.1L86.3 192.6L87 194.1L87.8 195.6L88.5 197.1L89.3 198.6L90 200L90.7 201.4L91.5 202.9L92.2 204.3L93 205.6L93.7 207L94.4 208.4L95.2 209.7L95.9 211.1L96.7 212.4L97.4 213.7L98.1 215L98.9 216.2L99.6 217.5L100.4 218.7L101.1 220L101.8 221.2L102.6 222.4L103.3 223.6L104.1 224.8L104.8 225.9L105.5 227.1L106.3 228.2L107 229.3L107.8 230.4L108.5 231.5L109.2 232.6L110 233.6L110.7 234.7L111.5 235.7L112.2 236.7L112.9 237.7L113.7 238.7L114.4 239.7L115.2 240.6L115.9 241.6L116.6 242.5L117.4 243.4L118.1 244.3L118.9 245.2L119.6 246.1L120.3 246.9L121.1 247.8L121.8 248.6L122.6 249.4L123.3 250.2L124 251L124.8 251.8L125.5 252.5L126.3 253.3L127 254L127.7 254.7L128.5 255.4L129.2 256.1L130 256.8L130.7 257.4L131.4 258.1L132.2 258.7L132.9 259.3L133.7 259.9L134.4 260.5L135.1 261L135.9 261.6L136.6 262.1L137.4 262.7L138.1 263.2L138.8 263.7L139.6 264.2L140.3 264.6L141.1 265.1L141.8 265.5L142.5 265.9L143.3 266.4L144 266.8L144.8 267.1L145.5 267.5L146.2 267.9L147 268.2L147.7 268.5L148.5 268.8L149.2 269.1L149.9 269.4L150.7 269.7L151.4 269.9L152.2 270.2L152.9 270.4L153.6 270.6L154.4 270.8L155.1 271L155.9 271.1L156.6 271.3L157.3 271.4L158.1 271.5L158.8 271.6L159.6 271.7L160.3 271.8L161 271.9L161.8 271.9L162.5 272L163.3 272L164 272L164.7 272L165.5 272L166.2 271.9L167 271.9L167.7 271.8L168.4 271.7L169.2 271.6L169.9 271.5L170.7 271.4L171.4 271.3L172.1 271.1L172.9 271L173.6 270.8L174.4 270.6L175.1 270.4L175.8 270.2L176.6 269.9L177.3 269.7L178.1 269.4L178.8 269.1L179.5 268.8L180.3 268.5L181 268.2L181.8 267.9L182.5 267.5L183.2 267.1L184 266.8L184.7 266.4L185.5 265.9L186.2 265.5L186.9 265.1L187.7 264.6L188.4 264.2L189.2 263.7L189.9 263.2L190.6 262.7L191.4 262.1L192.1 261.6L192.9 261L193.6 260.5L194.3 259.9L195.1 259.3L195.8 258.7L196.6 258.1L197.3 257.4L198 256.8L198.8 256.1L199.5 255.4L200.3 254.7L201 254L201.7 253.3L202.5 252.5L203.2 251.8L204 251L204.7 250.2L205.4 249.4L206.2 248.6L206.9 247.8L207.7 246.9L208.4 246.1L209.1 245.2L209.9 244.3L210.6 243.4L211.4 242.5L212.1 241.6L212.8 240.6L213.6 239.7L214.3 238.7L215.1 237.7L215.8 236.7L216.5 235.7L217.3 234.7L218 233.6L218.8 232.6L219.5 231.5L220.2 230.4L221 229.3L221.7 228.2L222.5 227.1L223.2 225.9L223.9 224.8L224.7 223.6L225.4 222.4L226.2 221.2L226.9 220L227.6 218.7L228.4 217.5L229.1 216.2L229.9 215L230.6 213.7L231.3 212.4L232.1 211.1L232.8 209.7L233.6 208.4L234.3 207L235 205.6L235.8 204.3L236.5 202.9L237.3 201.4L238 200L238.7 198.6L239.5 197.1L240.2 195.6L241 194.1L241.7 192.6L242.4 191.1L243.2 189.6L243.9 188L244.7 186.5L245.4 184.9L246.1 183.3L246.9 181.7L247.6 180.1L248.4 178.4L249.1 176.8L249.8 175.1L250.6 173.4L251.3 171.7L252.1 170L252.8 168.3L253.5 166.6L254.3 164.8L255 163.1L255.8 161.3L256.5 159.5L257.2 157.7L258 155.9L258.7 154L259.5 152.2L260.2 150.3L260.9 148.4L261.7 146.5L262.4 144.6L263.2 142.7L263.9 140.8L264.6 138.8L265.4 136.9L266.1 134.9L266.9 132.9L267.6 130.9L268.3 128.9L269.1 126.8L269.8 124.8L270.6 122.7L271.3 120.6L272 118.5L272.8 116.4L273.5 114.3L274.3 112.2L275 110L275.7 107.8L276.5 105.7L277.2 103.5L278 101.2L278.7 99L279.4 96.8L280.2 94.5L280.9 92.3L281.7 90L282.4 87.7L283.1 85.4L283.9 83L284.6 80.7L285.4 78.3L286.1 76L286.8 73.6L287.6 71.2L288.3 68.8L289.1 66.4L289.8 63.9L290.5 61.5L291.3 59L292 56.5L292.8 54L293.5 51.5L294.2 49L295 46.4L295.7 43.9L296.5 41.3L297.2 38.7L297.9 36.1L298.7 33.5L299.4 30.9L300.2 28.2L300.9 25.6L301.6 22.9L302.4 20.2\" stroke=\"currentColor\" stroke-width=\"2.2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"260.2\" y=\"48.8\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">y = f′(x)</text></svg>",
  "svar": {
    "alternativ": [
      "\\(f\\) har en maximipunkt där \\(x=-1\\)",
      "\\(f\\) har en minimipunkt där \\(x=-1\\)",
      "\\(f\\) har en minimipunkt där \\(x=1\\)",
      "\\(f\\) är avtagande för \\(x\\gt 3\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Grafen visar \\(f'\\), inte \\(f\\). Där \\(f'(x)\\gt 0\\) är \\(f\\) växande och där \\(f'(x)\\lt 0\\) är \\(f\\) avtagande.",
    "Undersök hur tecknet på \\(f'\\) ändras kring \\(x=-1\\)."
  ],
  "losning": "<p>Avläsning: \\(f'(x)\\gt 0\\) för \\(x\\lt -1\\), \\(f'(x)\\lt 0\\) för \\(-1\\lt x\\lt 3\\) och \\(f'(x)\\gt 0\\) för \\(x\\gt 3\\).</p><p>Kring \\(x=-1\\) går \\(f\\) från växande till avtagande, alltså har \\(f\\) en maximipunkt där. I \\(x=3\\) har \\(f\\) en minimipunkt. Att \\(f'\\) har sitt minsta värde i \\(x=1\\) betyder bara att \\(f\\) avtar snabbast där.</p><p>Svar: \\(f\\) har en maximipunkt där \\(x=-1\\).</p>"
},
{
  "id": "der-019",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Grafisk derivering",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "val",
  "fraga": "<p>Överst i figuren visas grafen till funktionen \\(f\\). Vilken av graferna A–D visar derivatan \\(f'\\)?</p>",
  "figur": "<svg viewBox=\"0 0 340 448\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Graf till f och fyra alternativ A–D\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M58 152V20M92 152V20M126 152V20M160 152V20M194 152V20M228 152V20M262 152V20M58 152H262M58 130H262M58 108H262M58 86H262M58 64H262M58 42H262M58 20H262\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M52 86H274M160 158V8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M268 82.5L274 86L268 89.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M156.5 14L160 8L163.5 14\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"274\" y=\"79\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"167\" y=\"18\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"58\" y=\"100\" text-anchor=\"middle\" fill=\"currentColor\">−3</text><text x=\"92\" y=\"100\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"126\" y=\"100\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"194\" y=\"100\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"228\" y=\"100\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"156\" y=\"156.5\" text-anchor=\"end\" fill=\"currentColor\">−3</text><text x=\"156\" y=\"134.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"156\" y=\"112.5\" text-anchor=\"end\" fill=\"currentColor\">−1</text><text x=\"156\" y=\"68.5\" text-anchor=\"end\" fill=\"currentColor\">1</text><text x=\"156\" y=\"46.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"156\" y=\"100\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M88.6 151.1L89.1 147.8L89.6 144.5L90.1 141.3L90.6 138.1L91.2 135L91.7 132L92.2 129L92.7 126.1L93.2 123.2L93.7 120.4L94.2 117.7L94.7 115L95.2 112.4L95.7 109.8L96.2 107.3L96.8 104.8L97.3 102.4L97.8 100L98.3 97.7L98.8 95.5L99.3 93.3L99.8 91.2L100.3 89.1L100.8 87.1L101.3 85.1L101.9 83.1L102.4 81.3L102.9 79.4L103.4 77.7L103.9 75.9L104.4 74.2L104.9 72.6L105.4 71L105.9 69.5L106.5 68L107 66.6L107.5 65.2L108 63.8L108.5 62.5L109 61.2L109.5 60L110 58.9L110.5 57.7L111 56.7L111.5 55.6L112.1 54.6L112.6 53.7L113.1 52.7L113.6 51.9L114.1 51L114.6 50.2L115.1 49.5L115.6 48.8L116.1 48.1L116.7 47.4L117.2 46.8L117.7 46.3L118.2 45.8L118.7 45.3L119.2 44.8L119.7 44.4L120.2 44L120.7 43.7L121.2 43.4L121.8 43.1L122.3 42.8L122.8 42.6L123.3 42.4L123.8 42.3L124.3 42.2L124.8 42.1L125.3 42L125.8 42L126.3 42L126.8 42L127.4 42.1L127.9 42.2L128.4 42.3L128.9 42.5L129.4 42.6L129.9 42.8L130.4 43.1L130.9 43.3L131.4 43.6L131.9 43.9L132.5 44.2L133 44.6L133.5 45L134 45.4L134.5 45.8L135 46.2L135.5 46.7L136 47.2L136.5 47.7L137.1 48.2L137.6 48.8L138.1 49.3L138.6 49.9L139.1 50.5L139.6 51.2L140.1 51.8L140.6 52.5L141.1 53.1L141.6 53.8L142.2 54.5L142.7 55.3L143.2 56L143.7 56.8L144.2 57.5L144.7 58.3L145.2 59.1L145.7 59.9L146.2 60.7L146.7 61.6L147.2 62.4L147.8 63.3L148.3 64.1L148.8 65L149.3 65.9L149.8 66.8L150.3 67.7L150.8 68.6L151.3 69.5L151.8 70.5L152.3 71.4L152.9 72.3L153.4 73.3L153.9 74.2L154.4 75.2L154.9 76.2L155.4 77.1L155.9 78.1L156.4 79.1L156.9 80.1L157.4 81.1L158 82L158.5 83L159 84L159.5 85L160 86L160.5 87L161 88L161.5 89L162 90L162.6 90.9L163.1 91.9L163.6 92.9L164.1 93.9L164.6 94.9L165.1 95.8L165.6 96.8L166.1 97.8L166.6 98.7L167.1 99.7L167.7 100.6L168.2 101.5L168.7 102.5L169.2 103.4L169.7 104.3L170.2 105.2L170.7 106.1L171.2 107L171.7 107.9L172.2 108.7L172.8 109.6L173.3 110.4L173.8 111.3L174.3 112.1L174.8 112.9L175.3 113.7L175.8 114.5L176.3 115.2L176.8 116L177.3 116.7L177.8 117.5L178.4 118.2L178.9 118.9L179.4 119.5L179.9 120.2L180.4 120.8L180.9 121.5L181.4 122.1L181.9 122.7L182.4 123.2L182.9 123.8L183.5 124.3L184 124.8L184.5 125.3L185 125.8L185.5 126.2L186 126.6L186.5 127L187 127.4L187.5 127.8L188.1 128.1L188.6 128.4L189.1 128.7L189.6 128.9L190.1 129.2L190.6 129.4L191.1 129.5L191.6 129.7L192.1 129.8L192.6 129.9L193.2 130L193.7 130L194.2 130L194.7 130L195.2 129.9L195.7 129.8L196.2 129.7L196.7 129.6L197.2 129.4L197.7 129.2L198.2 128.9L198.8 128.6L199.3 128.3L199.8 128L200.3 127.6L200.8 127.2L201.3 126.7L201.8 126.2L202.3 125.7L202.8 125.2L203.4 124.6L203.9 123.9L204.4 123.2L204.9 122.5L205.4 121.8L205.9 121L206.4 120.1L206.9 119.3L207.4 118.3L207.9 117.4L208.4 116.4L209 115.3L209.5 114.3L210 113.1L210.5 112L211 110.8L211.5 109.5L212 108.2L212.5 106.8L213 105.4L213.6 104L214.1 102.5L214.6 101L215.1 99.4L215.6 97.8L216.1 96.1L216.6 94.3L217.1 92.6L217.6 90.7L218.1 88.9L218.6 86.9L219.2 84.9L219.7 82.9L220.2 80.8L220.7 78.7L221.2 76.5L221.7 74.3L222.2 72L222.7 69.6L223.2 67.2L223.8 64.7L224.3 62.2L224.8 59.6L225.3 57L225.8 54.3L226.3 51.6L226.8 48.8L227.3 45.9L227.8 43L228.3 40L228.9 37L229.4 33.9L229.9 30.7L230.4 27.5L230.9 24.2L231.4 20.9\" stroke=\"currentColor\" stroke-width=\"2.2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"258.6\" y=\"143.2\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">y = f(x)</text><path d=\"M18 294V198M51 294V198M84 294V198M117 294V198M150 294V198M18 294H150M18 278H150M18 262H150M18 246H150M18 230H150M18 214H150M18 198H150\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M12 246H162M84 300V186\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M156 242.5L162 246L156 249.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M80.5 192L84 186L87.5 192\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"162\" y=\"239\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"91\" y=\"196\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"18\" y=\"260\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"51\" y=\"260\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"117\" y=\"260\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"80\" y=\"282.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"80\" y=\"218.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"80\" y=\"260\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M34.5 294L34.8 293.7L35.2 293.4L35.5 293L35.8 292.7L36.2 292.4L36.5 292.1L36.8 291.8L37.1 291.4L37.5 291.1L37.8 290.8L38.1 290.5L38.5 290.2L38.8 289.8L39.1 289.5L39.4 289.2L39.8 288.9L40.1 288.6L40.4 288.2L40.8 287.9L41.1 287.6L41.4 287.3L41.8 287L42.1 286.6L42.4 286.3L42.8 286L43.1 285.7L43.4 285.4L43.7 285L44.1 284.7L44.4 284.4L44.7 284.1L45.1 283.8L45.4 283.4L45.7 283.1L46.1 282.8L46.4 282.5L46.7 282.2L47 281.8L47.4 281.5L47.7 281.2L48 280.9L48.4 280.6L48.7 280.2L49 279.9L49.3 279.6L49.7 279.3L50 279L50.3 278.6L50.7 278.3L51 278L51.3 277.7L51.7 277.4L52 277L52.3 276.7L52.6 276.4L53 276.1L53.3 275.8L53.6 275.4L54 275.1L54.3 274.8L54.6 274.5L55 274.2L55.3 273.8L55.6 273.5L55.9 273.2L56.3 272.9L56.6 272.6L56.9 272.2L57.3 271.9L57.6 271.6L57.9 271.3L58.3 271L58.6 270.6L58.9 270.3L59.2 270L59.6 269.7L59.9 269.4L60.2 269L60.6 268.7L60.9 268.4L61.2 268.1L61.6 267.8L61.9 267.4L62.2 267.1L62.6 266.8L62.9 266.5L63.2 266.2L63.5 265.8L63.9 265.5L64.2 265.2L64.5 264.9L64.9 264.6L65.2 264.2L65.5 263.9L65.8 263.6L66.2 263.3L66.5 263L66.8 262.6L67.2 262.3L67.5 262L67.8 261.7L68.2 261.4L68.5 261L68.8 260.7L69.2 260.4L69.5 260.1L69.8 259.8L70.1 259.4L70.5 259.1L70.8 258.8L71.1 258.5L71.5 258.2L71.8 257.8L72.1 257.5L72.4 257.2L72.8 256.9L73.1 256.6L73.4 256.2L73.8 255.9L74.1 255.6L74.4 255.3L74.8 255L75.1 254.6L75.4 254.3L75.8 254L76.1 253.7L76.4 253.4L76.7 253L77.1 252.7L77.4 252.4L77.7 252.1L78.1 251.8L78.4 251.4L78.7 251.1L79.1 250.8L79.4 250.5L79.7 250.2L80 249.8L80.4 249.5L80.7 249.2L81 248.9L81.4 248.6L81.7 248.2L82 247.9L82.3 247.6L82.7 247.3L83 247L83.3 246.6L83.7 246.3L84 246L84.3 245.7L84.7 245.4L85 245L85.3 244.7L85.6 244.4L86 244.1L86.3 243.8L86.6 243.4L87 243.1L87.3 242.8L87.6 242.5L88 242.2L88.3 241.8L88.6 241.5L89 241.2L89.3 240.9L89.6 240.6L89.9 240.2L90.3 239.9L90.6 239.6L90.9 239.3L91.3 239L91.6 238.6L91.9 238.3L92.2 238L92.6 237.7L92.9 237.4L93.2 237L93.6 236.7L93.9 236.4L94.2 236.1L94.6 235.8L94.9 235.4L95.2 235.1L95.5 234.8L95.9 234.5L96.2 234.2L96.5 233.8L96.9 233.5L97.2 233.2L97.5 232.9L97.9 232.6L98.2 232.2L98.5 231.9L98.9 231.6L99.2 231.3L99.5 231L99.8 230.6L100.2 230.3L100.5 230L100.8 229.7L101.2 229.4L101.5 229L101.8 228.7L102.1 228.4L102.5 228.1L102.8 227.8L103.1 227.4L103.5 227.1L103.8 226.8L104.1 226.5L104.5 226.2L104.8 225.8L105.1 225.5L105.5 225.2L105.8 224.9L106.1 224.6L106.4 224.2L106.8 223.9L107.1 223.6L107.4 223.3L107.8 223L108.1 222.6L108.4 222.3L108.8 222L109.1 221.7L109.4 221.4L109.7 221L110.1 220.7L110.4 220.4L110.7 220.1L111.1 219.8L111.4 219.4L111.7 219.1L112 218.8L112.4 218.5L112.7 218.2L113 217.8L113.4 217.5L113.7 217.2L114 216.9L114.4 216.6L114.7 216.2L115 215.9L115.4 215.6L115.7 215.3L116 215L116.3 214.6L116.7 214.3L117 214L117.3 213.7L117.7 213.4L118 213L118.3 212.7L118.6 212.4L119 212.1L119.3 211.8L119.6 211.4L120 211.1L120.3 210.8L120.6 210.5L121 210.2L121.3 209.8L121.6 209.5L122 209.2L122.3 208.9L122.6 208.6L122.9 208.2L123.3 207.9L123.6 207.6L123.9 207.3L124.3 207L124.6 206.6L124.9 206.3L125.2 206L125.6 205.7L125.9 205.4L126.2 205L126.6 204.7L126.9 204.4L127.2 204.1L127.6 203.8L127.9 203.4L128.2 203.1L128.6 202.8L128.9 202.5L129.2 202.2L129.5 201.8L129.9 201.5L130.2 201.2L130.5 200.9L130.9 200.6L131.2 200.2L131.5 199.9L131.9 199.6L132.2 199.3L132.5 199L132.8 198.6L133.2 198.3L133.5 198\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"4\" y=\"191\" fill=\"currentColor\" font-weight=\"bold\">A</text><path d=\"M188 294V198M221 294V198M254 294V198M287 294V198M320 294V198M188 294H320M188 278H320M188 262H320M188 246H320M188 230H320M188 214H320M188 198H320\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M182 246H332M254 300V186\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M326 242.5L332 246L326 249.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M250.5 192L254 186L257.5 192\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"332\" y=\"239\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"261\" y=\"196\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"188\" y=\"260\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"221\" y=\"260\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"287\" y=\"260\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"250\" y=\"282.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"250\" y=\"218.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"250\" y=\"260\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M188 294L188.3 293.4L188.7 292.7L189 292.1L189.3 291.5L189.7 290.8L190 290.2L190.3 289.6L190.6 289L191 288.4L191.3 287.8L191.6 287.2L192 286.6L192.3 286L192.6 285.4L192.9 284.8L193.3 284.2L193.6 283.6L193.9 283L194.3 282.4L194.6 281.8L194.9 281.3L195.3 280.7L195.6 280.1L195.9 279.6L196.2 279L196.6 278.4L196.9 277.9L197.2 277.3L197.6 276.8L197.9 276.2L198.2 275.7L198.6 275.2L198.9 274.6L199.2 274.1L199.6 273.6L199.9 273L200.2 272.5L200.5 272L200.9 271.5L201.2 271L201.5 270.4L201.9 269.9L202.2 269.4L202.5 268.9L202.8 268.4L203.2 267.9L203.5 267.5L203.8 267L204.2 266.5L204.5 266L204.8 265.5L205.2 265L205.5 264.6L205.8 264.1L206.2 263.6L206.5 263.2L206.8 262.7L207.1 262.3L207.5 261.8L207.8 261.4L208.1 260.9L208.5 260.5L208.8 260L209.1 259.6L209.4 259.2L209.8 258.7L210.1 258.3L210.4 257.9L210.8 257.5L211.1 257L211.4 256.6L211.8 256.2L212.1 255.8L212.4 255.4L212.8 255L213.1 254.6L213.4 254.2L213.7 253.8L214.1 253.4L214.4 253L214.7 252.7L215.1 252.3L215.4 251.9L215.7 251.5L216.1 251.2L216.4 250.8L216.7 250.4L217 250.1L217.4 249.7L217.7 249.4L218 249L218.4 248.7L218.7 248.3L219 248L219.3 247.6L219.7 247.3L220 247L220.3 246.6L220.7 246.3L221 246L221.3 245.7L221.7 245.4L222 245.1L222.3 244.7L222.7 244.4L223 244.1L223.3 243.8L223.6 243.5L224 243.2L224.3 243L224.6 242.7L225 242.4L225.3 242.1L225.6 241.8L225.9 241.6L226.3 241.3L226.6 241L226.9 240.8L227.3 240.5L227.6 240.2L227.9 240L228.3 239.7L228.6 239.5L228.9 239.2L229.2 239L229.6 238.8L229.9 238.5L230.2 238.3L230.6 238.1L230.9 237.8L231.2 237.6L231.6 237.4L231.9 237.2L232.2 237L232.6 236.8L232.9 236.6L233.2 236.4L233.5 236.2L233.9 236L234.2 235.8L234.5 235.6L234.9 235.4L235.2 235.2L235.5 235L235.8 234.8L236.2 234.7L236.5 234.5L236.8 234.3L237.2 234.2L237.5 234L237.8 233.8L238.2 233.7L238.5 233.5L238.8 233.4L239.2 233.2L239.5 233.1L239.8 233L240.1 232.8L240.5 232.7L240.8 232.6L241.1 232.4L241.5 232.3L241.8 232.2L242.1 232.1L242.4 232L242.8 231.8L243.1 231.7L243.4 231.6L243.8 231.5L244.1 231.4L244.4 231.3L244.8 231.3L245.1 231.2L245.4 231.1L245.8 231L246.1 230.9L246.4 230.8L246.7 230.8L247.1 230.7L247.4 230.6L247.7 230.6L248.1 230.5L248.4 230.5L248.7 230.4L249.1 230.4L249.4 230.3L249.7 230.3L250 230.2L250.4 230.2L250.7 230.2L251 230.1L251.4 230.1L251.7 230.1L252 230.1L252.3 230L252.7 230L253 230L253.3 230L253.7 230L254 230L254.3 230L254.7 230L255 230L255.3 230L255.6 230L256 230.1L256.3 230.1L256.6 230.1L257 230.1L257.3 230.2L257.6 230.2L258 230.2L258.3 230.3L258.6 230.3L258.9 230.4L259.3 230.4L259.6 230.5L259.9 230.5L260.3 230.6L260.6 230.6L260.9 230.7L261.3 230.8L261.6 230.8L261.9 230.9L262.2 231L262.6 231.1L262.9 231.2L263.2 231.3L263.6 231.3L263.9 231.4L264.2 231.5L264.6 231.6L264.9 231.7L265.2 231.8L265.6 232L265.9 232.1L266.2 232.2L266.5 232.3L266.9 232.4L267.2 232.6L267.5 232.7L267.9 232.8L268.2 233L268.5 233.1L268.9 233.2L269.2 233.4L269.5 233.5L269.8 233.7L270.2 233.8L270.5 234L270.8 234.2L271.2 234.3L271.5 234.5L271.8 234.7L272.1 234.8L272.5 235L272.8 235.2L273.1 235.4L273.5 235.6L273.8 235.8L274.1 236L274.5 236.2L274.8 236.4L275.1 236.6L275.4 236.8L275.8 237L276.1 237.2L276.4 237.4L276.8 237.6L277.1 237.8L277.4 238.1L277.8 238.3L278.1 238.5L278.4 238.8L278.8 239L279.1 239.2L279.4 239.5L279.7 239.7L280.1 240L280.4 240.2L280.7 240.5L281.1 240.8L281.4 241L281.7 241.3L282.1 241.6L282.4 241.8L282.7 242.1L283 242.4L283.4 242.7L283.7 243L284 243.2L284.4 243.5L284.7 243.8L285 244.1L285.4 244.4L285.7 244.7L286 245.1L286.3 245.4L286.7 245.7L287 246L287.3 246.3L287.7 246.6L288 247L288.3 247.3L288.6 247.6L289 248L289.3 248.3L289.6 248.7L290 249L290.3 249.4L290.6 249.7L291 250.1L291.3 250.4L291.6 250.8L291.9 251.2L292.3 251.5L292.6 251.9L292.9 252.3L293.3 252.7L293.6 253L293.9 253.4L294.3 253.8L294.6 254.2L294.9 254.6L295.2 255L295.6 255.4L295.9 255.8L296.2 256.2L296.6 256.6L296.9 257L297.2 257.5L297.6 257.9L297.9 258.3L298.2 258.7L298.6 259.2L298.9 259.6L299.2 260L299.5 260.5L299.9 260.9L300.2 261.4L300.5 261.8L300.9 262.3L301.2 262.7L301.5 263.2L301.9 263.6L302.2 264.1L302.5 264.6L302.8 265L303.2 265.5L303.5 266L303.8 266.5L304.2 267L304.5 267.5L304.8 267.9L305.1 268.4L305.5 268.9L305.8 269.4L306.1 269.9L306.5 270.4L306.8 271L307.1 271.5L307.5 272L307.8 272.5L308.1 273L308.4 273.6L308.8 274.1L309.1 274.6L309.4 275.2L309.8 275.7L310.1 276.2L310.4 276.8L310.8 277.3L311.1 277.9L311.4 278.4L311.8 279L312.1 279.6L312.4 280.1L312.7 280.7L313.1 281.3L313.4 281.8L313.7 282.4L314.1 283L314.4 283.6L314.7 284.2L315.1 284.8L315.4 285.4L315.7 286L316 286.6L316.4 287.2L316.7 287.8L317 288.4L317.4 289L317.7 289.6L318 290.2L318.4 290.8L318.7 291.5L319 292.1L319.3 292.7L319.7 293.4L320 294\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"174\" y=\"191\" fill=\"currentColor\" font-weight=\"bold\">B</text><path d=\"M18 430V334M51 430V334M84 430V334M117 430V334M150 430V334M18 430H150M18 414H150M18 398H150M18 382H150M18 366H150M18 350H150M18 334H150\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M12 382H162M84 436V322\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M156 378.5L162 382L156 385.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M80.5 328L84 322L87.5 328\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"162\" y=\"375\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"91\" y=\"332\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"18\" y=\"396\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"51\" y=\"396\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"117\" y=\"396\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"80\" y=\"418.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"80\" y=\"354.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"80\" y=\"396\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M18 334L18.3 334.6L18.7 335.3L19 335.9L19.3 336.5L19.7 337.2L20 337.8L20.3 338.4L20.6 339L21 339.6L21.3 340.2L21.6 340.8L22 341.4L22.3 342L22.6 342.6L22.9 343.2L23.3 343.8L23.6 344.4L23.9 345L24.3 345.6L24.6 346.2L24.9 346.7L25.3 347.3L25.6 347.9L25.9 348.4L26.2 349L26.6 349.6L26.9 350.1L27.2 350.7L27.6 351.2L27.9 351.8L28.2 352.3L28.6 352.8L28.9 353.4L29.2 353.9L29.6 354.4L29.9 355L30.2 355.5L30.5 356L30.9 356.5L31.2 357L31.5 357.6L31.9 358.1L32.2 358.6L32.5 359.1L32.8 359.6L33.2 360.1L33.5 360.5L33.8 361L34.2 361.5L34.5 362L34.8 362.5L35.2 363L35.5 363.4L35.8 363.9L36.2 364.4L36.5 364.8L36.8 365.3L37.1 365.7L37.5 366.2L37.8 366.6L38.1 367.1L38.5 367.5L38.8 368L39.1 368.4L39.4 368.8L39.8 369.3L40.1 369.7L40.4 370.1L40.8 370.5L41.1 371L41.4 371.4L41.8 371.8L42.1 372.2L42.4 372.6L42.8 373L43.1 373.4L43.4 373.8L43.7 374.2L44.1 374.6L44.4 375L44.7 375.3L45.1 375.7L45.4 376.1L45.7 376.5L46.1 376.8L46.4 377.2L46.7 377.6L47 377.9L47.4 378.3L47.7 378.6L48 379L48.4 379.3L48.7 379.7L49 380L49.3 380.4L49.7 380.7L50 381L50.3 381.4L50.7 381.7L51 382L51.3 382.3L51.7 382.6L52 382.9L52.3 383.3L52.6 383.6L53 383.9L53.3 384.2L53.6 384.5L54 384.8L54.3 385L54.6 385.3L55 385.6L55.3 385.9L55.6 386.2L55.9 386.4L56.3 386.7L56.6 387L56.9 387.2L57.3 387.5L57.6 387.8L57.9 388L58.3 388.3L58.6 388.5L58.9 388.8L59.2 389L59.6 389.2L59.9 389.5L60.2 389.7L60.6 389.9L60.9 390.2L61.2 390.4L61.6 390.6L61.9 390.8L62.2 391L62.6 391.2L62.9 391.4L63.2 391.6L63.5 391.8L63.9 392L64.2 392.2L64.5 392.4L64.9 392.6L65.2 392.8L65.5 393L65.8 393.2L66.2 393.3L66.5 393.5L66.8 393.7L67.2 393.8L67.5 394L67.8 394.2L68.2 394.3L68.5 394.5L68.8 394.6L69.2 394.8L69.5 394.9L69.8 395L70.1 395.2L70.5 395.3L70.8 395.4L71.1 395.6L71.5 395.7L71.8 395.8L72.1 395.9L72.4 396L72.8 396.2L73.1 396.3L73.4 396.4L73.8 396.5L74.1 396.6L74.4 396.7L74.8 396.7L75.1 396.8L75.4 396.9L75.8 397L76.1 397.1L76.4 397.2L76.7 397.2L77.1 397.3L77.4 397.4L77.7 397.4L78.1 397.5L78.4 397.5L78.7 397.6L79.1 397.6L79.4 397.7L79.7 397.7L80 397.8L80.4 397.8L80.7 397.8L81 397.9L81.4 397.9L81.7 397.9L82 397.9L82.3 398L82.7 398L83 398L83.3 398L83.7 398L84 398L84.3 398L84.7 398L85 398L85.3 398L85.6 398L86 397.9L86.3 397.9L86.6 397.9L87 397.9L87.3 397.8L87.6 397.8L88 397.8L88.3 397.7L88.6 397.7L89 397.6L89.3 397.6L89.6 397.5L89.9 397.5L90.3 397.4L90.6 397.4L90.9 397.3L91.3 397.2L91.6 397.2L91.9 397.1L92.2 397L92.6 396.9L92.9 396.8L93.2 396.7L93.6 396.7L93.9 396.6L94.2 396.5L94.6 396.4L94.9 396.3L95.2 396.2L95.5 396L95.9 395.9L96.2 395.8L96.5 395.7L96.9 395.6L97.2 395.4L97.5 395.3L97.9 395.2L98.2 395L98.5 394.9L98.9 394.8L99.2 394.6L99.5 394.5L99.8 394.3L100.2 394.2L100.5 394L100.8 393.8L101.2 393.7L101.5 393.5L101.8 393.3L102.1 393.2L102.5 393L102.8 392.8L103.1 392.6L103.5 392.4L103.8 392.2L104.1 392L104.5 391.8L104.8 391.6L105.1 391.4L105.5 391.2L105.8 391L106.1 390.8L106.4 390.6L106.8 390.4L107.1 390.2L107.4 389.9L107.8 389.7L108.1 389.5L108.4 389.2L108.8 389L109.1 388.8L109.4 388.5L109.7 388.3L110.1 388L110.4 387.8L110.7 387.5L111.1 387.2L111.4 387L111.7 386.7L112 386.4L112.4 386.2L112.7 385.9L113 385.6L113.4 385.3L113.7 385L114 384.8L114.4 384.5L114.7 384.2L115 383.9L115.4 383.6L115.7 383.3L116 382.9L116.3 382.6L116.7 382.3L117 382L117.3 381.7L117.7 381.4L118 381L118.3 380.7L118.6 380.4L119 380L119.3 379.7L119.6 379.3L120 379L120.3 378.6L120.6 378.3L121 377.9L121.3 377.6L121.6 377.2L122 376.8L122.3 376.5L122.6 376.1L122.9 375.7L123.3 375.3L123.6 375L123.9 374.6L124.3 374.2L124.6 373.8L124.9 373.4L125.2 373L125.6 372.6L125.9 372.2L126.2 371.8L126.6 371.4L126.9 371L127.2 370.5L127.6 370.1L127.9 369.7L128.2 369.3L128.6 368.8L128.9 368.4L129.2 368L129.5 367.5L129.9 367.1L130.2 366.6L130.5 366.2L130.9 365.7L131.2 365.3L131.5 364.8L131.9 364.4L132.2 363.9L132.5 363.4L132.8 363L133.2 362.5L133.5 362L133.8 361.5L134.2 361L134.5 360.5L134.8 360.1L135.1 359.6L135.5 359.1L135.8 358.6L136.1 358.1L136.5 357.6L136.8 357L137.1 356.5L137.5 356L137.8 355.5L138.1 355L138.4 354.4L138.8 353.9L139.1 353.4L139.4 352.8L139.8 352.3L140.1 351.8L140.4 351.2L140.8 350.7L141.1 350.1L141.4 349.6L141.8 349L142.1 348.4L142.4 347.9L142.7 347.3L143.1 346.7L143.4 346.2L143.7 345.6L144.1 345L144.4 344.4L144.7 343.8L145.1 343.2L145.4 342.6L145.7 342L146 341.4L146.4 340.8L146.7 340.2L147 339.6L147.4 339L147.7 338.4L148 337.8L148.3 337.2L148.7 336.5L149 335.9L149.3 335.3L149.7 334.6L150 334\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"4\" y=\"327\" fill=\"currentColor\" font-weight=\"bold\">C</text><path d=\"M188 430V334M221 430V334M254 430V334M287 430V334M320 430V334M188 430H320M188 414H320M188 398H320M188 382H320M188 366H320M188 350H320M188 334H320\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M182 382H332M254 436V322\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M326 378.5L332 382L326 385.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M250.5 328L254 322L257.5 328\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"332\" y=\"375\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">x</text><text x=\"261\" y=\"332\" fill=\"currentColor\" font-style=\"italic\">y</text><text x=\"188\" y=\"396\" text-anchor=\"middle\" fill=\"currentColor\">−2</text><text x=\"221\" y=\"396\" text-anchor=\"middle\" fill=\"currentColor\">−1</text><text x=\"287\" y=\"396\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"250\" y=\"418.5\" text-anchor=\"end\" fill=\"currentColor\">−2</text><text x=\"250\" y=\"354.5\" text-anchor=\"end\" fill=\"currentColor\">2</text><text x=\"250\" y=\"396\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M188 366L188.3 366.6L188.7 367.3L189 367.9L189.3 368.5L189.7 369.2L190 369.8L190.3 370.4L190.6 371L191 371.6L191.3 372.2L191.6 372.8L192 373.4L192.3 374L192.6 374.6L192.9 375.2L193.3 375.8L193.6 376.4L193.9 377L194.3 377.6L194.6 378.2L194.9 378.7L195.3 379.3L195.6 379.9L195.9 380.4L196.2 381L196.6 381.6L196.9 382.1L197.2 382.7L197.6 383.2L197.9 383.8L198.2 384.3L198.6 384.8L198.9 385.4L199.2 385.9L199.6 386.4L199.9 387L200.2 387.5L200.5 388L200.9 388.5L201.2 389L201.5 389.6L201.9 390.1L202.2 390.6L202.5 391.1L202.8 391.6L203.2 392.1L203.5 392.5L203.8 393L204.2 393.5L204.5 394L204.8 394.5L205.2 395L205.5 395.4L205.8 395.9L206.2 396.4L206.5 396.8L206.8 397.3L207.1 397.7L207.5 398.2L207.8 398.6L208.1 399.1L208.5 399.5L208.8 400L209.1 400.4L209.4 400.8L209.8 401.3L210.1 401.7L210.4 402.1L210.8 402.5L211.1 403L211.4 403.4L211.8 403.8L212.1 404.2L212.4 404.6L212.8 405L213.1 405.4L213.4 405.8L213.7 406.2L214.1 406.6L214.4 407L214.7 407.3L215.1 407.7L215.4 408.1L215.7 408.5L216.1 408.8L216.4 409.2L216.7 409.6L217 409.9L217.4 410.3L217.7 410.6L218 411L218.4 411.3L218.7 411.7L219 412L219.3 412.4L219.7 412.7L220 413L220.3 413.4L220.7 413.7L221 414L221.3 414.3L221.7 414.6L222 414.9L222.3 415.3L222.7 415.6L223 415.9L223.3 416.2L223.6 416.5L224 416.8L224.3 417L224.6 417.3L225 417.6L225.3 417.9L225.6 418.2L225.9 418.4L226.3 418.7L226.6 419L226.9 419.2L227.3 419.5L227.6 419.8L227.9 420L228.3 420.3L228.6 420.5L228.9 420.8L229.2 421L229.6 421.2L229.9 421.5L230.2 421.7L230.6 421.9L230.9 422.2L231.2 422.4L231.6 422.6L231.9 422.8L232.2 423L232.6 423.2L232.9 423.4L233.2 423.6L233.5 423.8L233.9 424L234.2 424.2L234.5 424.4L234.9 424.6L235.2 424.8L235.5 425L235.8 425.2L236.2 425.3L236.5 425.5L236.8 425.7L237.2 425.8L237.5 426L237.8 426.2L238.2 426.3L238.5 426.5L238.8 426.6L239.2 426.8L239.5 426.9L239.8 427L240.1 427.2L240.5 427.3L240.8 427.4L241.1 427.6L241.5 427.7L241.8 427.8L242.1 427.9L242.4 428L242.8 428.2L243.1 428.3L243.4 428.4L243.8 428.5L244.1 428.6L244.4 428.7L244.8 428.7L245.1 428.8L245.4 428.9L245.8 429L246.1 429.1L246.4 429.2L246.7 429.2L247.1 429.3L247.4 429.4L247.7 429.4L248.1 429.5L248.4 429.5L248.7 429.6L249.1 429.6L249.4 429.7L249.7 429.7L250 429.8L250.4 429.8L250.7 429.8L251 429.9L251.4 429.9L251.7 429.9L252 429.9L252.3 430L252.7 430L253 430L253.3 430L253.7 430L254 430L254.3 430L254.7 430L255 430L255.3 430L255.6 430L256 429.9L256.3 429.9L256.6 429.9L257 429.9L257.3 429.8L257.6 429.8L258 429.8L258.3 429.7L258.6 429.7L258.9 429.6L259.3 429.6L259.6 429.5L259.9 429.5L260.3 429.4L260.6 429.4L260.9 429.3L261.3 429.2L261.6 429.2L261.9 429.1L262.2 429L262.6 428.9L262.9 428.8L263.2 428.7L263.6 428.7L263.9 428.6L264.2 428.5L264.6 428.4L264.9 428.3L265.2 428.2L265.6 428L265.9 427.9L266.2 427.8L266.5 427.7L266.9 427.6L267.2 427.4L267.5 427.3L267.9 427.2L268.2 427L268.5 426.9L268.9 426.8L269.2 426.6L269.5 426.5L269.8 426.3L270.2 426.2L270.5 426L270.8 425.8L271.2 425.7L271.5 425.5L271.8 425.3L272.1 425.2L272.5 425L272.8 424.8L273.1 424.6L273.5 424.4L273.8 424.2L274.1 424L274.5 423.8L274.8 423.6L275.1 423.4L275.4 423.2L275.8 423L276.1 422.8L276.4 422.6L276.8 422.4L277.1 422.2L277.4 421.9L277.8 421.7L278.1 421.5L278.4 421.2L278.8 421L279.1 420.8L279.4 420.5L279.7 420.3L280.1 420L280.4 419.8L280.7 419.5L281.1 419.2L281.4 419L281.7 418.7L282.1 418.4L282.4 418.2L282.7 417.9L283 417.6L283.4 417.3L283.7 417L284 416.8L284.4 416.5L284.7 416.2L285 415.9L285.4 415.6L285.7 415.3L286 414.9L286.3 414.6L286.7 414.3L287 414L287.3 413.7L287.7 413.4L288 413L288.3 412.7L288.6 412.4L289 412L289.3 411.7L289.6 411.3L290 411L290.3 410.6L290.6 410.3L291 409.9L291.3 409.6L291.6 409.2L291.9 408.8L292.3 408.5L292.6 408.1L292.9 407.7L293.3 407.3L293.6 407L293.9 406.6L294.3 406.2L294.6 405.8L294.9 405.4L295.2 405L295.6 404.6L295.9 404.2L296.2 403.8L296.6 403.4L296.9 403L297.2 402.5L297.6 402.1L297.9 401.7L298.2 401.3L298.6 400.8L298.9 400.4L299.2 400L299.5 399.5L299.9 399.1L300.2 398.6L300.5 398.2L300.9 397.7L301.2 397.3L301.5 396.8L301.9 396.4L302.2 395.9L302.5 395.4L302.8 395L303.2 394.5L303.5 394L303.8 393.5L304.2 393L304.5 392.5L304.8 392.1L305.1 391.6L305.5 391.1L305.8 390.6L306.1 390.1L306.5 389.6L306.8 389L307.1 388.5L307.5 388L307.8 387.5L308.1 387L308.4 386.4L308.8 385.9L309.1 385.4L309.4 384.8L309.8 384.3L310.1 383.8L310.4 383.2L310.8 382.7L311.1 382.1L311.4 381.6L311.8 381L312.1 380.4L312.4 379.9L312.7 379.3L313.1 378.7L313.4 378.2L313.7 377.6L314.1 377L314.4 376.4L314.7 375.8L315.1 375.2L315.4 374.6L315.7 374L316 373.4L316.4 372.8L316.7 372.2L317 371.6L317.4 371L317.7 370.4L318 369.8L318.4 369.2L318.7 368.5L319 367.9L319.3 367.3L319.7 366.6L320 366\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/><text x=\"174\" y=\"327\" fill=\"currentColor\" font-weight=\"bold\">D</text></svg>",
  "svar": {
    "alternativ": [
      "A",
      "B",
      "C",
      "D"
    ],
    "ratt": 2
  },
  "ledtradar": [
    "Där \\(f\\) har max- och minimipunkter är \\(f'(x)=0\\). Läs av deras \\(x\\)-koordinater.",
    "Där \\(f\\) växer ska grafen till \\(f'\\) ligga ovanför \\(x\\)-axeln."
  ],
  "losning": "<p>Grafen till \\(f\\) har en maximipunkt i \\(x=-1\\) och en minimipunkt i \\(x=1\\). Alltså ska \\(f'\\) ha nollställen i \\(x=\\pm1\\).</p><p>\\(f\\) växer för \\(x\\lt -1\\) och \\(x\\gt 1\\) och avtar däremellan, så \\(f'\\) är positiv utanför intervallet och negativ i det. Det stämmer med graf C.</p><ul><li>A har bara ett nollställe.</li><li>B har rätt nollställen men fel tecken.</li><li>D har nollställen där \\(f\\) har sina nollställen (\\(x\\approx\\pm1{,}7\\)) – ett vanligt fel.</li></ul><p>Svar: C</p>"
},
{
  "id": "der-020",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Villkor för deriverbarhet",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "tal",
  "fraga": "<p>Funktionen \\(f\\) definieras av</p><p>\\[f(x)=\\begin{cases}x^2 & x\\le 1\\\\ ax+b & x\\gt 1\\end{cases}\\]</p><p>Konstanterna \\(a\\) och \\(b\\) ska väljas så att \\(f\\) är deriverbar för alla \\(x\\). Bestäm \\(b\\).</p>",
  "svar": {
    "varde": -1,
    "tolerans": 0
  },
  "ledtradar": [
    "För att \\(f\\) ska vara deriverbar i \\(x=1\\) måste grafen hänga ihop där <em>och</em> lutningen vara densamma från båda hållen.",
    "Lutningen från vänster är \\(D(x^2)\\) i \\(x=1\\), dvs. 2. Det ger \\(a\\). Kontinuitet ger sedan \\(a+b=1\\)."
  ],
  "losning": "<p>Två villkor i \\(x=1\\):</p><ol><li>Samma lutning: derivatan av \\(x^2\\) är \\(2x\\), som är 2 i \\(x=1\\). Linjens lutning är \\(a\\), alltså \\(a=2\\).</li><li>Grafen hänger ihop: \\(1^2=a\\cdot 1+b\\iff 1=2+b\\iff b=-1\\).</li></ol><p>Linjen \\(y=2x-1\\) är då tangenten till parabeln i \\((1,\\,1)\\).</p><p>Svar: \\(b=-1\\)</p>"
},
{
  "id": "der-021",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Derivatans definition",
  "niva": "A",
  "poang": "0/0/1",
  "typ": "val",
  "fraga": "<p>Vilket värde har gränsvärdet</p><p>\\[\\lim_{h\\to 0}\\frac{5^h-1}{h}\\;?\\]</p>",
  "svar": {
    "alternativ": [
      "\\(\\ln 5\\)",
      "\\(0\\)",
      "\\(1\\)",
      "\\(5\\)",
      "\\(\\dfrac{1}{\\ln 5}\\)"
    ],
    "ratt": 0
  },
  "ledtradar": [
    "Skriv \\(1\\) som \\(5^0\\). Känner du igen derivatans definition?",
    "Uttrycket är \\(\\dfrac{f(0+h)-f(0)}{h}\\) för \\(f(x)=5^x\\). Gränsvärdet är alltså \\(f'(0)\\)."
  ],
  "losning": "<p>Med \\(f(x)=5^x\\) är \\(f(0)=5^0=1\\), så</p><p>\\[\\lim_{h\\to 0}\\frac{5^h-1}{h}=\\lim_{h\\to 0}\\frac{f(0+h)-f(0)}{h}=f'(0)\\]</p><p>Eftersom \\(f'(x)=5^x\\ln 5\\) blir \\(f'(0)=5^0\\ln 5=\\ln 5\\).</p><p>Svar: \\(\\ln 5\\)</p>"
},
{
  "id": "der-022",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "A",
  "omrade": "Derivata",
  "moment": "Andraderivata",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "flera",
  "fraga": "<p>Bestäm alla värden på konstanten \\(k\\) så att funktionen \\(f(x)=e^{kx}\\) uppfyller</p><p>\\[f''(x)-5f'(x)+6f(x)=0\\]</p><p>för alla \\(x\\).</p>",
  "svar": {
    "varden": [
      2,
      3
    ],
    "tolerans": 0
  },
  "ledtradar": [
    "\\(f'(x)=ke^{kx}\\) och \\(f''(x)=k^2e^{kx}\\).",
    "Sätt in i ekvationen och bryt ut \\(e^{kx}\\). Eftersom \\(e^{kx}\\gt 0\\) kan du dividera bort den."
  ],
  "losning": "<p>\\(f'(x)=ke^{kx}\\), \\(f''(x)=k^2e^{kx}\\). Insättning:</p><p>\\[k^2e^{kx}-5ke^{kx}+6e^{kx}=e^{kx}(k^2-5k+6)=0\\]</p><p>Eftersom \\(e^{kx}\\gt 0\\) för alla \\(x\\) måste \\(k^2-5k+6=0\\), dvs. \\((k-2)(k-3)=0\\).</p><p>Svar: \\(k=2\\) eller \\(k=3\\)</p>"
},
{
  "id": "der-023",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Digital derivering",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=0{,}4x^3-2x^2+x+5\\).</p><p>Bestäm \\(f'(3)\\).</p>",
  "svar": {
    "varde": -0.2,
    "tolerans": 0.001
  },
  "ledtradar": [
    "Skriv in funktionen i GeoGebra och använd kommandot <code>Derivata(f)</code>.",
    "Skriv sedan <code>f'(3)</code> i inmatningsfältet."
  ],
  "losning": "<p>I GeoGebra:</p><ol><li><code>f(x)=0.4x^3-2x^2+x+5</code></li><li><code>Derivata(f)</code> ger \\(f'(x)=1{,}2x^2-4x+1\\)</li><li><code>f'(3)</code> ger \\(-0{,}2\\)</li></ol><p>Kontroll för hand: \\(1{,}2\\cdot 9-12+1=10{,}8-12+1=-0{,}2\\).</p><p>Svar: \\(f'(3)=-0{,}2\\)</p>"
},
{
  "id": "der-024",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Förändringshastighet",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>En kopp kaffe svalnar. Kaffets temperatur \\(T\\) °C efter \\(t\\) minuter kan beskrivas med modellen</p><p>\\[T(t)=20+65e^{-0{,}08t}\\]</p><p>Bestäm \\(T'(10)\\) och avrunda till två decimaler.</p>",
  "svar": {
    "varde": -2.34,
    "tolerans": 0.005,
    "enhet": "°C/min"
  },
  "ledtradar": [
    "Använd <code>Derivata(T)</code> i GeoGebra och beräkna sedan värdet för \\(t=10\\).",
    "Tänk på enheten: temperatur per tid. Svaret ska bli negativt eftersom kaffet svalnar."
  ],
  "losning": "<p>I GeoGebra: <code>T(t)=20+65e^(-0.08t)</code>, <code>Derivata(T)</code> och sedan <code>T'(10)</code>.</p><p>För hand: \\(T'(t)=65\\cdot(-0{,}08)e^{-0{,}08t}=-5{,}2e^{-0{,}08t}\\), så</p><p>\\[T'(10)=-5{,}2e^{-0{,}8}\\approx -2{,}34\\]</p><p>Tolkning: 10 minuter efter start sjunker temperaturen med ungefär 2,3 °C per minut.</p><p>Svar: \\(T'(10)\\approx -2{,}34\\) °C/min</p>"
},
{
  "id": "der-025",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Extrempunkter",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "flera",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=0{,}2x^4-x^3+0{,}5x^2+3x\\).</p><p>Grafen till \\(f\\) har tre extrempunkter. Bestäm deras \\(x\\)-koordinater med två decimaler.</p>",
  "svar": {
    "varden": [
      -0.78,
      1.68,
      2.85
    ],
    "tolerans": 0.005
  },
  "ledtradar": [
    "Rita grafen i GeoGebra och använd kommandot <code>Extrempunkt(f)</code>.",
    "Alternativt: lös \\(f'(x)=0\\) med <code>NLös(f'(x)=0)</code> i CAS."
  ],
  "losning": "<p>I GeoGebra: <code>f(x)=0.2x^4-x^3+0.5x^2+3x</code> och <code>Extrempunkt(f)</code>. Det ger punkterna</p><ul><li>\\((-0{,}78;\\,-1{,}49)\\) – minimipunkt</li><li>\\((1{,}68;\\,3{,}30)\\) – maximipunkt</li><li>\\((2{,}85;\\,2{,}66)\\) – minimipunkt</li></ul><p>(Samma \\(x\\)-värden fås med <code>NLös(f'(x)=0)</code>.)</p><p>Svar: \\(x\\approx -0{,}78\\), \\(x\\approx 1{,}68\\) och \\(x\\approx 2{,}85\\)</p>"
},
{
  "id": "der-026",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Andraderivata",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=3e^{0{,}4x}-x^2\\).</p><p>Bestäm \\(f''(2)\\) med två decimaler.</p>",
  "svar": {
    "varde": -0.93,
    "tolerans": 0.005
  },
  "ledtradar": [
    "Använd <code>Derivata(f, 2)</code> i GeoGebra för att få andraderivatan direkt.",
    "För hand: \\(f'(x)=1{,}2e^{0{,}4x}-2x\\)."
  ],
  "losning": "<p>I GeoGebra: <code>f(x)=3e^(0.4x)-x^2</code>, sedan <code>Derivata(f, 2)</code> och <code>f''(2)</code>.</p><p>För hand: \\(f'(x)=1{,}2e^{0{,}4x}-2x\\) och \\(f''(x)=0{,}48e^{0{,}4x}-2\\).</p><p>\\[f''(2)=0{,}48e^{0{,}8}-2\\approx -0{,}93\\]</p><p>Svar: \\(f''(2)\\approx -0{,}93\\)</p>"
},
{
  "id": "der-027",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Extremvärdesproblem",
  "niva": "E",
  "poang": "2/0/0",
  "typ": "redovisning",
  "fraga": "<p>Av en rektangulär kartongbit som är 30 cm lång och 20 cm bred ska man göra en låda utan lock. Man klipper bort lika stora kvadrater med sidan \\(x\\) cm i varje hörn och viker upp kanterna, se figur.</p><p>Bestäm den största volym lådan kan få.</p>",
  "figur": "<svg viewBox=\"0 0 340 222\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Rektangulär kartong med fyra hörn bortklippta\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M58.4 24H247.6V58.4H282V161.6H247.6V196H58.4V161.6H24V58.4H58.4Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M24 24h34.4v34.4h-34.4zM247.6 24h34.4v34.4h-34.4zM24 161.6h34.4v34.4h-34.4zM247.6 161.6h34.4v34.4h-34.4z\" stroke=\"currentColor\" stroke-width=\"1\" stroke-dasharray=\"4 3\" fill=\"none\"/><path d=\"M58.4 58.4H247.6M58.4 161.6H247.6M58.4 58.4V161.6M247.6 58.4V161.6\" stroke=\"currentColor\" stroke-width=\"1\" stroke-opacity=\"0.5\" fill=\"none\"/><text x=\"41.2\" y=\"19\" text-anchor=\"middle\" fill=\"currentColor\" font-style=\"italic\">x</text><text x=\"20\" y=\"45.2\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">x</text><text x=\"153\" y=\"214\" text-anchor=\"middle\" fill=\"currentColor\">30 cm</text><text x=\"286\" y=\"114\" text-anchor=\"start\" fill=\"currentColor\">20 cm</text></svg>",
  "svar": {
    "facit": "Största volymen är ca \\(1\\,056\\) cm³ (när \\(x\\approx 3{,}9\\) cm)."
  },
  "ledtradar": [
    "Lådans botten blir \\((30-2x)\\) cm lång och \\((20-2x)\\) cm bred. Höjden är \\(x\\) cm.",
    "Ställ upp \\(V(x)\\) och använd <code>Extrempunkt(V)</code> i GeoGebra. Vilka \\(x\\) är möjliga?"
  ],
  "losning": "<ol><li>Volymen: \\(V(x)=x(30-2x)(20-2x)\\) cm³, där \\(0\\lt x\\lt 10\\) (bredden \\(20-2x\\) måste vara positiv).</li><li>I GeoGebra: <code>V(x)=Funktion(x(30-2x)(20-2x), 0, 10)</code> och <code>Extrempunkt(V)</code> ger maximipunkten \\((3{,}92;\\,1\\,056{,}3)\\).</li><li>(Med CAS: <code>Lös(V'(x)=0)</code> ger \\(x\\approx 3{,}92\\) och \\(x\\approx 12{,}74\\); den senare ligger utanför definitionsmängden.)</li></ol><p>Svar: Den största volymen är ungefär \\(1\\,056\\) cm³.</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt uppställd volymfunktion, t.ex. \\(V(x)=x(30-2x)(20-2x)\\)",
    "+E<sub>P</sub> för korrekt bestämd största volym, ca 1 056 cm³"
  ]
},
{
  "id": "der-028",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Extrempunkter och terrasspunkter",
  "niva": "E",
  "poang": "2/0/0",
  "typ": "redovisning",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=x^4-4x^3+10\\).</p><p>Bestäm koordinaterna för grafens samtliga stationära punkter och avgör vilken typ av punkt det är.</p>",
  "svar": {
    "facit": "Terrasspunkt \\((0,\\,10)\\) och minimipunkt \\((3,\\,-17)\\)."
  },
  "ledtradar": [
    "Använd <code>Derivata(f)</code> och <code>Lös(f'(x)=0)</code> i CAS.",
    "Rita grafen eller gör ett teckenstudium av \\(f'\\) kring varje lösning."
  ],
  "losning": "<ol><li>CAS: <code>Derivata(f)</code> ger \\(f'(x)=4x^3-12x^2=4x^2(x-3)\\).</li><li><code>Lös(f'(x)=0)</code> ger \\(x=0\\) och \\(x=3\\).</li><li>\\(f(0)=10\\) och \\(f(3)=81-108+10=-17\\).</li><li>Teckenstudium (eller grafen): \\(f'(x)\\lt 0\\) för \\(x\\lt 0\\) och för \\(0\\lt x\\lt 3\\), \\(f'(x)\\gt 0\\) för \\(x\\gt 3\\). I \\(x=0\\) byter derivatan inte tecken ⇒ terrasspunkt. I \\(x=3\\) går derivatan från \\(-\\) till \\(+\\) ⇒ minimipunkt.</li></ol><p>Svar: Terrasspunkt \\((0,\\,10)\\) och minimipunkt \\((3,\\,-17)\\).</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt bestämda koordinater för båda stationära punkterna",
    "+E<sub>B</sub> för korrekt avgjord karaktär hos båda punkterna (terrasspunkt respektive minimipunkt)"
  ]
},
{
  "id": "der-029",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Tangentens ekvation",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=2^x+x^2\\).</p><p>Tangenten till grafen i punkten där \\(x=1\\) skär \\(x\\)-axeln. Bestäm skärningspunktens \\(x\\)-koordinat med tre decimaler.</p>",
  "svar": {
    "varde": 0.114,
    "tolerans": 0.0005
  },
  "ledtradar": [
    "Använd <code>Tangent(1, f)</code> i GeoGebra för att få tangentens ekvation.",
    "Bestäm sedan var tangenten skär \\(x\\)-axeln med <code>Nollställe(t)</code>, där \\(t\\) är tangenten."
  ],
  "losning": "<ol><li><code>f(x)=2^x+x^2</code></li><li><code>t=Tangent(1, f)</code> ger \\(y\\approx 3{,}386x-0{,}386\\). (För hand: \\(f(1)=3\\), \\(f'(x)=2^x\\ln 2+2x\\), \\(f'(1)=2\\ln 2+2\\approx 3{,}386\\).)</li><li><code>Nollställe(t)</code> eller \\(0=3+3{,}386(x-1)\\) ger \\(x=1-\\dfrac{3}{2\\ln 2+2}\\approx 0{,}114\\).</li></ol><p>Svar: \\(x\\approx 0{,}114\\)</p>"
},
{
  "id": "der-030",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Förändringshastighet",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Antalet invånare \\(N\\) i en kommun \\(t\\) år efter 2020 beskrivs med modellen</p><p>\\[N(t)=12\\,000\\cdot 1{,}035^{t}\\]</p><p>Enligt modellen: vilket år kommer befolkningen att öka med 800 invånare per år?</p>",
  "svar": {
    "varde": 2039,
    "tolerans": 0
  },
  "ledtradar": [
    "Befolkningens ökningstakt är \\(N'(t)\\). Ställ upp ekvationen \\(N'(t)=800\\).",
    "I CAS: <code>NLös(N'(t)=800)</code>. Lägg sedan till 2020."
  ],
  "losning": "<ol><li>\\(N'(t)=12\\,000\\cdot 1{,}035^t\\cdot\\ln 1{,}035\\) (invånare per år).</li><li>CAS: <code>NLös(N'(t)=800)</code> ger \\(t\\approx 19{,}2\\).</li><li>(För hand: \\(1{,}035^t=\\dfrac{800}{12\\,000\\ln 1{,}035}\\approx 1{,}938\\), så \\(t=\\dfrac{\\ln 1{,}938}{\\ln 1{,}035}\\approx 19{,}2\\).)</li><li>\\(t\\approx 19{,}2\\) motsvarar år \\(2020+19{,}2\\), dvs. under år 2039.</li></ol><p>Svar: År 2039</p>"
},
{
  "id": "der-031",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Optimering",
  "niva": "C",
  "poang": "1/1/0",
  "typ": "redovisning",
  "fraga": "<p>Ett företag tillverkar \\(x\\) enheter av en produkt per dag. Den totala kostnaden \\(K\\) kr per dag beskrivs av</p><p>\\[K(x)=0{,}01x^3-1{,}2x^2+80x+2\\,000,\\quad 0\\le x\\le 150\\]</p><p>Varje enhet säljs för 95 kr. Hur många enheter ska tillverkas per dag för att vinsten ska bli så stor som möjligt, och hur stor blir vinsten då?</p>",
  "svar": {
    "facit": "86 enheter per dag, vinsten blir ca 1 805 kr per dag."
  },
  "ledtradar": [
    "Vinst = intäkt − kostnad, dvs. \\(V(x)=95x-K(x)\\).",
    "Använd <code>Extrempunkt(V)</code> eller lös \\(V'(x)=0\\). Antalet enheter måste vara ett heltal – jämför närliggande heltal."
  ],
  "losning": "<ol><li>Vinstfunktion: \\(V(x)=95x-(0{,}01x^3-1{,}2x^2+80x+2\\,000)=-0{,}01x^3+1{,}2x^2+15x-2\\,000\\).</li><li>CAS: <code>Lös(V'(x)=0)</code> ger \\(x\\approx 85{,}8\\) (den negativa lösningen förkastas). <code>Extrempunkt(V)</code> visar att det är ett maximum.</li><li>Eftersom \\(x\\) är ett heltal jämförs \\(V(85)=1\\,803{,}75\\) och \\(V(86)=1\\,804{,}64\\).</li></ol><p>Svar: 86 enheter per dag ger störst vinst, ca 1 805 kr per dag.</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt uppställd vinstfunktion",
    "+C<sub>PL</sub> för korrekt antal enheter (86) med motsvarande vinst (ca 1 805 kr)"
  ]
},
{
  "id": "der-032",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Optimering",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>En konservburk ska ha formen av en cylinder med volymen 750 cm³. Materialet till botten och lock kostar 0,03 kr/cm² och materialet till mantelytan kostar 0,02 kr/cm².</p><p>Bestäm den radie som ger lägst materialkostnad. Svara i cm med en decimal.</p>",
  "svar": {
    "varde": 4.3,
    "tolerans": 0.05,
    "enhet": "cm"
  },
  "ledtradar": [
    "Volymen ger \\(\\pi r^2h=750\\), dvs. \\(h=\\dfrac{750}{\\pi r^2}\\).",
    "Kostnaden: \\(K=0{,}03\\cdot 2\\pi r^2+0{,}02\\cdot 2\\pi rh\\). Sätt in \\(h\\) och använd <code>Extrempunkt(K)</code>."
  ],
  "losning": "<ol><li>\\(h=\\dfrac{750}{\\pi r^2}\\).</li><li>\\(K(r)=0{,}06\\pi r^2+0{,}04\\pi r\\cdot\\dfrac{750}{\\pi r^2}=0{,}06\\pi r^2+\\dfrac{30}{r}\\).</li><li>GeoGebra: <code>K(x)=Funktion(0.06π x^2+30/x, 0, 20)</code> och <code>Extrempunkt(K)</code> ger \\((4{,}30;\\,10{,}46)\\). (CAS: <code>Lös(K'(r)=0)</code> ger \\(r=\\sqrt[3]{\\tfrac{250}{\\pi}}\\approx 4{,}30\\).)</li></ol><p>Svar: \\(r\\approx 4{,}3\\) cm</p>"
},
{
  "id": "der-033",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Förändringshastighet",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>Vid ett skyfall stiger vattennivån i en å. Nivån \\(h\\) cm över det normala, \\(t\\) timmar efter att regnet började, beskrivs av</p><p>\\[h(t)=-0{,}1t^3+0{,}9t^2+2,\\quad 0\\le t\\le 8\\]</p><p>Bestäm den största hastighet med vilken vattennivån stiger.</p>",
  "svar": {
    "varde": 2.7,
    "tolerans": 0.01,
    "enhet": "cm/h"
  },
  "ledtradar": [
    "Stigningshastigheten är \\(h'(t)\\). Du ska alltså hitta det största värdet av \\(h'(t)\\).",
    "Rita \\(h'\\) med <code>Derivata(h)</code> och använd <code>Extrempunkt</code> på derivatan, eller lös \\(h''(t)=0\\)."
  ],
  "losning": "<ol><li>\\(h'(t)=-0{,}3t^2+1{,}8t\\) (cm/h).</li><li>Största värdet av \\(h'\\): <code>Extrempunkt(Derivata(h))</code> ger \\((3;\\,2{,}7)\\). (För hand: \\(h''(t)=-0{,}6t+1{,}8=0\\iff t=3\\), och \\(h'\\) är en parabel med negativ \\(t^2\\)-koefficient, så det är ett maximum.)</li><li>\\(h'(3)=-2{,}7+5{,}4=2{,}7\\).</li></ol><p>Svar: Som snabbast stiger vattennivån med 2,7 cm/h (efter 3 timmar).</p>"
},
{
  "id": "der-034",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Optimering",
  "niva": "A",
  "poang": "1/1/1",
  "typ": "redovisning",
  "fraga": "<p>Ett fönster har formen av en rektangel med en halvcirkel ovanpå. Halvcirkelns diameter är lika med rektangelns bredd. Fönstrets omkrets (hela ramen runt om) ska vara 6,0 m.</p><p>Bestäm fönstrets bredd och rektangelns höjd så att fönstret släpper in så mycket ljus som möjligt, dvs. så att arean blir så stor som möjligt.</p>",
  "svar": {
    "facit": "Bredd ca 1,68 m och rektangelns höjd ca 0,84 m (arean blir ca 2,52 m²)."
  },
  "ledtradar": [
    "Låt halvcirkelns radie vara \\(r\\) och rektangelns höjd \\(h\\). Omkretsen är \\(2r+2h+\\pi r\\) (halva cirkelns omkrets är \\(\\pi r\\)).",
    "Lös ut \\(h\\) ur omkretsvillkoret och uttryck arean \\(A=2rh+\\tfrac{\\pi r^2}{2}\\) som en funktion av \\(r\\)."
  ],
  "losning": "<ol><li>Beteckningar: radie \\(r\\) m, rektangelns höjd \\(h\\) m. Bredden är \\(2r\\).</li><li>Omkrets: \\(2r+2h+\\pi r=6\\iff h=\\dfrac{6-2r-\\pi r}{2}\\).</li><li>Area: \\(A(r)=2rh+\\dfrac{\\pi r^2}{2}=r(6-2r-\\pi r)+\\dfrac{\\pi r^2}{2}=6r-2r^2-\\dfrac{\\pi r^2}{2}\\).</li><li>Definitionsmängd: \\(h\\gt 0\\) ger \\(0\\lt r\\lt \\dfrac{6}{2+\\pi}\\approx 1{,}17\\).</li><li>CAS: <code>Lös(A'(r)=0)</code> ger \\(r=\\dfrac{6}{4+\\pi}\\approx 0{,}840\\). \\(A''(r)=-4-\\pi\\lt 0\\), alltså maximum.</li><li>Bredd \\(2r\\approx 1{,}68\\) m och \\(h=\\dfrac{6-(2+\\pi)\\cdot 0{,}840}{2}\\approx 0{,}84\\) m. Arean blir \\(A\\approx 2{,}52\\) m².</li></ol><p>Svar: Bredden ca 1,68 m och rektangelns höjd ca 0,84 m.</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt uttryck för \\(h\\) (eller motsvarande) utifrån omkretsen",
    "+C<sub>M</sub> för korrekt areafunktion i en variabel",
    "+A<sub>PL</sub> för korrekt bredd och höjd med motivering att det är ett maximum"
  ]
},
{
  "id": "der-035",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "B",
  "omrade": "Derivata",
  "moment": "Tangentens ekvation",
  "niva": "A",
  "poang": "0/0/1",
  "typ": "tal",
  "fraga": "<p>Linjen \\(y=3x\\) är tangent till kurvan \\(y=e^{kx}\\), där \\(k\\gt 0\\) är en konstant.</p><p>Bestäm \\(k\\) med två decimaler.</p>",
  "svar": {
    "varde": 1.1,
    "tolerans": 0.005
  },
  "ledtradar": [
    "I tangeringspunkten \\(x=a\\) ska kurvan och linjen ha samma \\(y\\)-värde <em>och</em> samma lutning.",
    "Ekvationssystemet \\(e^{ka}=3a\\) och \\(ke^{ka}=3\\) kan lösas i CAS med <code>NLös({e^(k a)=3a, k e^(k a)=3}, {k, a})</code>."
  ],
  "losning": "<p>Låt tangeringspunkten ha \\(x\\)-koordinaten \\(a\\). Villkor:</p><ol><li>Samma \\(y\\)-värde: \\(e^{ka}=3a\\)</li><li>Samma lutning: \\(ke^{ka}=3\\)</li></ol><p>CAS: <code>NLös({e^(k a)=3a, k e^(k a)=3}, {k, a})</code> ger \\(k\\approx 1{,}10\\), \\(a\\approx 0{,}91\\).</p><p>(Exakt: sätt in (1) i (2): \\(k\\cdot 3a=3\\iff ka=1\\). Då ger (1) \\(e=3a\\), dvs. \\(a=\\tfrac{e}{3}\\) och \\(k=\\tfrac{3}{e}\\approx 1{,}10\\).)</p><p>Svar: \\(k\\approx 1{,}10\\)</p>"
},
{
  "id": "der-036",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Ändringskvot",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>En bil accelererar från stillastående. Sträckan \\(s\\) meter som bilen har kört efter \\(t\\) sekunder beskrivs av</p><p>\\[s(t)=2t^2+3t,\\quad 0\\le t\\le 8\\]</p><p>Bestäm bilens medelhastighet mellan \\(t=2\\) och \\(t=5\\).</p>",
  "svar": {
    "varde": 17,
    "tolerans": 0,
    "enhet": "m/s"
  },
  "ledtradar": [
    "Medelhastigheten är ändringskvoten \\(\\dfrac{\\Delta s}{\\Delta t}\\).",
    "Beräkna \\(s(5)\\) och \\(s(2)\\)."
  ],
  "losning": "<p>\\(s(5)=2\\cdot 25+15=65\\) och \\(s(2)=8+6=14\\).</p><p>\\[\\frac{\\Delta s}{\\Delta t}=\\frac{65-14}{5-2}=\\frac{51}{3}=17\\]</p><p>Svar: Medelhastigheten är 17 m/s.</p>"
},
{
  "id": "der-037",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Förändringshastighet",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Samma bil som i föregående uppgift: sträckan \\(s\\) meter efter \\(t\\) sekunder är \\(s(t)=2t^2+3t\\).</p><p>Bestäm bilens momentana hastighet efter 4 sekunder.</p>",
  "svar": {
    "varde": 19,
    "tolerans": 0,
    "enhet": "m/s"
  },
  "ledtradar": [
    "Den momentana hastigheten är derivatan \\(s'(t)\\).",
    "\\(s'(t)=4t+3\\)."
  ],
  "losning": "<p>Hastigheten är \\(s'(t)=4t+3\\) m/s.</p><p>\\[s'(4)=16+3=19\\]</p><p>Svar: 19 m/s</p>"
},
{
  "id": "der-038",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Grafisk derivering",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Grafen visar temperaturen \\(T\\) °C utomhus en vårdag, \\(t\\) timmar efter klockan 06.00. I figuren är även tangenten till grafen i punkten där \\(t=4\\) inritad.</p><p>Med hur många grader per timme ökade temperaturen klockan 10.00?</p>",
  "figur": "<svg viewBox=\"0 0 340 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Temperaturen T som funktion av tiden t med tangent i t = 4\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M34 242V22M62 242V22M90 242V22M118 242V22M146 242V22M174 242V22M202 242V22M230 242V22M258 242V22M286 242V22M314 242V22M34 242H314M34 220H314M34 198H314M34 176H314M34 154H314M34 132H314M34 110H314M34 88H314M34 66H314M34 44H314M34 22H314\" stroke=\"currentColor\" stroke-opacity=\"0.2\" stroke-width=\"0.7\" fill=\"none\"/><path d=\"M28 242H326M34 248V10\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M320 238.5L326 242L320 245.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><path d=\"M30.5 16L34 10L37.5 16\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"326\" y=\"235\" fill=\"currentColor\" font-style=\"italic\" text-anchor=\"end\">t (h)</text><text x=\"41\" y=\"20\" fill=\"currentColor\" font-style=\"italic\">T (°C)</text><text x=\"62\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">1</text><text x=\"90\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">2</text><text x=\"118\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">3</text><text x=\"146\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">4</text><text x=\"174\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">5</text><text x=\"202\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">6</text><text x=\"230\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">7</text><text x=\"258\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">8</text><text x=\"286\" y=\"256\" text-anchor=\"middle\" fill=\"currentColor\">9</text><text x=\"30\" y=\"202.5\" text-anchor=\"end\" fill=\"currentColor\">4</text><text x=\"30\" y=\"158.5\" text-anchor=\"end\" fill=\"currentColor\">8</text><text x=\"30\" y=\"114.5\" text-anchor=\"end\" fill=\"currentColor\">12</text><text x=\"30\" y=\"70.5\" text-anchor=\"end\" fill=\"currentColor\">16</text><text x=\"30\" y=\"256\" text-anchor=\"end\" fill=\"currentColor\">0</text><path d=\"M34 220L34.7 219L35.4 218.1L36.1 217.1L36.8 216.2L37.5 215.2L38.2 214.3L38.9 213.3L39.6 212.4L40.3 211.5L41 210.5L41.7 209.6L42.4 208.7L43.1 207.8L43.8 206.9L44.5 205.9L45.2 205L45.9 204.1L46.6 203.2L47.3 202.3L48 201.4L48.7 200.5L49.4 199.7L50.1 198.8L50.8 197.9L51.5 197L52.2 196.1L52.9 195.3L53.6 194.4L54.3 193.5L55 192.7L55.7 191.8L56.4 191L57.1 190.1L57.8 189.3L58.5 188.4L59.2 187.6L59.9 186.7L60.6 185.9L61.3 185.1L62 184.2L62.7 183.4L63.4 182.6L64.1 181.8L64.8 181L65.5 180.2L66.2 179.4L66.9 178.6L67.6 177.8L68.3 177L69 176.2L69.7 175.4L70.4 174.6L71.1 173.8L71.8 173L72.5 172.3L73.2 171.5L73.9 170.7L74.6 170L75.3 169.2L76 168.4L76.7 167.7L77.4 166.9L78.1 166.2L78.8 165.4L79.5 164.7L80.2 164L80.9 163.2L81.6 162.5L82.3 161.8L83 161L83.7 160.3L84.4 159.6L85.1 158.9L85.8 158.2L86.5 157.5L87.2 156.8L87.9 156.1L88.6 155.4L89.3 154.7L90 154L90.7 153.3L91.4 152.6L92.1 152L92.8 151.3L93.5 150.6L94.2 149.9L94.9 149.3L95.6 148.6L96.3 148L97 147.3L97.7 146.6L98.4 146L99.1 145.4L99.8 144.7L100.5 144.1L101.2 143.4L101.9 142.8L102.6 142.2L103.3 141.6L104 140.9L104.7 140.3L105.4 139.7L106.1 139.1L106.8 138.5L107.5 137.9L108.2 137.3L108.9 136.7L109.6 136.1L110.3 135.5L111 134.9L111.7 134.3L112.4 133.8L113.1 133.2L113.8 132.6L114.5 132L115.2 131.5L115.9 130.9L116.6 130.4L117.3 129.8L118 129.2L118.7 128.7L119.4 128.2L120.1 127.6L120.8 127.1L121.5 126.5L122.2 126L122.9 125.5L123.6 125L124.3 124.4L125 123.9L125.7 123.4L126.4 122.9L127.1 122.4L127.8 121.9L128.5 121.4L129.2 120.9L129.9 120.4L130.6 119.9L131.3 119.4L132 118.9L132.7 118.5L133.4 118L134.1 117.5L134.8 117L135.5 116.6L136.2 116.1L136.9 115.7L137.6 115.2L138.3 114.7L139 114.3L139.7 113.9L140.4 113.4L141.1 113L141.8 112.5L142.5 112.1L143.2 111.7L143.9 111.3L144.6 110.8L145.3 110.4L146 110L146.7 109.6L147.4 109.2L148.1 108.8L148.8 108.4L149.5 108L150.2 107.6L150.9 107.2L151.6 106.8L152.3 106.4L153 106L153.7 105.7L154.4 105.3L155.1 104.9L155.8 104.6L156.5 104.2L157.2 103.8L157.9 103.5L158.6 103.1L159.3 102.8L160 102.4L160.7 102.1L161.4 101.8L162.1 101.4L162.8 101.1L163.5 100.8L164.2 100.4L164.9 100.1L165.6 99.8L166.3 99.5L167 99.2L167.7 98.9L168.4 98.6L169.1 98.3L169.8 98L170.5 97.7L171.2 97.4L171.9 97.1L172.6 96.8L173.3 96.5L174 96.2L174.7 96L175.4 95.7L176.1 95.4L176.8 95.2L177.5 94.9L178.2 94.7L178.9 94.4L179.6 94.2L180.3 93.9L181 93.7L181.7 93.4L182.4 93.2L183.1 93L183.8 92.7L184.5 92.5L185.2 92.3L185.9 92.1L186.6 91.9L187.3 91.6L188 91.4L188.7 91.2L189.4 91L190.1 90.8L190.8 90.6L191.5 90.4L192.2 90.3L192.9 90.1L193.6 89.9L194.3 89.7L195 89.5L195.7 89.4L196.4 89.2L197.1 89L197.8 88.9L198.5 88.7L199.2 88.6L199.9 88.4L200.6 88.3L201.3 88.1L202 88L202.7 87.9L203.4 87.7L204.1 87.6L204.8 87.5L205.5 87.4L206.2 87.2L206.9 87.1L207.6 87L208.3 86.9L209 86.8L209.7 86.7L210.4 86.6L211.1 86.5L211.8 86.4L212.5 86.3L213.2 86.2L213.9 86.2L214.6 86.1L215.3 86L216 85.9L216.7 85.9L217.4 85.8L218.1 85.7L218.8 85.7L219.5 85.6L220.2 85.6L220.9 85.5L221.6 85.5L222.3 85.5L223 85.4L223.7 85.4L224.4 85.4L225.1 85.3L225.8 85.3L226.5 85.3L227.2 85.3L227.9 85.3L228.6 85.3L229.3 85.3L230 85.2L230.7 85.3L231.4 85.3L232.1 85.3L232.8 85.3L233.5 85.3L234.2 85.3L234.9 85.3L235.6 85.4L236.3 85.4L237 85.4L237.7 85.5L238.4 85.5L239.1 85.5L239.8 85.6L240.5 85.6L241.2 85.7L241.9 85.7L242.6 85.8L243.3 85.9L244 85.9L244.7 86L245.4 86.1L246.1 86.2L246.8 86.2L247.5 86.3L248.2 86.4L248.9 86.5L249.6 86.6L250.3 86.7L251 86.8L251.7 86.9L252.4 87L253.1 87.1L253.8 87.2L254.5 87.4L255.2 87.5L255.9 87.6L256.6 87.7L257.3 87.9L258 88L258.7 88.1L259.4 88.3L260.1 88.4L260.8 88.6L261.5 88.7L262.2 88.9L262.9 89L263.6 89.2L264.3 89.4L265 89.5L265.7 89.7L266.4 89.9L267.1 90.1L267.8 90.3L268.5 90.4L269.2 90.6L269.9 90.8L270.6 91L271.3 91.2L272 91.4L272.7 91.6L273.4 91.9L274.1 92.1L274.8 92.3L275.5 92.5L276.2 92.7L276.9 93L277.6 93.2L278.3 93.4L279 93.7L279.7 93.9L280.4 94.2L281.1 94.4L281.8 94.7L282.5 94.9L283.2 95.2L283.9 95.4L284.6 95.7L285.3 96L286 96.2L286.7 96.5L287.4 96.8L288.1 97.1L288.8 97.4L289.5 97.7L290.2 98L290.9 98.3L291.6 98.6L292.3 98.9L293 99.2L293.7 99.5L294.4 99.8L295.1 100.1L295.8 100.4L296.5 100.8L297.2 101.1L297.9 101.4L298.6 101.8L299.3 102.1L300 102.4L300.7 102.8L301.4 103.1L302.1 103.5L302.8 103.8L303.5 104.2L304.2 104.6L304.9 104.9L305.6 105.3L306.3 105.7L307 106L307.7 106.4L308.4 106.8L309.1 107.2L309.8 107.6L310.5 108L311.2 108.4L311.9 108.8L312.6 109.2L313.3 109.6L314 110\" stroke=\"currentColor\" stroke-width=\"2.2\" fill=\"none\" stroke-linejoin=\"round\"/><path d=\"M34 176L35.3 175.2L36.6 174.5L37.9 173.7L39.2 172.9L40.5 172.2L41.8 171.4L43.1 170.6L44.4 169.9L45.7 169.1L47 168.3L48.3 167.6L49.6 166.8L50.9 166L52.2 165.3L53.5 164.5L54.8 163.7L56.1 163L57.4 162.2L58.7 161.4L60 160.7L61.3 159.9L62.6 159.1L63.9 158.4L65.2 157.6L66.6 156.8L67.9 156.1L69.2 155.3L70.5 154.5L71.8 153.7L73.1 153L74.4 152.2L75.7 151.4L77 150.7L78.3 149.9L79.6 149.1L80.9 148.4L82.2 147.6L83.5 146.8L84.8 146.1L86.1 145.3L87.4 144.5L88.7 143.8L90 143L91.3 142.2L92.6 141.5L93.9 140.7L95.2 139.9L96.5 139.2L97.8 138.4L99.1 137.6L100.4 136.9L101.7 136.1L103 135.3L104.3 134.6L105.6 133.8L106.9 133L108.2 132.3L109.5 131.5L110.8 130.7L112.1 130L113.4 129.2L114.7 128.4L116 127.7L117.3 126.9L118.6 126.1L119.9 125.4L121.2 124.6L122.5 123.8L123.8 123.1L125.1 122.3L126.4 121.5L127.7 120.8L129 120L130.3 119.2L131.6 118.5L133 117.7L134.3 116.9L135.6 116.2L136.9 115.4L138.2 114.6L139.5 113.9L140.8 113.1L142.1 112.3L143.4 111.6L144.7 110.8L146 110L147.3 109.2L148.6 108.5L149.9 107.7L151.2 106.9L152.5 106.2L153.8 105.4L155.1 104.6L156.4 103.9L157.7 103.1L159 102.3L160.3 101.6L161.6 100.8L162.9 100L164.2 99.3L165.5 98.5L166.8 97.7L168.1 97L169.4 96.2L170.7 95.4L172 94.7L173.3 93.9L174.6 93.1L175.9 92.4L177.2 91.6L178.5 90.8L179.8 90.1L181.1 89.3L182.4 88.5L183.7 87.8L185 87L186.3 86.2L187.6 85.5L188.9 84.7L190.2 83.9L191.5 83.2L192.8 82.4L194.1 81.6L195.4 80.9L196.8 80.1L198.1 79.3L199.4 78.6L200.7 77.8L202 77L203.3 76.3L204.6 75.5L205.9 74.7L207.2 74L208.5 73.2L209.8 72.4L211.1 71.7L212.4 70.9L213.7 70.1L215 69.4L216.3 68.6L217.6 67.8L218.9 67.1L220.2 66.3L221.5 65.5L222.8 64.7L224.1 64L225.4 63.2L226.7 62.4L228 61.7L229.3 60.9L230.6 60.1L231.9 59.4L233.2 58.6L234.5 57.8L235.8 57.1L237.1 56.3L238.4 55.5L239.7 54.8L241 54L242.3 53.2L243.6 52.5L244.9 51.7L246.2 50.9L247.5 50.2L248.8 49.4L250.1 48.6L251.4 47.9L252.7 47.1L254 46.3L255.3 45.6L256.6 44.8L257.9 44L259.2 43.3L260.5 42.5L261.9 41.7L263.2 41L264.5 40.2L265.8 39.4L267.1 38.7L268.4 37.9L269.7 37.1L271 36.4L272.3 35.6L273.6 34.8L274.9 34.1L276.2 33.3L277.5 32.5L278.8 31.8L280.1 31L281.4 30.2L282.7 29.5L284 28.7L285.3 27.9L286.6 27.2L287.9 26.4L289.2 25.6L290.5 24.9L291.8 24.1L293.1 23.3L294.4 22.5\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\" stroke-linejoin=\"round\"/><circle cx=\"146\" cy=\"110\" r=\"3.2\" fill=\"currentColor\"/><text x=\"302.8\" y=\"137.5\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">T(t)</text></svg>",
  "svar": {
    "varde": 1.5,
    "tolerans": 0.1,
    "enhet": "°C/h"
  },
  "ledtradar": [
    "Klockan 10.00 motsvarar \\(t=4\\). Ökningstakten är \\(T'(4)\\) = tangentens lutning.",
    "Läs av två punkter på tangenten långt ifrån varandra, t.ex. där \\(t=0\\) och \\(t=8\\). Observera att en ruta i \\(T\\)-led är 2 °C."
  ],
  "losning": "<p>Klockan 10.00 är \\(t=4\\). Tangenten går genom \\((0,\\,6)\\) och \\((8,\\,18)\\):</p><p>\\[T'(4)\\approx\\frac{18-6}{8-0}=\\frac{12}{8}=1{,}5\\]</p><p>Svar: Temperaturen ökade med ca 1,5 °C per timme.</p>"
},
{
  "id": "der-039",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Förändringshastighet",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>Värdet \\(V\\) kr av en begagnad mobiltelefon \\(t\\) år efter inköpet beskrivs med modellen</p><p>\\[V(t)=1\\,500\\cdot 0{,}92^{t}\\]</p><p>Beräkna \\(V'(2)\\) och avrunda till heltal.</p>",
  "svar": {
    "varde": -106,
    "tolerans": 0.5,
    "enhet": "kr/år"
  },
  "ledtradar": [
    "Använd regeln \\(D(a^x)=a^x\\ln a\\).",
    "\\(V'(t)=1\\,500\\cdot 0{,}92^t\\cdot\\ln 0{,}92\\). Glöm inte att svaret ska bli negativt – värdet minskar."
  ],
  "losning": "<p>\\(V'(t)=1\\,500\\cdot 0{,}92^t\\cdot\\ln 0{,}92\\)</p><p>\\[V'(2)=1\\,500\\cdot 0{,}8464\\cdot\\ln 0{,}92\\approx 1\\,269{,}6\\cdot(-0{,}0834)\\approx -106\\]</p><p>Tolkning: två år efter inköpet minskar telefonens värde med ca 106 kr per år.</p><p>Svar: \\(V'(2)\\approx -106\\) kr/år</p>"
},
{
  "id": "der-040",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Extremvärden i tillämpningar",
  "niva": "E",
  "poang": "1/0/0",
  "typ": "tal",
  "fraga": "<p>En boll kastas rakt upp. Bollens höjd \\(y\\) meter över marken efter \\(t\\) sekunder ges av</p><p>\\[y(t)=1{,}5+12t-4{,}9t^2\\]</p><p>Bestäm bollens största höjd. Svara med två decimaler.</p>",
  "svar": {
    "varde": 8.85,
    "tolerans": 0.005,
    "enhet": "m"
  },
  "ledtradar": [
    "I högsta punkten är hastigheten noll, dvs. \\(y'(t)=0\\).",
    "\\(y'(t)=12-9{,}8t\\)."
  ],
  "losning": "<p>\\(y'(t)=12-9{,}8t=0\\iff t=\\dfrac{12}{9{,}8}\\approx 1{,}224\\) s. Andragradsfunktionen har negativ \\(t^2\\)-koefficient, så det är ett maximum.</p><p>\\[y(1{,}224)=1{,}5+12\\cdot 1{,}224-4{,}9\\cdot 1{,}224^2\\approx 8{,}85\\]</p><p>Svar: ca 8,85 m</p>"
},
{
  "id": "der-041",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Teckenstudium",
  "niva": "E",
  "poang": "2/0/0",
  "typ": "redovisning",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=x^3-3x^2-9x+5\\).</p><p>Bestäm koordinaterna för grafens extrempunkter och avgör med hjälp av ett teckenstudium om de är maximi- eller minimipunkter.</p>",
  "svar": {
    "facit": "Maximipunkt \\((-1,\\,10)\\) och minimipunkt \\((3,\\,-22)\\)."
  },
  "ledtradar": [
    "\\(f'(x)=3x^2-6x-9\\). Sätt \\(f'(x)=0\\) och dela med 3.",
    "Gör en teckentabell för \\(f'(x)\\) med de två nollställena. Testa t.ex. \\(x=-2\\), \\(x=0\\) och \\(x=4\\)."
  ],
  "losning": "<ol><li>\\(f'(x)=3x^2-6x-9=3(x^2-2x-3)\\).</li><li>\\(f'(x)=0\\iff x^2-2x-3=0\\iff x=1\\pm\\sqrt{1+3}=1\\pm 2\\), dvs. \\(x=-1\\) eller \\(x=3\\).</li><li>Teckenstudium: \\(f'(-2)=15\\gt 0\\), \\(f'(0)=-9\\lt 0\\), \\(f'(4)=15\\gt 0\\).<p>\\[\\begin{array}{c|ccccc} x & & -1 & & 3 & \\\\ \\hline f'(x) & + & 0 & - & 0 & + \\\\ f(x) & \\nearrow & \\text{max} & \\searrow & \\text{min} & \\nearrow \\end{array}\\]</p></li><li>\\(f(-1)=-1-3+9+5=10\\) och \\(f(3)=27-27-27+5=-22\\).</li></ol><p>Svar: Maximipunkt \\((-1,\\,10)\\) och minimipunkt \\((3,\\,-22)\\).</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt bestämda \\(x\\)-koordinater och \\(y\\)-koordinater för extrempunkterna",
    "+E<sub>R</sub> för korrekt genomfört teckenstudium med slutsats om punkternas karaktär"
  ]
},
{
  "id": "der-042",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Tangent och normal",
  "niva": "E",
  "poang": "2/0/0",
  "typ": "redovisning",
  "fraga": "<p>Kurvan \\(y=2x^2-x\\) har en tangent och en normal i punkten där \\(x=1\\).</p><p>Bestäm ekvationerna för tangenten och normalen. Svara på formen \\(y=kx+m\\).</p>",
  "svar": {
    "facit": "Tangent: \\(y=3x-2\\). Normal: \\(y=-\\tfrac13x+\\tfrac43\\)."
  },
  "ledtradar": [
    "Punkten: \\(y(1)=1\\). Tangentens lutning: \\(y'(1)\\).",
    "Normalen är vinkelrät mot tangenten: \\(k_t\\cdot k_n=-1\\)."
  ],
  "losning": "<ol><li>Punkt: \\(y(1)=2-1=1\\), alltså \\((1,\\,1)\\).</li><li>\\(y'=4x-1\\) ger \\(k_t=y'(1)=3\\).</li><li>Tangent: \\(y-1=3(x-1)\\iff y=3x-2\\).</li><li>Normal: \\(k_n=-\\tfrac13\\). \\(y-1=-\\tfrac13(x-1)\\iff y=-\\tfrac13x+\\tfrac43\\).</li></ol><p>Svar: Tangenten \\(y=3x-2\\) och normalen \\(y=-\\tfrac13x+\\tfrac43\\).</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt tangentekvation \\(y=3x-2\\)",
    "+E<sub>P</sub> för korrekt normalekvation \\(y=-\\tfrac13x+\\tfrac43\\)"
  ]
},
{
  "id": "der-043",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Derivatans definition",
  "niva": "C",
  "poang": "1/1/0",
  "typ": "redovisning",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=x^2-2x\\).</p><p>Bestäm \\(f'(3)\\) med hjälp av derivatans definition.</p>",
  "svar": {
    "facit": "\\(f'(3)=\\lim\\limits_{h\\to 0}(4+h)=4\\)"
  },
  "ledtradar": [
    "Derivatans definition: \\(f'(3)=\\lim\\limits_{h\\to 0}\\dfrac{f(3+h)-f(3)}{h}\\).",
    "Beräkna \\(f(3+h)=(3+h)^2-2(3+h)\\), förenkla täljaren och förkorta med \\(h\\) innan du låter \\(h\\to 0\\)."
  ],
  "losning": "<ol><li>\\(f(3)=9-6=3\\).</li><li>\\(f(3+h)=(3+h)^2-2(3+h)=9+6h+h^2-6-2h=3+4h+h^2\\).</li><li>\\[\\frac{f(3+h)-f(3)}{h}=\\frac{4h+h^2}{h}=4+h,\\quad h\\neq 0\\]</li><li>\\[f'(3)=\\lim_{h\\to 0}(4+h)=4\\]</li></ol><p>Svar: \\(f'(3)=4\\)</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt insättning i derivatans definition, t.ex. \\(\\frac{(3+h)^2-2(3+h)-3}{h}\\)",
    "+C<sub>P</sub> för korrekt förenkling och gränsövergång med korrekt svar \\(f'(3)=4\\)"
  ]
},
{
  "id": "der-044",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Största och minsta värde",
  "niva": "C",
  "poang": "1/1/0",
  "typ": "redovisning",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=x^3-6x^2+9x+2\\).</p><p>Bestäm funktionens största och minsta värde i intervallet \\(0\\le x\\le 5\\).</p>",
  "svar": {
    "facit": "Största värde 22 (för \\(x=5\\)), minsta värde 2 (för \\(x=0\\) och \\(x=3\\))."
  },
  "ledtradar": [
    "Bestäm först de stationära punkterna genom att lösa \\(f'(x)=0\\).",
    "Största och minsta värde kan antas i stationära punkter <em>eller</em> i intervallets ändpunkter. Jämför alla dessa funktionsvärden."
  ],
  "losning": "<ol><li>\\(f'(x)=3x^2-12x+9=3(x^2-4x+3)=3(x-1)(x-3)\\), så \\(f'(x)=0\\) för \\(x=1\\) och \\(x=3\\). Båda ligger i intervallet.</li><li>Funktionsvärden:<ul><li>\\(f(0)=2\\)</li><li>\\(f(1)=1-6+9+2=6\\)</li><li>\\(f(3)=27-54+27+2=2\\)</li><li>\\(f(5)=125-150+45+2=22\\)</li></ul></li><li>Jämförelse ger största värdet 22 och minsta värdet 2.</li></ol><p>Svar: Största värde 22, minsta värde 2.</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt bestämda stationära punkter med funktionsvärden",
    "+C<sub>P</sub> för korrekt största och minsta värde där även ändpunkterna har undersökts"
  ]
},
{
  "id": "der-045",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Optimering",
  "niva": "C",
  "poang": "1/2/0",
  "typ": "redovisning",
  "fraga": "<p>En bonde har 120 m stängsel. Hon vill hägna in två lika stora rektangulära hagar som ligger bredvid varandra längs en mur. Muren behöver inget stängsel, se figur.</p><p>Bestäm den största sammanlagda area de två hagarna kan få.</p>",
  "figur": "<svg viewBox=\"0 0 340 175\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Två hagar längs en mur\" style=\"max-width:340px;width:100%\" font-family=\"sans-serif\" font-size=\"13\"><path d=\"M20 40H320\" stroke=\"currentColor\" stroke-width=\"3\" fill=\"none\"/><path d=\"M30 38l-8 -10M44 38l-8 -10M58 38l-8 -10M72 38l-8 -10M86 38l-8 -10M100 38l-8 -10M114 38l-8 -10M128 38l-8 -10M142 38l-8 -10M156 38l-8 -10M170 38l-8 -10M184 38l-8 -10M198 38l-8 -10M212 38l-8 -10M226 38l-8 -10M240 38l-8 -10M254 38l-8 -10M268 38l-8 -10M282 38l-8 -10M296 38l-8 -10M310 38l-8 -10\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/><text x=\"170\" y=\"20\" text-anchor=\"middle\" fill=\"currentColor\">mur</text><path d=\"M40 40V140H300V40M170.0 40V140\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><text x=\"34\" y=\"95\" text-anchor=\"end\" fill=\"currentColor\" font-style=\"italic\">x</text><text x=\"306\" y=\"95\" text-anchor=\"start\" fill=\"currentColor\" font-style=\"italic\">x</text><text x=\"176.0\" y=\"95\" text-anchor=\"start\" fill=\"currentColor\" font-style=\"italic\">x</text><text x=\"170\" y=\"162\" text-anchor=\"middle\" fill=\"currentColor\">stängsel</text></svg>",
  "svar": {
    "facit": "1 200 m² (när \\(x=20\\) m och sidan längs muren är 60 m)."
  },
  "ledtradar": [
    "Med tre sidor av längden \\(x\\) blir sidan längs muren \\(120-3x\\) meter.",
    "Ställ upp \\(A(x)=x(120-3x)\\), derivera och sätt \\(A'(x)=0\\). Glöm inte att visa att det är ett maximum."
  ],
  "losning": "<ol><li>Stängslet: \\(3x+y=120\\), där \\(y\\) är sidan längs muren, så \\(y=120-3x\\). Definitionsmängd \\(0\\lt x\\lt 40\\).</li><li>Arean: \\(A(x)=x(120-3x)=120x-3x^2\\) m².</li><li>\\(A'(x)=120-6x=0\\iff x=20\\).</li><li>\\(A''(x)=-6\\lt 0\\), alltså maximum.</li><li>\\(A(20)=20\\cdot(120-60)=20\\cdot 60=1\\,200\\).</li></ol><p>Svar: Den största sammanlagda arean är 1 200 m².</p>",
  "bedomning": [
    "+E<sub>M</sub> för korrekt uppställd areafunktion, t.ex. \\(A(x)=x(120-3x)\\)",
    "+C<sub>P</sub> för korrekt bestämt \\(x=20\\) med derivata",
    "+C<sub>R</sub> för korrekt största area 1 200 m² med motivering att det är ett maximum"
  ]
},
{
  "id": "der-046",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Optimering",
  "niva": "C",
  "poang": "0/1/0",
  "typ": "tal",
  "fraga": "<p>En låda utan lock ska ha kvadratisk botten och volymen 32 dm³.</p><p>Bestäm den minsta mängd material (sammanlagd area av botten och de fyra sidorna) som går åt.</p>",
  "svar": {
    "varde": 48,
    "tolerans": 0,
    "enhet": "dm²"
  },
  "ledtradar": [
    "Låt bottens sida vara \\(x\\) dm och höjden \\(h\\) dm. Volymen ger \\(x^2h=32\\).",
    "Arean \\(A=x^2+4xh=x^2+\\dfrac{128}{x}\\). Derivera och sätt \\(A'(x)=0\\)."
  ],
  "losning": "<ol><li>\\(x^2h=32\\iff h=\\dfrac{32}{x^2}\\).</li><li>\\(A(x)=x^2+4x\\cdot\\dfrac{32}{x^2}=x^2+\\dfrac{128}{x}=x^2+128x^{-1}\\).</li><li>\\(A'(x)=2x-128x^{-2}=0\\iff 2x^3=128\\iff x^3=64\\iff x=4\\).</li><li>\\(A''(x)=2+256x^{-3}\\gt 0\\) för \\(x\\gt 0\\), alltså minimum.</li><li>\\(h=\\tfrac{32}{16}=2\\) och \\(A(4)=16+32=48\\).</li></ol><p>Svar: 48 dm²</p>"
},
{
  "id": "der-047",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Modellering med derivata",
  "niva": "C",
  "poang": "1/2/0",
  "typ": "redovisning",
  "fraga": "<p>Koncentrationen \\(c\\) mg/l av ett läkemedel i blodet \\(t\\) timmar efter att en tablett tagits beskrivs med modellen</p><p>\\[c(t)=8\\left(e^{-0{,}2t}-e^{-0{,}5t}\\right)\\]</p><p>Bestäm när koncentrationen är som högst och hur hög den är då.</p>",
  "svar": {
    "facit": "Efter ca 3,1 h; koncentrationen är då ca 2,6 mg/l."
  },
  "ledtradar": [
    "\\(c'(t)=8\\left(-0{,}2e^{-0{,}2t}+0{,}5e^{-0{,}5t}\\right)\\).",
    "Ekvationen \\(0{,}5e^{-0{,}5t}=0{,}2e^{-0{,}2t}\\) kan skrivas \\(e^{0{,}3t}=2{,}5\\). Använd \\(\\ln\\)."
  ],
  "losning": "<ol><li>\\(c'(t)=8\\left(-0{,}2e^{-0{,}2t}+0{,}5e^{-0{,}5t}\\right)\\).</li><li>\\(c'(t)=0\\iff 0{,}5e^{-0{,}5t}=0{,}2e^{-0{,}2t}\\iff \\dfrac{e^{-0{,}2t}}{e^{-0{,}5t}}=\\dfrac{0{,}5}{0{,}2}\\iff e^{0{,}3t}=2{,}5\\).</li><li>\\(t=\\dfrac{\\ln 2{,}5}{0{,}3}\\approx 3{,}05\\) h.</li><li>Maximum: \\(c'(1)=8(-0{,}2e^{-0{,}2}+0{,}5e^{-0{,}5})\\approx 8(-0{,}164+0{,}303)\\gt 0\\) och \\(c'(5)=8(-0{,}2e^{-1}+0{,}5e^{-2{,}5})\\approx 8(-0{,}074+0{,}041)\\lt 0\\). Derivatan går från \\(+\\) till \\(-\\).</li><li>\\(c(3{,}05)=8\\left(e^{-0{,}611}-e^{-1{,}527}\\right)\\approx 8(0{,}543-0{,}217)\\approx 2{,}6\\).</li></ol><p>Svar: Koncentrationen är högst efter ca 3,1 timmar och är då ca 2,6 mg/l.</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt derivata \\(c'(t)\\)",
    "+C<sub>P</sub> för korrekt löst ekvation \\(c'(t)=0\\), \\(t\\approx 3{,}1\\) h",
    "+C<sub>M</sub> för korrekt maximal koncentration ca 2,6 mg/l med motivering att det är ett maximum"
  ]
},
{
  "id": "der-048",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Andraderivata",
  "niva": "C",
  "poang": "1/1/0",
  "typ": "redovisning",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=x^4-8x^2\\).</p><p>Bestäm grafens stationära punkter och avgör med hjälp av andraderivatan vilken typ av punkt var och en är.</p>",
  "svar": {
    "facit": "Maximipunkt \\((0,\\,0)\\), minimipunkter \\((-2,\\,-16)\\) och \\((2,\\,-16)\\)."
  },
  "ledtradar": [
    "\\(f'(x)=4x^3-16x=4x(x^2-4)\\).",
    "\\(f''(x)=12x^2-16\\). Om \\(f''(a)\\lt 0\\) är det en maximipunkt, om \\(f''(a)\\gt 0\\) en minimipunkt."
  ],
  "losning": "<ol><li>\\(f'(x)=4x^3-16x=4x(x^2-4)=0\\) ger \\(x=0\\), \\(x=-2\\) och \\(x=2\\).</li><li>\\(f(0)=0\\), \\(f(\\pm 2)=16-32=-16\\).</li><li>\\(f''(x)=12x^2-16\\):<ul><li>\\(f''(0)=-16\\lt 0\\) ⇒ maximipunkt</li><li>\\(f''(\\pm 2)=48-16=32\\gt 0\\) ⇒ minimipunkter</li></ul></li></ol><p>Svar: Maximipunkt \\((0,\\,0)\\) och minimipunkter \\((-2,\\,-16)\\) och \\((2,\\,-16)\\).</p>",
  "bedomning": [
    "+E<sub>P</sub> för korrekt bestämda stationära punkter (koordinater)",
    "+C<sub>R</sub> för korrekt användning av andraderivatan för att avgöra punkternas karaktär"
  ]
},
{
  "id": "der-049",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Derivatans definition",
  "niva": "A",
  "poang": "0/1/2",
  "typ": "redovisning",
  "fraga": "<p>Visa med hjälp av derivatans definition att derivatan av \\(f(x)=\\dfrac{1}{x}\\) är \\(f'(x)=-\\dfrac{1}{x^2}\\).</p>",
  "svar": {
    "facit": "\\(\\dfrac{f(x+h)-f(x)}{h}=-\\dfrac{1}{x(x+h)}\\to -\\dfrac{1}{x^2}\\) då \\(h\\to 0\\)."
  },
  "ledtradar": [
    "Ställ upp \\(\\dfrac{f(x+h)-f(x)}{h}=\\dfrac{\\frac{1}{x+h}-\\frac{1}{x}}{h}\\).",
    "Skriv bråken i täljaren på gemensam nämnare \\(x(x+h)\\) och förenkla innan du låter \\(h\\to 0\\)."
  ],
  "losning": "<p>Enligt derivatans definition är</p><p>\\[f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}=\\lim_{h\\to 0}\\frac{\\frac{1}{x+h}-\\frac{1}{x}}{h}\\]</p><p>Gemensam nämnare i täljaren:</p><p>\\[\\frac{1}{x+h}-\\frac{1}{x}=\\frac{x-(x+h)}{x(x+h)}=\\frac{-h}{x(x+h)}\\]</p><p>Alltså, för \\(h\\neq 0\\):</p><p>\\[\\frac{f(x+h)-f(x)}{h}=\\frac{-h}{x(x+h)\\cdot h}=-\\frac{1}{x(x+h)}\\]</p><p>När \\(h\\to 0\\) går \\(x(x+h)\\to x^2\\), så</p><p>\\[f'(x)=\\lim_{h\\to 0}\\left(-\\frac{1}{x(x+h)}\\right)=-\\frac{1}{x^2}\\quad\\text{V.S.V.}\\]</p>",
  "bedomning": [
    "+C<sub>B</sub> för korrekt insättning i derivatans definition",
    "+A<sub>P</sub> för korrekt förenkling till \\(-\\frac{1}{x(x+h)}\\)",
    "+A<sub>K</sub> för ett välstrukturerat bevis med korrekt gränsvärdesnotation genom hela lösningen"
  ]
},
{
  "id": "der-050",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Optimering",
  "niva": "A",
  "poang": "0/1/2",
  "typ": "redovisning",
  "fraga": "<p>En cylinderformad burk utan lock ska rymma volymen \\(V\\). Burken ska tillverkas så att den totala arean (botten och mantelyta) blir så liten som möjligt.</p><p>Visa att detta inträffar när burkens höjd är lika med dess radie, oavsett vilket värde \\(V\\) har.</p>",
  "svar": {
    "facit": "\\(A(r)=\\pi r^2+\\dfrac{2V}{r}\\), \\(A'(r)=0\\iff V=\\pi r^3\\), vilket ger \\(h=\\dfrac{V}{\\pi r^2}=r\\)."
  },
  "ledtradar": [
    "Med radie \\(r\\) och höjd \\(h\\): \\(V=\\pi r^2h\\) och \\(A=\\pi r^2+2\\pi rh\\).",
    "Uttryck \\(A\\) som funktion av \\(r\\) (med \\(V\\) som konstant), derivera och sätt \\(A'(r)=0\\). Jämför sedan med \\(h=\\dfrac{V}{\\pi r^2}\\)."
  ],
  "losning": "<ol><li>\\(V=\\pi r^2h\\iff h=\\dfrac{V}{\\pi r^2}\\).</li><li>\\(A(r)=\\pi r^2+2\\pi r\\cdot\\dfrac{V}{\\pi r^2}=\\pi r^2+\\dfrac{2V}{r}=\\pi r^2+2Vr^{-1}\\), \\(r\\gt 0\\).</li><li>\\(A'(r)=2\\pi r-\\dfrac{2V}{r^2}=0\\iff 2\\pi r^3=2V\\iff V=\\pi r^3\\).</li><li>\\(A''(r)=2\\pi+\\dfrac{4V}{r^3}\\gt 0\\) för alla \\(r\\gt 0\\), alltså är det ett minimum.</li><li>Höjden blir då \\(h=\\dfrac{V}{\\pi r^2}=\\dfrac{\\pi r^3}{\\pi r^2}=r\\).</li></ol><p>Slutsats: arean är minst när \\(h=r\\), oavsett \\(V\\).</p>",
  "bedomning": [
    "+C<sub>M</sub> för korrekt areafunktion i en variabel, \\(A(r)=\\pi r^2+\\frac{2V}{r}\\)",
    "+A<sub>PL</sub> för korrekt genomförd derivering och lösning som leder till \\(V=\\pi r^3\\) och \\(h=r\\)",
    "+A<sub>R</sub> för motivering att det är ett minimum och en generell slutsats"
  ]
},
{
  "id": "der-051",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Extremvärden och resonemang",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "redovisning",
  "fraga": "<p>Visa att \\(e^{x}\\ge x+1\\) för alla reella tal \\(x\\).</p>",
  "svar": {
    "facit": "\\(f(x)=e^x-x-1\\) har sitt minsta värde \\(f(0)=0\\), så \\(f(x)\\ge 0\\) för alla \\(x\\)."
  },
  "ledtradar": [
    "Studera skillnaden \\(f(x)=e^x-x-1\\). Det räcker att visa att \\(f(x)\\ge 0\\).",
    "Bestäm \\(f\\):s minsta värde med hjälp av \\(f'(x)=e^x-1\\)."
  ],
  "losning": "<ol><li>Låt \\(f(x)=e^x-x-1\\). Påståendet är detsamma som att \\(f(x)\\ge 0\\) för alla \\(x\\).</li><li>\\(f'(x)=e^x-1=0\\iff e^x=1\\iff x=0\\).</li><li>För \\(x\\lt 0\\) är \\(e^x\\lt 1\\), så \\(f'(x)\\lt 0\\); för \\(x\\gt 0\\) är \\(f'(x)\\gt 0\\). \\(f\\) är alltså avtagande till vänster om 0 och växande till höger, så \\(x=0\\) ger funktionens minsta värde (globalt, inte bara lokalt).</li><li>\\(f(0)=1-0-1=0\\). Alltså är \\(f(x)\\ge 0\\), dvs. \\(e^x\\ge x+1\\), för alla \\(x\\). V.S.V.</li></ol><p>(Geometriskt: \\(y=x+1\\) är tangenten till \\(y=e^x\\) i \\((0,\\,1)\\), och kurvan ligger aldrig under tangenten.)</p>",
  "bedomning": [
    "+C<sub>P</sub> för att ha bestämt det stationära läget \\(x=0\\) för \\(e^x-x-1\\) (eller motsvarande)",
    "+A<sub>R</sub> för ett fullständigt resonemang om att det är ett globalt minimum med värdet 0, och slutsats"
  ]
},
{
  "id": "der-052",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Extremvärden med parameter",
  "niva": "A",
  "poang": "0/1/2",
  "typ": "redovisning",
  "fraga": "<p>Funktionen \\(f\\) ges av \\(f(x)=e^{2x}-ax\\), där \\(a\\) är en positiv konstant.</p><p>Bestäm \\(a\\) så att funktionens minsta värde blir 0.</p>",
  "svar": {
    "facit": "\\(a=2e\\approx 5{,}44\\)"
  },
  "ledtradar": [
    "\\(f'(x)=2e^{2x}-a=0\\) ger \\(x=\\tfrac12\\ln\\tfrac a2\\). Detta är ett minimum eftersom \\(f''(x)=4e^{2x}\\gt 0\\).",
    "Sätt in detta \\(x\\) i \\(f\\). Använd att \\(e^{2x}=\\tfrac a2\\) i minimipunkten. Sätt sedan minsta värdet lika med 0."
  ],
  "losning": "<ol><li>\\(f'(x)=2e^{2x}-a=0\\iff e^{2x}=\\dfrac a2\\iff x_0=\\dfrac12\\ln\\dfrac a2\\).</li><li>\\(f''(x)=4e^{2x}\\gt 0\\) för alla \\(x\\), så \\(x_0\\) ger minsta värdet.</li><li>\\(f(x_0)=e^{2x_0}-ax_0=\\dfrac a2-\\dfrac a2\\ln\\dfrac a2=\\dfrac a2\\left(1-\\ln\\dfrac a2\\right)\\).</li><li>Minsta värdet 0: eftersom \\(a\\gt 0\\) måste \\(1-\\ln\\dfrac a2=0\\iff \\ln\\dfrac a2=1\\iff \\dfrac a2=e\\iff a=2e\\).</li></ol><p>Kontroll: \\(a=2e\\) ger \\(x_0=\\tfrac12\\) och \\(f(\\tfrac12)=e-2e\\cdot\\tfrac12=0\\). ✓</p><p>Svar: \\(a=2e\\approx 5{,}44\\)</p>",
  "bedomning": [
    "+C<sub>P</sub> för korrekt bestämd minimipunkt \\(x=\\frac12\\ln\\frac a2\\) (eller motsvarande)",
    "+A<sub>PL</sub> för korrekt uttryck för minsta värdet och korrekt löst ekvation, \\(a=2e\\)",
    "+A<sub>R</sub> för motivering att det verkligen är minsta värdet, t.ex. med andraderivatan"
  ]
},
{
  "id": "der-053",
  "kurser": [
    "3b",
    "3c"
  ],
  "del": "C",
  "omrade": "Derivata",
  "moment": "Tangentens ekvation",
  "niva": "A",
  "poang": "0/1/1",
  "typ": "redovisning",
  "fraga": "<p>Från origo dras en tangent till kurvan \\(y=e^{x}\\).</p><p>Bestäm tangentens ekvation.</p>",
  "svar": {
    "facit": "\\(y=ex\\) (tangeringspunkt \\((1,\\,e)\\))"
  },
  "ledtradar": [
    "Låt tangeringspunkten vara \\((a,\\,e^a)\\). Tangentens lutning där är \\(e^a\\).",
    "Tangenten \\(y-e^a=e^a(x-a)\\) ska gå genom \\((0,\\,0)\\). Sätt in och lös ut \\(a\\)."
  ],
  "losning": "<ol><li>Låt tangeringspunkten vara \\((a,\\,e^a)\\). Eftersom \\(D(e^x)=e^x\\) har tangenten lutningen \\(e^a\\).</li><li>Tangentens ekvation: \\(y-e^a=e^a(x-a)\\).</li><li>Den går genom origo: \\(0-e^a=e^a(0-a)\\iff -e^a=-ae^a\\iff a=1\\) (eftersom \\(e^a\\neq 0\\)).</li><li>Tangeringspunkten är \\((1,\\,e)\\) och lutningen \\(e\\): \\(y-e=e(x-1)\\iff y=ex\\).</li></ol><p>Svar: \\(y=ex\\)</p>",
  "bedomning": [
    "+C<sub>PL</sub> för korrekt ansats med en allmän tangeringspunkt och tangentens ekvation",
    "+A<sub>PL</sub> för korrekt bestämd tangeringspunkt och tangentens ekvation \\(y=ex\\)"
  ]
}
);
