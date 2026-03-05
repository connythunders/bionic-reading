// ============================================================
// KOMPLETTERANDE INNEHALL - Abrahamitiska religioner, ak 8
// Faktatexter, flervalsfragor, sorteringsobjekt, sant/falskt
// ============================================================

const religionData = {

  // ========================================================
  // 1. FAKTATEXTER - korta texter per tema och religion
  // ========================================================
  faktatexter: {
    "sadan_ar_gud": {
      titel: "S\u00e5dan \u00e4r Gud",
      judendom: "Inom judendomen \u00e4r Gud en enda, odelbar Gud som har slutit ett f\u00f6rbund med det judiska folket. Gud kallas bland annat JHVH (Jahve) och \u00e4r s\u00e5 helig att m\u00e5nga judar undviker att s\u00e4ga eller skriva Guds namn. Gud ses som skapare, domare och beskyddare som aktivt bryr sig om m\u00e4nniskorna.",
      kristendom: "Kristna tror p\u00e5 en Gud som visar sig i tre former: Fadern, Sonen (Jesus) och den Heliga Anden \u2013 detta kallas treenigheten. Gud beskrivs ofta som k\u00e4rleksfull och f\u00f6rl\u00e5tande, och har sj\u00e4lv blivit m\u00e4nniska genom Jesus. Det \u00e4r en unik tanke som skiljer kristendomen fr\u00e5n de andra tv\u00e5 religionerna.",
      islam: "I islam \u00e4r Gud (Allah) en enda, allsm\u00e4ktig och barmh\u00e4rtig Gud som inte kan j\u00e4mf\u00f6ras med n\u00e5got annat. Det \u00e4r strikt f\u00f6rbjudet att avbilda Gud eller ge Gud m\u00e4nskliga egenskaper. Guds 99 namn i Koranen beskriver olika sidor av Gud, till exempel 'den Barmh\u00e4rtige' och 'den Allvetande'."
    },
    "sa_skapades_varlden": {
      titel: "S\u00e5 skapades v\u00e4rlden",
      judendom: "Enligt Tora skapade Gud v\u00e4rlden p\u00e5 sex dagar och vilade p\u00e5 den sjunde, vilket \u00e4r grunden till sabbaten. M\u00e4nniskan skapades till Guds avbild och fick uppdraget att f\u00f6rvalta jorden. Skapelseber\u00e4ttelsen finns i F\u00f6rsta Moseboken, som \u00e4r gemensam f\u00f6r judendom och kristendom.",
      kristendom: "Kristna delar samma skapelseber\u00e4ttelse som judendomen \u2013 Gud skapade v\u00e4rlden p\u00e5 sex dagar. M\u00e5nga kristna ser ber\u00e4ttelsen som en liknelse snarare \u00e4n en bokstavlig beskrivning. Det viktiga budskapet \u00e4r att Gud skapat allt med en mening och att m\u00e4nniskan har ett s\u00e4rskilt v\u00e4rde.",
      islam: "I Koranen beskrivs hur Allah skapade himmel och jord p\u00e5 sex dagar. Adam skapades av lera och blev den f\u00f6rsta m\u00e4nniskan och profeten. \u00c4nglarna beordrades att buga f\u00f6r Adam, men Iblis (dj\u00e4vulen) v\u00e4grade, vilket ledde till att han f\u00f6rvisades fr\u00e5n paradiset."
    },
    "tidsuppfattningen": {
      titel: "Tidsuppfattningen",
      judendom: "Judendomen har en linj\u00e4r tidssyn d\u00e4r historien b\u00f6rjar med skapelsen och r\u00f6r sig fram\u00e5t mot en framtida fr\u00e4lsningstid. Man v\u00e4ntar p\u00e5 att Messias ska komma och skapa en tid av fred och r\u00e4ttvisa p\u00e5 jorden. Den judiska kalendern r\u00e4knar \u00e5r fr\u00e5n skapelsen.",
      kristendom: "Kristendomen har ocks\u00e5 en linj\u00e4r tidssyn, fr\u00e5n skapelse till domedag. Den stora skiljelinjen \u00e4r Jesus f\u00f6delse, som delar historien i 'f\u00f6re' och 'efter'. Kristna tror att Jesus ska komma tillbaka vid tidens slut f\u00f6r att d\u00f6ma levande och d\u00f6da.",
      islam: "Islam delar den linj\u00e4ra tidssynen med en skapelse, ett f\u00f6rlopp och en domedag (Yawm al-Qiyamah). Den muslimska tider\u00e4kningen b\u00f6rjar \u00e5r 622 d\u00e5 Muhammed flydde fr\u00e5n Mecka till Medina (hijra). P\u00e5 domedagen ska alla m\u00e4nniskor st\u00e4llas till svars f\u00f6r sina handlingar."
    },
    "levnadsregler": {
      titel: "Levnadsregler",
      judendom: "Judendomen har 613 bud (mitzvot) i Tora som styr allt fr\u00e5n mat till h\u00f6gtidsfirande. De tio budorden \u00e4r de mest k\u00e4nda och handlar om m\u00e4nniskans f\u00f6rh\u00e5llande till Gud och till andra m\u00e4nniskor. Kosherreglerna best\u00e4mmer vad man f\u00e5r \u00e4ta, till exempel \u00e4r grisk\u00f6tt f\u00f6rbjudet.",
      kristendom: "Jesus sammanfattade alla regler i det dubbla k\u00e4rleksbudet: '\u00c4lska Gud \u00f6ver allt, och \u00e4lska din n\u00e4sta som dig sj\u00e4lv.' Bergspredikan \u00e4r en annan viktig text d\u00e4r Jesus l\u00e4r ut om f\u00f6rl\u00e5telse, \u00f6dmjukhet och att \u00e4lska sina fiender. Kristna betonar ofta n\u00e5d och f\u00f6rl\u00e5telse framf\u00f6r regler.",
      islam: "Islam har fem grundpelare som varje muslim ska f\u00f6lja: trosbek\u00e4nnelsen, b\u00f6nen fem g\u00e5nger om dagen, fastan under ramadan, allmosan till fattiga och vallf\u00e4rden till Mecka. Sharia \u00e4r ett regelsystem baserat p\u00e5 Koranen och Muhammeds exempel som v\u00e4gleder hela livet."
    },
    "meningen_med_livet": {
      titel: "Meningen med livet",
      judendom: "Inom judendomen handlar livets mening om att f\u00f6lja Guds bud och leva ett gott och r\u00e4ttf\u00e4rdigt liv h\u00e4r och nu. Begreppet tikkun olam ('att reparera v\u00e4rlden') betonar att m\u00e4nniskan har ett ansvar att g\u00f6ra v\u00e4rlden till en b\u00e4ttre plats. Fokus ligger mer p\u00e5 detta livet \u00e4n p\u00e5 livet efter d\u00f6den.",
      kristendom: "F\u00f6r kristna \u00e4r livets mening att ha en relation med Gud och f\u00f6lja Jesus exempel. Genom tro p\u00e5 Jesus kan m\u00e4nniskan f\u00e5 f\u00f6rl\u00e5telse f\u00f6r sina synder och evigt liv. K\u00e4rleken till Gud och medm\u00e4nniskor st\u00e5r i centrum, och m\u00e4nniskan \u00e4r skapad f\u00f6r att leva i gemenskap.",
      islam: "I islam \u00e4r livets mening att underkasta sig Guds vilja och leva enligt Koranens l\u00e4ror. Ordet 'islam' betyder just 'underkastelse'. Livet p\u00e5 jorden ses som ett prov d\u00e4r m\u00e4nniskans handlingar avg\u00f6r vad som h\u00e4nder efter d\u00f6den. Att g\u00f6ra gott, be och hj\u00e4lpa andra \u00e4r centralt."
    },
    "livet_efter_doden": {
      titel: "Livet efter d\u00f6den",
      judendom: "Judendomen har ingen entydig l\u00e4ra om livet efter d\u00f6den. M\u00e5nga judar tror p\u00e5 en kommande v\u00e4rld (Olam Ha-Ba) d\u00e4r de r\u00e4ttf\u00e4rdiga f\u00e5r sin bel\u00f6ning. Fokus ligger dock mer p\u00e5 hur man lever i denna v\u00e4rlden \u00e4n p\u00e5 vad som h\u00e4nder efter d\u00f6den.",
      kristendom: "Kristna tror p\u00e5 uppst\u00e5ndelsen \u2013 att de d\u00f6da ska \u00e5terv\u00e4nda till livet p\u00e5 domedagen. De som trott p\u00e5 Jesus f\u00e5r evigt liv i himlen, medan de som avvisat Gud m\u00f6ter helvetet. M\u00e5nga kristna tror ocks\u00e5 att sj\u00e4len lever vidare direkt efter d\u00f6den.",
      islam: "Islam har en mycket tydlig l\u00e4ra om livet efter d\u00f6den. P\u00e5 domedagen (Yawm al-Qiyamah) v\u00e4gs varje m\u00e4nniskas goda och onda handlingar. De som levt r\u00e4ttf\u00e4rdigt kommer till paradiset (Jannah), medan de onda straffas i helvetet (Jahannam). Guds barmh\u00e4rtighet spelar ocks\u00e5 en stor roll."
    },
    "heliga_skrifter": {
      titel: "Heliga skrifter",
      judendom: "Tora \u00e4r judendomens viktigaste text och best\u00e5r av de fem Moseb\u00f6ckerna. Tanakh \u00e4r hela den judiska Bibeln och inneh\u00e5ller \u00e4ven profetb\u00f6cker och andra skrifter. Talmud \u00e4r en stor samling kommentarer och diskussioner som hj\u00e4lper till att tolka och till\u00e4mpa lagarna i Tora.",
      kristendom: "Kristendomens heliga bok \u00e4r Bibeln, som best\u00e5r av tv\u00e5 delar: Gamla testamentet (som \u00f6verenst\u00e4mmer med den judiska Tanakh) och Nya testamentet. Nya testamentet inneh\u00e5ller de fyra evangelierna om Jesus liv, brev fr\u00e5n apostlar som Paulus, och Johannes uppenbarelse.",
      islam: "Koranen \u00e4r islams heliga bok och anses vara Guds exakta ord, uppenbarat f\u00f6r Muhammed via \u00e4ngeln Gabriel. Den \u00e4r skriven p\u00e5 arabiska och indelad i 114 kapitel (suror). Haditherna \u00e4r en samling ber\u00e4ttelser om vad Muhammed sade och gjorde, och fungerar som komplement till Koranen."
    },
    "grundare_och_profeter": {
      titel: "Grundare och profeter",
      judendom: "Abraham ses som judendomens stamfader och den f\u00f6rste att sluta f\u00f6rbund med Gud. Mose \u00e4r en annan central gestalt som ledde israeliterna ut ur slaveriet i Egypten och mottog de tio budorden p\u00e5 berget Sinai. Judendomen har ingen enskild 'grundare' utan har vuxit fram \u00f6ver tusentals \u00e5r.",
      kristendom: "Jesus fr\u00e5n Nasaret \u00e4r kristendomens centrala gestalt och ses som Guds son och Messias. Han f\u00f6ddes i Betlehem, predikade om k\u00e4rlek och f\u00f6rl\u00e5telse, korsf\u00e4stes och uppstod enligt kristen tro. Apostlarna, s\u00e4rskilt Paulus, spred sedan budskapet vidare och grundade de f\u00f6rsta f\u00f6rsamlingarna.",
      islam: "Profeten Muhammed (570\u2013632) \u00e4r islams grundare och ses som den siste i en l\u00e5ng rad av profeter. Han fick sina f\u00f6rsta uppenbarelser i en grotta utanf\u00f6r Mecka \u00e5r 610. Islam erk\u00e4nner \u00e4ven tidigare profeter som Ibrahim (Abraham), Musa (Mose) och Isa (Jesus), men Muhammed \u00e4r 'profeternas sigill'."
    },
    "riter_vid_fodelse_och_dod": {
      titel: "Riter vid f\u00f6delse och d\u00f6d",
      judendom: "Judiska pojkar omsk\u00e4rs p\u00e5 den \u00e5ttonde dagen efter f\u00f6dseln i en ceremoni kallad brit mila, som \u00e4r ett tecken p\u00e5 f\u00f6rbundet med Gud. Vid d\u00f6den tv\u00e4ttas kroppen rituellt och begravs s\u00e5 snart som m\u00f6jligt, helst inom ett dygn. Familjen sitter shiva \u2013 en sju dagar l\u00e5ng sorgeperiod.",
      kristendom: "Dopet \u00e4r den viktigaste f\u00f6delseriten i kristendomen, d\u00e4r barnet tas emot i den kristna gemenskapen med vatten. Vid d\u00f6den h\u00e5lls begravningsgudstj\u00e4nst i kyrkan d\u00e4r man l\u00e4ser ur Bibeln, ber och sjunger psalmer. B\u00e5de begravning och kremering f\u00f6rekommer beroende p\u00e5 tradition.",
      islam: "N\u00e4r ett barn f\u00f6ds i en muslimsk familj viskas b\u00f6neropet (adhan) i barnets \u00f6ra, och pojkar omsk\u00e4rs. Vid d\u00f6den tv\u00e4ttas kroppen noggrant, sveps i vita tyger och begravs med ansiktet mot Mecka, helst samma dag. Begravningen \u00e4r enkel och kremering \u00e4r inte till\u00e5ten."
    },
    "brollopet": {
      titel: "Br\u00f6llopet",
      judendom: "Ett judiskt br\u00f6llop h\u00e5lls under en chuppa (baldakin) som symboliserar det nya hemmet. Paret undertecknar ett \u00e4ktenskapskontrakt (ketuba) och brudgummen krossar ett glas med foten som p\u00e5minnelse om Jerusalems tempels f\u00f6rst\u00f6ring. Ceremonin leds av en rabbin.",
      kristendom: "Det kristna br\u00f6llopet h\u00e5lls vanligtvis i en kyrka d\u00e4r paret ger varandra l\u00f6ften inf\u00f6r Gud och f\u00f6rsamlingen. Ringar v\u00e4xlas som symbol f\u00f6r evig k\u00e4rlek. I katolska kyrkan \u00e4r \u00e4ktenskapet ett sakrament \u2013 en helig handling som inte kan uppl\u00f6sas genom skilsm\u00e4ssa.",
      islam: "Ett muslimskt br\u00f6llop (nikah) bygger p\u00e5 ett kontrakt mellan brudgummen och brudens familj, d\u00e4r en brudg\u00e5va (mahr) avtalas. Ceremonin leds ofta av en imam och Koranverser l\u00e4ses. Br\u00f6llopet kan \u00e4ga rum i en mosk\u00e9, i hemmet eller p\u00e5 annan plats och \u00e4r ofta en stor fest."
    },
    "religiosa_byggnader": {
      titel: "Religi\u00f6sa byggnader",
      judendom: "Synagogan \u00e4r judendomens gudstj\u00e4nsthus d\u00e4r man samlas f\u00f6r b\u00f6n, studier och gemenskap. I varje synagoga finns ett Toraskap (aron ha-kodesh) d\u00e4r Torarullarna f\u00f6rvaras. Det ursprungliga templet i Jerusalem f\u00f6rst\u00f6rdes tv\u00e5 g\u00e5nger och bara V\u00e4stra muren st\u00e5r kvar idag.",
      kristendom: "Kristna samlas i kyrkor f\u00f6r gudstj\u00e4nst, b\u00f6n och gemenskap. Kyrkor kan se mycket olika ut \u2013 fr\u00e5n enkla kapell till stora katedraler. Vanliga symboler \u00e4r korset, altaret och dopfunten. Katolska kyrkor har ofta bilder och statyer, medan protestantiska kyrkor \u00e4r mer avskalade.",
      islam: "Mosk\u00e9n (masjid) \u00e4r islams b\u00f6nehus d\u00e4r muslimer samlas f\u00f6r b\u00f6n, s\u00e4rskilt fredagsb\u00f6nen. I varje mosk\u00e9 finns en b\u00f6nenisch (mihrab) som visar riktningen mot Mecka. Minareten \u00e4r det torn varifr\u00e5n b\u00f6neropet (adhan) traditionellt utropas. Skor tas av innan man g\u00e5r in."
    }
  },

  // ========================================================
  // 2. FLERVALSFR\u00c5GOR - 20 stycken
  // ========================================================
  flervalsfragor: [
    {
      id: 1,
      fraga: "Vad kallas det judiska br\u00f6llopstaket som paret st\u00e5r under?",
      alternativ: ["Menora", "Chuppa", "Ketuba", "Kipa"],
      rattSvar: 1,
      forklaring: "Chuppa \u00e4r en baldakin som symboliserar parets nya gemensamma hem."
    },
    {
      id: 2,
      fraga: "Hur m\u00e5nga pelare har islam?",
      alternativ: ["Tre", "Fyra", "Fem", "Sju"],
      rattSvar: 2,
      forklaring: "Islam har fem pelare: trosbek\u00e4nnelsen, b\u00f6nen, fastan, allmosan och vallf\u00e4rden."
    },
    {
      id: 3,
      fraga: "Vad heter den judiska sorgeperioden efter en n\u00e4ra anh\u00f6rigs d\u00f6d?",
      alternativ: ["Pesach", "Sabbat", "Shiva", "Seder"],
      rattSvar: 2,
      forklaring: "Shiva \u00e4r en sju dagar l\u00e5ng sorgeperiod d\u00e5 familjen tar emot bes\u00f6kare och s\u00f6rjer tillsammans."
    },
    {
      id: 4,
      fraga: "Vilken kristen tradition ser \u00e4ktenskapet som ett sakrament som inte kan uppl\u00f6sas?",
      alternativ: ["Judendomen", "Protestantisk kristendom", "Katolsk kristendom", "Islam"],
      rattSvar: 2,
      forklaring: "I katolska kyrkan \u00e4r \u00e4ktenskapet ett av sju sakrament och skilsm\u00e4ssa \u00e4r i princip inte till\u00e5ten."
    },
    {
      id: 5,
      fraga: "Vad \u00e4r en hadith?",
      alternativ: ["En b\u00f6n i mosk\u00e9n", "Ett kapitel i Koranen", "En ber\u00e4ttelse om vad Muhammed sade eller gjorde", "En muslimsk h\u00f6gtid"],
      rattSvar: 2,
      forklaring: "Haditherna \u00e4r ber\u00e4ttelser och uttalanden fr\u00e5n profeten Muhammed som kompletterar Koranen."
    },
    {
      id: 6,
      fraga: "Vad betyder begreppet 'tikkun olam'?",
      alternativ: ["Att be till Gud", "Att reparera v\u00e4rlden", "Att fasta", "Att studera Tora"],
      rattSvar: 1,
      forklaring: "Tikkun olam \u00e4r ett judiskt begrepp som betonar m\u00e4nniskans ansvar att g\u00f6ra v\u00e4rlden till en b\u00e4ttre plats."
    },
    {
      id: 7,
      fraga: "Vad \u00e4r en mihrab?",
      alternativ: ["Ett b\u00f6nerop", "En predikstol i mosk\u00e9n", "En b\u00f6nenisch som visar riktningen mot Mecka", "En muslimsk helgdag"],
      rattSvar: 2,
      forklaring: "Mihrab \u00e4r en nisch i mosk\u00e9ns v\u00e4gg som visar qibla, allts\u00e5 riktningen mot Mecka."
    },
    {
      id: 8,
      fraga: "Vad kallas den judiska omsk\u00e4relseritualen?",
      alternativ: ["Bar mitsva", "Brit mila", "Shabbat", "Seder"],
      rattSvar: 1,
      forklaring: "Brit mila \u00e4r omsk\u00e4relseceremonin som utf\u00f6rs p\u00e5 pojkar den \u00e5ttonde dagen efter f\u00f6dseln."
    },
    {
      id: 9,
      fraga: "Vilken profet anses inom islam vara den allra siste?",
      alternativ: ["Ibrahim", "Musa", "Isa", "Muhammed"],
      rattSvar: 3,
      forklaring: "Muhammed kallas 'profeternas sigill' och anses vara den siste i raden av Guds profeter."
    },
    {
      id: 10,
      fraga: "Vad \u00e4r Tanakh?",
      alternativ: ["En judisk h\u00f6gtid", "Hela den judiska Bibeln", "En bok om judisk mat", "Ett judiskt tempel"],
      rattSvar: 1,
      forklaring: "Tanakh \u00e4r den judiska Bibeln som best\u00e5r av Tora (lagen), Neviim (profeterna) och Ketuvim (skrifterna)."
    },
    {
      id: 11,
      fraga: "Vad h\u00e4nder p\u00e5 domedagen enligt islam?",
      alternativ: ["Alla m\u00e4nniskor \u00e5terf\u00f6ds", "Alla synder f\u00f6rl\u00e5ts automatiskt", "Varje m\u00e4nniskas handlingar v\u00e4gs p\u00e5 en v\u00e5g", "V\u00e4rlden skapas p\u00e5 nytt"],
      rattSvar: 2,
      forklaring: "P\u00e5 domedagen (Yawm al-Qiyamah) v\u00e4gs varje m\u00e4nniskas goda och onda handlingar f\u00f6r att avg\u00f6ra om de f\u00e5r komma till paradiset."
    },
    {
      id: 12,
      fraga: "Vad kallas brudg\u00e5van inom ett muslimskt br\u00f6llop?",
      alternativ: ["Nikah", "Mahr", "Halal", "Hijab"],
      rattSvar: 1,
      forklaring: "Mahr \u00e4r den g\u00e5va (pengar eller egendom) som brudgummen ger bruden som en del av \u00e4ktenskapskontraktet."
    },
    {
      id: 13,
      fraga: "Varf\u00f6r krossar brudgummen ett glas vid judiska br\u00f6llop?",
      alternativ: ["F\u00f6r tur i \u00e4ktenskapet", "Till minne av Jerusalems tempels f\u00f6rst\u00f6ring", "F\u00f6r att skr\u00e4mma bort onda andar", "Som tecken p\u00e5 k\u00e4rlek"],
      rattSvar: 1,
      forklaring: "Glaskrossningen p\u00e5minner om templets f\u00f6rst\u00f6ring och att det finns sorg \u00e4ven i gl\u00e4djens stund."
    },
    {
      id: 14,
      fraga: "Vad \u00e4r sharia?",
      alternativ: ["En muslimsk h\u00f6gtid", "Ett islamiskt regelsystem baserat p\u00e5 Koranen", "En mosk\u00e9 i Mecka", "En arabisk h\u00e4lsning"],
      rattSvar: 1,
      forklaring: "Sharia \u00e4r islams regelsystem som bygger p\u00e5 Koranen och Muhammeds sunna och omfattar allt fr\u00e5n juridik till vardagsliv."
    },
    {
      id: 15,
      fraga: "Vad \u00e4r Bergspredikan?",
      alternativ: ["Moses tal p\u00e5 berget Sinai", "Jesus mest k\u00e4nda tal om k\u00e4rlek och f\u00f6rl\u00e5telse", "En ber\u00e4ttelse om Muhammeds flykt", "Abrahams f\u00f6rbund med Gud"],
      rattSvar: 1,
      forklaring: "Bergspredikan \u00e4r Jesus l\u00e5nga tal i Matteusevangeliet d\u00e4r han bland annat l\u00e4r ut om att \u00e4lska sina fiender."
    },
    {
      id: 16,
      fraga: "Vad \u00e4r gemensamt f\u00f6r alla tre abrahamitiska religionerna?",
      alternativ: ["De tror p\u00e5 treenigheten", "De har samma heliga bok", "De tror p\u00e5 en enda Gud", "De ber i mosk\u00e9er"],
      rattSvar: 2,
      forklaring: "Judendom, kristendom och islam \u00e4r alla monoteistiska \u2013 de tror p\u00e5 en enda Gud."
    },
    {
      id: 17,
      fraga: "Vad \u00e4r aron ha-kodesh?",
      alternativ: ["En judisk h\u00f6gtid", "Sk\u00e5pet d\u00e4r Torarullarna f\u00f6rvaras i synagogan", "En judisk b\u00f6nebok", "En rabbin i Jerusalem"],
      rattSvar: 1,
      forklaring: "Aron ha-kodesh (det heliga sk\u00e5pet) \u00e4r det viktigaste f\u00f6rem\u00e5let i varje synagoga och inneh\u00e5ller Torarullarna."
    },
    {
      id: 18,
      fraga: "Varf\u00f6r b\u00f6rjar den muslimska tider\u00e4kningen \u00e5r 622?",
      alternativ: ["Muhammed f\u00f6ddes", "Koranen b\u00f6rjade skrivas", "Muhammed flydde fr\u00e5n Mecka till Medina (hijra)", "Mosk\u00e9n i Mecka byggdes"],
      rattSvar: 2,
      forklaring: "Hijra, Muhammeds flykt till Medina \u00e5r 622, \u00e4r s\u00e5 viktig att den markerar starten p\u00e5 den islamiska kalendern."
    },
    {
      id: 19,
      fraga: "Vad viskas i ett nyf\u00f6tt muslimskt barns \u00f6ra?",
      alternativ: ["En sura fr\u00e5n Koranen", "Barnets namn", "B\u00f6neropet (adhan)", "En v\u00e4lsignelse"],
      rattSvar: 2,
      forklaring: "B\u00f6neropet (adhan) viskas i barnets h\u00f6gra \u00f6ra s\u00e5 att Guds namn \u00e4r det f\u00f6rsta barnet h\u00f6r."
    },
    {
      id: 20,
      fraga: "Vad \u00e4r Olam Ha-Ba?",
      alternativ: ["En judisk h\u00f6gtid", "Den kommande v\u00e4rlden inom judendomen", "Judisk lagsamling", "En synagoga i Jerusalem"],
      rattSvar: 1,
      forklaring: "Olam Ha-Ba \u00e4r det judiska begreppet f\u00f6r 'den kommande v\u00e4rlden' d\u00e4r de r\u00e4ttf\u00e4rdiga f\u00e5r sin bel\u00f6ning."
    }
  ],

  // ========================================================
  // 3. SORTERINGSOBJEKT - 15 begrepp att sortera till religion
  // ========================================================
  sorteringsobjekt: [
    { term: "Brit mila", religion: "Judendom", forklaring: "Omsk\u00e4relseceremoni f\u00f6r judiska pojkar p\u00e5 den \u00e5ttonde levnadsdagen." },
    { term: "Sakrament", religion: "Kristendom", forklaring: "Heliga handlingar som dop och nattvard inom kristendomen." },
    { term: "Hadith", religion: "Islam", forklaring: "Samlingar av ber\u00e4ttelser om profeten Muhammeds ord och handlingar." },
    { term: "Treenigheten", religion: "Kristendom", forklaring: "Tron att Gud \u00e4r en men visar sig i tre former: Fadern, Sonen och Anden." },
    { term: "Shiva", religion: "Judendom", forklaring: "En sju dagar l\u00e5ng judisk sorgeperiod efter att n\u00e5gon n\u00e4ra har d\u00f6tt." },
    { term: "Mahr", religion: "Islam", forklaring: "Brudg\u00e5van som brudgummen ger bruden vid muslimskt br\u00f6llop." },
    { term: "Chuppa", religion: "Judendom", forklaring: "Baldakinen som paret st\u00e5r under vid ett judiskt br\u00f6llop." },
    { term: "Minareten", religion: "Islam", forklaring: "Tornet vid en mosk\u00e9 d\u00e4rifr\u00e5n b\u00f6neropet traditionellt utropas." },
    { term: "Arvssynd", religion: "Kristendom", forklaring: "Tron att alla m\u00e4nniskor f\u00f6ds med en ben\u00e4genhet att g\u00f6ra fel." },
    { term: "Ketuba", religion: "Judendom", forklaring: "Det judiska \u00e4ktenskapskontraktet som undertecknas vid br\u00f6llop." },
    { term: "Nikah", religion: "Islam", forklaring: "Den islamiska vigselceremonin som bygger p\u00e5 ett kontrakt." },
    { term: "Mihrab", religion: "Islam", forklaring: "B\u00f6nenischen i mosk\u00e9n som visar riktningen mot Mecka." },
    { term: "Nattvard", religion: "Kristendom", forklaring: "Kristen ritual d\u00e4r man delar br\u00f6d och vin till minne av Jesus." },
    { term: "Tikkun olam", religion: "Judendom", forklaring: "Judiskt begrepp som betyder 'att reparera v\u00e4rlden'." },
    { term: "Bergspredikan", religion: "Kristendom", forklaring: "Jesus mest k\u00e4nda tal om k\u00e4rlek, f\u00f6rl\u00e5telse och \u00f6dmjukhet." }
  ],

  // ========================================================
  // 4. SANT/FALSKT - 15 p\u00e5st\u00e5enden
  // ========================================================
  santFalskt: [
    {
      id: 1,
      pastaende: "Inom judendomen \u00e4r det vanligt att begrava den d\u00f6de s\u00e5 snart som m\u00f6jligt, helst inom ett dygn.",
      svar: true,
      forklaring: "St\u00e4mmer! Enligt judisk tradition ska begravningen ske snabbt f\u00f6r att visa respekt f\u00f6r den d\u00f6de."
    },
    {
      id: 2,
      pastaende: "Kristna, judar och muslimer tror alla p\u00e5 treenigheten.",
      svar: false,
      forklaring: "Falskt! Treenigheten \u00e4r en unik kristen tro. Judendom och islam betonar starkt att Gud \u00e4r en och odelbar."
    },
    {
      id: 3,
      pastaende: "I islam \u00e4r det till\u00e5tet att kremera den d\u00f6de.",
      svar: false,
      forklaring: "Falskt! Kremering \u00e4r inte till\u00e5ten inom islam. Den d\u00f6de ska begravas med kroppen intakt, med ansiktet mot Mecka."
    },
    {
      id: 4,
      pastaende: "Koranen \u00e4r indelad i 114 kapitel som kallas suror.",
      svar: true,
      forklaring: "St\u00e4mmer! Koranens 114 suror varierar i l\u00e4ngd och \u00e4r ordnade i stort sett fr\u00e5n l\u00e4ngst till kortast."
    },
    {
      id: 5,
      pastaende: "Muhammed anses inom islam vara Guds son.",
      svar: false,
      forklaring: "Falskt! Muhammed \u00e4r Guds profet och budb\u00e4rare, inte Guds son. Tanken att Gud har en son avvisas helt i islam."
    },
    {
      id: 6,
      pastaende: "Abraham \u00e4r en viktig gestalt i alla tre abrahamitiska religionerna.",
      svar: true,
      forklaring: "St\u00e4mmer! Abraham (Ibrahim i islam) ses som stamfader i alla tre religionerna, som d\u00e4rf\u00f6r kallas abrahamitiska."
    },
    {
      id: 7,
      pastaende: "I protestantiska kyrkor \u00e4r \u00e4ktenskapet ett av sju sakrament.",
      svar: false,
      forklaring: "Falskt! De flesta protestanter erk\u00e4nner bara tv\u00e5 sakrament: dop och nattvard. Det \u00e4r katolska kyrkan som har sju."
    },
    {
      id: 8,
      pastaende: "Den judiska kalendern r\u00e4knar \u00e5r fr\u00e5n skapelsen.",
      svar: true,
      forklaring: "St\u00e4mmer! Enligt den judiska kalendern skapades v\u00e4rlden f\u00f6r drygt 5700 \u00e5r sedan."
    },
    {
      id: 9,
      pastaende: "Jesus betraktas som en profet inom islam.",
      svar: true,
      forklaring: "St\u00e4mmer! Jesus (Isa) \u00e4r en h\u00f6gt respekterad profet i islam, men inte Guds son."
    },
    {
      id: 10,
      pastaende: "Judendomen har en mycket detaljerad och entydig l\u00e4ra om livet efter d\u00f6den.",
      svar: false,
      forklaring: "Falskt! Judendomen har faktiskt ingen entydig l\u00e4ra om livet efter d\u00f6den. Fokus ligger mer p\u00e5 hur man lever h\u00e4r och nu."
    },
    {
      id: 11,
      pastaende: "Ordet 'islam' betyder 'fred' p\u00e5 arabiska.",
      svar: false,
      forklaring: "Falskt! Ordet 'islam' betyder 'underkastelse' (under Guds vilja). Det \u00e4r besl\u00e4ktat med ordet 'salam' som betyder fred."
    },
    {
      id: 12,
      pastaende: "Aron ha-kodesh \u00e4r sk\u00e5pet i synagogan d\u00e4r Torarullarna f\u00f6rvaras.",
      svar: true,
      forklaring: "St\u00e4mmer! Aron ha-kodesh (det heliga sk\u00e5pet) \u00e4r det mest centrala f\u00f6rem\u00e5let i varje synagoga."
    },
    {
      id: 13,
      pastaende: "Alla tre abrahamitiska religionerna har en linj\u00e4r tidssyn.",
      svar: true,
      forklaring: "St\u00e4mmer! Alla tre ser tiden som en rak linje fr\u00e5n skapelse till domedag, till skillnad fr\u00e5n den cirkul\u00e4ra tidssyn som finns i exempelvis hinduism."
    },
    {
      id: 14,
      pastaende: "P\u00e5ven \u00e4r den \u00f6verste ledaren f\u00f6r alla kristna i v\u00e4rlden.",
      svar: false,
      forklaring: "Falskt! P\u00e5ven \u00e4r ledare f\u00f6r katolska kyrkan, men inte f\u00f6r protestanter eller ortodoxa kristna."
    },
    {
      id: 15,
      pastaende: "I islam avbildas ofta Gud och Muhammed i konst och m\u00e5lningar.",
      svar: false,
      forklaring: "Falskt! Det r\u00e5der avbildningsf\u00f6rbud i islam. D\u00e4rf\u00f6r anv\u00e4nder islamisk konst ist\u00e4llet geometriska m\u00f6nster och kalligrafi."
    }
  ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = religionData;
}
