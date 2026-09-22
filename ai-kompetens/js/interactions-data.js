/*
 * interactions-data.js
 * Statisk data för sektion 5 ("Testa dig själv"): quizfrågor, riskpyramid-exempel,
 * scenarier och faktakoll-påståenden. Inga ES-moduler (laddas med <script defer>),
 * så allt exponeras som globala const-objekt som interactions.js läser.
 *
 * Innehållet är hämtat/baserat på research/elevperspektiv.md (avsnitt 3, 4, 5) och
 * research/juridik.md (avsnitt 2, 3) för att säkerställa juridisk korrekthet,
 * särskilt kring artikel 4 (AI-kompetens riktar sig till leverantörer/tillhandahållare,
 * ALDRIG som en individuell juridisk skyldighet för enskilda elever).
 */

/* ---------------------------------------------------------------------- */
/* QUIZ_DATA                                                              */
/* Nycklarna MÅSTE matcha id på .quiz-mount-divarna i innehållsagentens   */
/* HTML-filer exakt: quiz-vad-ar-ai, quiz-forordningen, quiz-ai-kompetens, */
/* quiz-ai-i-skolan.                                                      */
/* Varje fråga: { question, options: [strängar], correctIndex, explanation } */
/* ---------------------------------------------------------------------- */

const QUIZ_DATA = {
  "quiz-vad-ar-ai": [
    {
      question:
        "Vad är den viktigaste skillnaden mellan ett vanligt datorprogram och maskininlärning?",
      options: [
        "Maskininlärning följer fasta regler som en människa skrivit i förväg, precis som vanliga program.",
        "Maskininlärning lär sig mönster från stora mängder exempel istället för att följa regler skrivna i förväg.",
        "Det finns ingen egentlig skillnad — det är bara ett nytt marknadsnamn för samma teknik."
      ],
      correctIndex: 1,
      explanation:
        "Ett vanligt program gör exakt det som programmerats i förväg. Maskininlärning fungerar tvärtom: systemet tränas på enorma mängder exempel och \"lär sig\" själv mönster i materialet, vilket gör att det kan hantera situationer det aldrig sett exakt förut — men också gå fel på sätt som är svåra att förutsäga."
      },
    {
      question:
        "Hur \"väljer\" en språkmodell som ChatGPT eller Copilot nästa ord i sitt svar?",
      options: [
        "Den slår upp det garanterat rätta svaret i en inbyggd faktadatabas.",
        "Den frågar internet i realtid för varje enskilt ord den skriver.",
        "Den räknar ut vilket ord (eller vilken textbit) som statistiskt sett brukar komma härnäst och väljer ett av de mest sannolika."
      ],
      correctIndex: 2,
      explanation:
        "Språkmodeller optimerar för att texten ska se rimlig ut rent statistiskt, inte för att den garanterat ska vara sann. Det förklarar varför AI-texter kan låta flytande och självsäkra även när innehållet faktiskt är felaktigt."
    },
    {
      question: "Vad menas med att en AI \"hallucinerar\"?",
      options: [
        "Att AI:n vägrar svara på en fråga den tycker är olämplig.",
        "Att AI:n svarar långsammare än vanligt och till slut kraschar.",
        "Att AI:n låter helt säker men har fel — till exempel hittar på en exakt siffra eller en källa som inte finns."
      ],
      correctIndex: 2,
      explanation:
        "Ett klassiskt exempel: en AI kan påstå att \"Sveriges riksdag har 391 ledamöter, vilket gör den till Europas största parlament\" — helt fel på båda punkterna (rätt svar är 349 ledamöter, och riksdagen är inte störst i Europa), men formulerat lika självsäkert som om det vore sant. Detaljrikedom och säkert tonfall säger ingenting om huruvida ett AI-svar faktiskt stämmer."
    },
    {
      question:
        "Varför kan en AI spegla snedvridningar (bias) trots att den \"bara är matematik\"?",
      options: [
        "Den tränas på enorma mängder människoskapad data, som redan bär med sig perspektiv och slagsidor — det kan synas i svaren utan att modellen \"menar\" något med det.",
        "AI kan aldrig ha bias eftersom den saknar känslor och medvetna avsikter.",
        "Bias uppstår bara om en programmerare medvetet har lagt in det i koden."
      ],
      correctIndex: 0,
      explanation:
        "Avsaknad av avsikt är inte detsamma som avsaknad av effekt. Om vissa grupper, språk eller synsätt är överrepresenterade i träningsdatan blir det ofta synligt i svaren som förenklade eller vinklade framställningar, helt utan att någon programmerat in det medvetet."
    }
  ],

  "quiz-forordningen": [
    {
      question: "Vad är EU:s AI-förordning (AI Act) i grunden?",
      options: [
        "En lag som förbjuder all användning av AI inom EU.",
        "En lag som delar in AI-system i olika risknivåer och ställer olika krav beroende på hur riskabel användningen är.",
        "En frivillig rekommendation som företag kan välja att följa om de vill."
      ],
      correctIndex: 1,
      explanation:
        "AI-förordningen bygger på en riskpyramid med fyra nivåer — oacceptabel risk (förbjudet), hög risk (tillåtet men med stränga krav), begränsad risk (transparenskrav) och minimal risk (inga särskilda krav). Det är bindande EU-lag, inte en frivillig rekommendation."
    },
    {
      question:
        "Ett system scannar elevers ansiktsuttryck under lektionstid för att gissa vilka som \"verkar oengagerade\". Vilken risknivå?",
      options: [
        "Minimal risk — det handlar ju bara om ansiktsuttryck.",
        "Hög risk, men tillåtet om skolan informerar eleverna om det i förväg.",
        "Oacceptabel risk — känsloigenkänning i skola och arbetsliv är förbjuden (med undantag för medicinska/säkerhetsskäl)."
      ],
      correctIndex: 2,
      explanation:
        "Enligt artikel 5 i AI-förordningen är det förbjudet att använda AI för att dra slutsatser om en persons känslor i utbildningsinstitutioner och på arbetsplatser. Det gäller oavsett om skolan informerar om det eller inte — förbudet går inte att avtala bort."
    },
    {
      question:
        "Ett digitalt provverktyg analyserar elevers ögonrörelser via webbkameran för att flagga möjligt fusk under högskoleprovet. Vilken risknivå?",
      options: [
        "Hög risk — tillåtet, men leverantören måste uppfylla stränga krav som mänsklig tillsyn, loggning och riskhantering.",
        "Oacceptabel risk — all provövervakning med AI är förbjuden.",
        "Minimal risk — det är samma typ av system som ett spamfilter i mejlen."
      ],
      correctIndex: 0,
      explanation:
        "Provövervakning (\"AI-proctoring\") räknas explicit som en högriskanvändning i förordningens bilaga om utbildning. Systemet får alltså användas, men leverantören måste uppfylla omfattande krav — det är varken förbjudet eller riskfritt."
    },
    {
      question:
        "Vad krävs enligt AI-förordningens transparenskrav av en AI-chattbot på en skolas hemsida?",
      options: [
        "Inget särskilt — chattbottar är helt undantagna från reglerna.",
        "Den måste tydligt informera eleven om att hen chattar med en AI och inte en människa.",
        "Den måste först samla in elevens personnummer innan den får svara på frågor."
      ],
      correctIndex: 1,
      explanation:
        "Enligt artikel 50 ska AI-system som interagerar direkt med människor utformas så att det tydligt framgår att man pratar med en AI, om det inte redan är uppenbart. Det gäller till exempel skol-chattbottar och AI-handledare."
    }
  ],

  "quiz-ai-kompetens": [
    {
      question:
        "Vem riktar sig artikel 4 (\"AI-kompetens\") i AI-förordningen egentligen till?",
      options: [
        "Varje enskild elev, som är juridiskt skyldig att själv skaffa sig en tillräcklig nivå av AI-kompetens.",
        "Leverantörer och tillhandahållare av AI-system — till exempel skolans huvudman eller företaget bakom ett AI-verktyg.",
        "Bara EU-kommissionen internt, ingen annan berörs av kravet."
      ],
      correctIndex: 1,
      explanation:
        "Detta är en av de viktigaste juridiska nyanserna på hela sidan: artikel 4 lägger en organisatorisk skyldighet på leverantörer och tillhandahållare (t.ex. skolan) att vidta åtgärder för AI-kompetens — inte en individuell juridisk plikt för dig som elev. Du kan inte bryta mot artikel 4 genom att \"kunna för lite\" om AI."
    },
    {
      question:
        "Vad innebär det i praktiken att skolan räknas som \"tillhandahållare\" av ett AI-verktyg ni använder i undervisningen?",
      options: [
        "Att skolan/huvudmannen har ansvar att vidta åtgärder så att personal och elever får en rimlig nivå av AI-kompetens utifrån sammanhanget.",
        "Att du som elev personligen kan hållas juridiskt ansvarig om du inte förstår hur AI-modellen fungerar tekniskt.",
        "Att ansvaret automatiskt flyttas över helt till eleven så fort skolan köpt in verktyget."
      ],
      correctIndex: 0,
      explanation:
        "Ansvaret att \"vidta åtgärder\" — till exempel utbildning, riktlinjer och information — ligger på skolan/huvudmannen som organisation, anpassat efter vilka som ska använda systemet (t.ex. elever i en viss ålder). Det är aldrig en individuell skyldighet som läggs på en enskild elev."
    },
    {
      question: "Vad är AILit-ramverket?",
      options: [
        "En svensk lag som ersätter EU:s AI-förordning i skolan.",
        "Ett gemensamt initiativ mellan EU-kommissionen och OECD för AI-kompetens i grund- och gymnasieskolan, uppbyggt kring fyra kompetensområden.",
        "Ett certifikat som elever måste klara för att få lov att använda AI-verktyg i skolan."
      ],
      correctIndex: 1,
      explanation:
        "AILit (\"Empowering Learners for the Age of AI\") är ett ramverk framtaget av EU-kommissionen och OECD tillsammans, med fyra kompetensområden: Engage with AI, Create with AI, Manage AI och Shape AI. Det är ett pedagogiskt stödmaterial, inte ett lagkrav eller ett prov du behöver klara."
    },
    {
      question:
        "Ett AI-detekteringsverktyg \"flaggar\" din inlämnade text som AI-skriven, trots att du skrev den själv. Vad är sant enligt Skolverket?",
      options: [
        "Verktyget har med säkerhet alltid rätt, eftersom det är specialbyggt för att upptäcka AI-text.",
        "Det finns ingen tillförlitlig metod för att avgöra om en text är AI-skriven — flaggningen bör därför aldrig vara det enda bedömningsunderlaget.",
        "Flaggningen är juridiskt bindande bevis som skolan är skyldig att agera på direkt."
      ],
      correctIndex: 1,
      explanation:
        "Skolverket avråder uttryckligen från att använda AI-detekteringsverktyg som enda bedömningsgrund, eftersom de kan ge falska utslag även på en elevs helt egenskrivna text. En flaggning bör alltid följas upp på annat sätt, till exempel ett samtal."
    }
  ],

  "quiz-ai-i-skolan": [
    {
      question:
        "Du skriver om ett AI-genererat svar med dina egna ord innan du lämnar in det. Gör det innehållet till \"ditt eget\"?",
      options: [
        "Ja — om orden är dina egna räknas det aldrig som fusk, oavsett vad AI:n bidrog med.",
        "Inte nödvändigtvis. Om tanke- och analysarbetet gjordes av AI:n är det fortfarande inte ditt eget arbete, även om orden är omskrivna.",
        "Nej, all kontakt med AI räknas alltid som fusk oavsett hur du använder den."
      ],
      correctIndex: 1,
      explanation:
        "Det är en av de vanligaste gränsdragningsmissuppfattningarna. Vad uppgiften faktiskt ska pröva avgör var gränsen går: om AI:n gjort disposition, argument eller analys åt dig, är det fortfarande AI:ns tankearbete även efter en omskrivning. Samtidigt är inte all AI-kontakt per automatik fusk — att diskutera en idé med AI:n, likt att diskutera med en kompis, är ofta okej."
    },
    {
      question:
        "Du får ett detaljerat, självsäkert AI-svar om en historisk händelse som du vill använda i ett hemtal. Vad är klokast?",
      options: [
        "Lita på svaret direkt — ju mer detaljerat det är, desto mer sant är det troligen.",
        "Snabbt kontrollera centrala uppgifter (årtal, namn) mot en oberoende källa, till exempel kursboken, innan du använder dem.",
        "Strunta i AI:n helt och alltid — den ska aldrig användas i skolarbete som rör fakta."
      ],
      correctIndex: 1,
      explanation:
        "Detaljrikedom och säkert tonfall säger ingenting om huruvida ett AI-svar faktiskt stämmer. En snabb koll mot en oberoende källa tar ofta under en minut. AI kan vara en bra startpunkt för research så länge det som faktiskt hamnar i det du lämnar in — särskilt namn, årtal och citat — är dubbelkollat."
    },
    {
      question:
        "En AI-genererad bild sprids i sociala medier och ser ut som ett äkta nyhetsfoto, utan någon märkning om att den är AI-skapad. Vad gäller enligt AI-förordningen?",
      options: [
        "Inget särskilt — bilder är helt undantagna från förordningens regler.",
        "AI-genererat bild-, ljud- och videoinnehåll ska märkas som artificiellt skapat, särskilt när det kan uppfattas som äkta (t.ex. en deepfake).",
        "Det är bara reglerat om bilden föreställer en namngiven, känd person."
      ],
      correctIndex: 1,
      explanation:
        "Enligt förordningens transparenskrav ska AI-genererat innehåll märkas i maskinläsbart format som konstgjort, och den som visar upp innehåll som kan uppfattas som en äkta bild/video av verkliga personer, platser eller händelser måste informera om att det är artificiellt skapat — oavsett om personen är känd eller inte."
    },
    {
      question:
        "Du chattar med en AI-\"kompis\"-app om något personligt. Vad är rimligt att komma ihåg?",
      options: [
        "Det du skriver är alltid helt privat, ungefär som en dagbok som ingen annan någonsin läser.",
        "Det du skriver kan lagras, användas för att träna vidare AI-modeller eller läsas av företaget bakom appen.",
        "Företag får aldrig spara något av det du skriver till en chattbot, oavsett app."
      ],
      correctIndex: 1,
      explanation:
        "Det är lätt att glömma att inputen till en chattbot inte fungerar som en privat dagbok — den kan lagras, användas för träning av modeller eller i vissa fall läsas av personer på företaget bakom tjänsten. Detta gäller särskilt känsliga ämnen som mående eller relationer."
    }
  ]
};

/* ---------------------------------------------------------------------- */
/* RISK_SORTER_DATA                                                       */
/* 12 exempel från research/elevperspektiv.md avsnitt 4, dubbelkollade    */
/* mot research/juridik.md avsnitt 2 för juridisk korrekthet.             */
/* risk: "unacceptable" | "high" | "limited" | "minimal"                  */
/* ---------------------------------------------------------------------- */

const RISK_SORTER_DATA = [
  {
    id: "risk-1",
    text:
      "Ett system i skolan som scannar elevers ansiktsuttryck under lektionstid för att avgöra vilka som \"verkar oengagerade\".",
    risk: "unacceptable",
    explanation:
      "Oacceptabel risk. Känsloigenkänning i skola och arbetsliv är förbjuden enligt artikel 5, med undantag bara för medicinska eller säkerhetsskäl."
  },
  {
    id: "risk-2",
    text:
      "Övervakningskameror i skolkorridoren som i realtid pekar ut och identifierar enskilda elever bland folkmassan.",
    risk: "unacceptable",
    explanation:
      "Oacceptabel risk. Realtids biometrisk fjärridentifiering av personer på allmän/gemensam plats hör till de praktiker som är helt förbjudna."
  },
  {
    id: "risk-3",
    text:
      "Ett AI-system som automatiskt sätter slutbetyg på nationella prov utan att en lärare kan granska eller ändra resultatet.",
    risk: "high",
    explanation:
      "Hög risk. AI som används för bedömning och betygssättning i utbildning är tillåtet, men leverantören måste uppfylla stränga krav — bland annat ska det finnas möjlighet till mänsklig tillsyn."
  },
  {
    id: "risk-4",
    text:
      "Ett digitalt provverktyg som via webbkameran analyserar ögonrörelser för att flagga möjligt fusk under högskoleprovet.",
    risk: "high",
    explanation:
      "Hög risk. Provövervakning (\"AI-proctoring\") nämns explicit som en högriskanvändning i förordningens bilaga om utbildning."
  },
  {
    id: "risk-5",
    text:
      "Ett rekryteringsverktyg som automatiskt sorterar bort sommarjobbsansökningar utifrån AI:ns bedömning av CV:t.",
    risk: "high",
    explanation:
      "Hög risk. AI-system som används i anställningsbeslut, t.ex. för att sortera bort ansökningar, klassas som högrisk eftersom det kan påverka någons möjligheter i arbetslivet."
  },
  {
    id: "risk-6",
    text:
      "En kundtjänst-chattbot på ett klädföretags hemsida som svarar på frågor om leverans och returer.",
    risk: "limited",
    explanation:
      "Begränsad risk (transparenskrav). Chattboten är inte förbjuden och har inga särskilda tekniska högriskkrav, men måste tydligt tala om att den är en AI och inte en människa."
  },
  {
    id: "risk-7",
    text:
      "En AI-genererad bild som ser ut som ett riktigt nyhetsfoto och sprids i sociala medier utan någon märkning om att den är AI-skapad.",
    risk: "limited",
    explanation:
      "Begränsad risk (transparenskrav). AI-genererat bildmaterial som kan uppfattas som äkta ska märkas som konstgjort — det är själva avsaknaden av märkning som gör exemplet problematiskt, inte bilden i sig."
  },
  {
    id: "risk-8",
    text:
      "Svårighetsgraden i ett dataspel som automatiskt anpassas efter hur bra du spelar.",
    risk: "minimal",
    explanation:
      "Minimal risk. Ett vanligt exempel på AI utan några särskilda krav i förordningen — jämförbart med andra vardagliga anpassningsfunktioner."
  },
  {
    id: "risk-9",
    text: "Ett spamfilter i din mejlapp som sorterar bort skräppost.",
    risk: "minimal",
    explanation:
      "Minimal risk. Den stora massan av AI-system, som spamfilter och stavningskontroll, ligger på denna nivå — inga särskilda lagkrav."
  },
  {
    id: "risk-10",
    text:
      "En låtrekommendation i Spotify baserad på vad du lyssnat på tidigare.",
    risk: "minimal",
    explanation:
      "Minimal risk. En rekommendationsfunktion utan koppling till t.ex. betyg, antagning eller biometri hamnar på den lägsta risknivån."
  },
  {
    id: "risk-11",
    text:
      "En app som påstår sig kunna avgöra din sexuella läggning eller politiska åsikt genom att scanna ditt ansikte.",
    risk: "unacceptable",
    explanation:
      "Oacceptabel risk. Biometrisk kategorisering som drar slutsatser om känsliga personliga egenskaper hör till de praktiker som är helt förbjudna enligt förordningen."
  },
  {
    id: "risk-12",
    text:
      "Ett övningsverktyg i matte som ger dig extra uppgifter anpassade efter vad du har svårt för.",
    risk: "minimal",
    explanation:
      "Minimal risk, så länge verktyget bara anpassar övningsuppgifter och inte används för formella betygs- eller antagningsbeslut — då skulle bedömningen istället hamna i högriskkategorin."
  }
];

/* ---------------------------------------------------------------------- */
/* SCENARIO_DATA                                                          */
/* 5 fullständiga scenarier från research/elevperspektiv.md avsnitt 3.    */
/* bestIndex är 0-baserat index i choices som pekar ut "Bästa svar".      */
/* ---------------------------------------------------------------------- */

const SCENARIO_DATA = [
  {
    id: "scenario-1",
    title: "Scenario 1: Bilden i grupparbetet",
    prompt:
      "Du och din grupp ska göra en presentation om hållbar stadsplanering i SO. En kompis i gruppen har genererat en snygg bild av en \"framtidsstad\" med ett AI-verktyg och lagt in den i presentationen utan att nämna att den är AI-genererad. Ni ska redovisa imorgon och ni har inte pratat om det innan.",
    choices: [
      { label: "A", text: "Säger inget — bilden ser bra ut och ingen kommer fråga." },
      {
        label: "B",
        text:
          "Föreslår att ni lägger till en liten källtext under bilden: \"Bild skapad med AI\"."
      },
      {
        label: "C",
        text: "Tar bort bilden helt för säkerhets skull och ersätter den med en egen skiss."
      }
    ],
    bestIndex: 1,
    explanation:
      "Bästa svar: B. Att markera att en bild är AI-genererad är varken pinsamt eller ett erkännande av fusk — det är helt enkelt korrekt källhantering, precis som att ange varifrån en bild eller ett citat kommer. Läraren kan då bedöma innehållet (idén, analysen, texten) på rätt grunder. Att dölja det (A) riskerar att uppfattas som vilseledande om det upptäcks, medan C är en överreaktion — AI-genererat material är inte förbjudet i sig, det ska bara vara transparent vem/vad som gjort vad."
  },
  {
    id: "scenario-2",
    title: "Scenario 2: Den övertygande historiska \"faktan\"",
    prompt:
      "Du skriver ett hemtal i historia och frågar en AI-chattbot om en detalj kring ett historiskt skeende. Svaret är utförligt och självsäkert, med exakta årtal och namn. Du kollar inte upp det utan klistrar in det direkt i talet, eftersom det lät korrekt och du har ont om tid.",
    choices: [
      {
        label: "A",
        text: "Litar på svaret eftersom det var så detaljerat och säkert formulerat."
      },
      {
        label: "B",
        text:
          "Snabbsöker en av uppgifterna (t.ex. ett årtal) i en annan källa (kursboken, en etablerad webbplats) innan du använder den."
      },
      { label: "C", text: "Struntar i AI:n helt och bara använder kursboken, för att vara på den säkra sidan." }
    ],
    bestIndex: 1,
    explanation:
      "Bästa svar: B. Detaljrikedom och säkert tonfall säger ingenting om huruvida informationen stämmer — det är en av de mest missvisande signalerna med AI-svar. En snabb koll mot en oberoende källa tar ofta under en minut och gör stor skillnad. C är inte fel, men är onödigt begränsande: AI kan vara en bra startpunkt för research så länge man dubbelkollar det som faktiskt används i det du lämnar in, särskilt namn, årtal och citat."
  },
  {
    id: "scenario-3",
    title: "Scenario 3: Videon som sprids i klassgruppen",
    prompt:
      "En video dyker upp i din klass gruppchatt där en klasskompis verkar säga och göra något pinsamt/kontroversiellt. Något känns lite \"off\" med rösten och rörelserna, men de flesta i chatten verkar ta den för äkta och kommenterar och skickar vidare.",
    choices: [
      { label: "A", text: "Skickar vidare den till fler eftersom \"alla andra redan sett den\"." },
      {
        label: "B",
        text:
          "Skriver i gruppchatten att den känns misstänkt och att ni borde vänta med att sprida den innan ni vet mer, och hör direkt med personen det gäller (eller en vuxen) om den stämmer."
      },
      { label: "C", text: "Raderar tyst konversationen och låtsas att du inte sett den." }
    ],
    bestIndex: 1,
    explanation:
      "Bästa svar: B. Att pausa spridningen och kolla med källan (personen själv, eller en lärare/vuxen om det är känsligt) är det som faktiskt begränsar skadan — en deepfake sprids snabbast under de första timmarna. A förvärrar skadan även om avsikten bara är \"skoj\". C skyddar dig själv men gör inget för klasskompisen som videon handlar om. Poängen är inte att alla ska bli experter på att upptäcka deepfakes (det blir svårare för varje år), utan att bygga en reflex: konstigt + snabb spridning = pausa och verifiera innan du delar."
  },
  {
    id: "scenario-4",
    title: "Scenario 4: AI-hjälpen i svenskuppsatsen",
    prompt:
      "Du skriver en novell i svenska och har kört fast. Du ber en AI om förslag på hur handlingen kan fortsätta, och den ger dig tre färdiga styckentexter som faktiskt är riktigt bra. Inlämningen är imorgon.",
    choices: [
      { label: "A", text: "Klistrar in det bästa AI-förslaget rakt av och lämnar in det som din novell." },
      {
        label: "B",
        text:
          "Använder AI-förslaget som inspiration för vad som kan hända i handlingen, men skriver själv texten och den språkliga stilen."
      },
      { label: "C", text: "Struntar i AI:n helt eftersom \"det räknas ändå som fusk oavsett hur jag gör\"." }
    ],
    bestIndex: 1,
    explanation:
      "Bästa svar: B. Uppgiften i svenska prövar rimligen din egen förmåga att skriva — disposition, språk, röst. Att låta AI:n ge idéer till vad som händer men själv göra skrivarbetet är jämförbart med att diskutera en idé med en kompis eller läsa inspirationstexter, vilket normalt är tillåtet. A är tydligt problematiskt eftersom det AI:n bedömer (skrivförmågan) ersätts helt. C bygger på missuppfattningen att all AI-kontakt är förbjuden — verktyget i sig är inte problemet, det är vad uppgiften ska mäta som avgör var gränsen går. Är du osäker: fråga läraren specifikt vad som gäller för just den uppgiften."
  },
  {
    id: "scenario-5",
    title: "Scenario 5: Ansiktsigenkänningen vid det digitala provet",
    prompt:
      "Skolan inför ett nytt digitalt provsystem där en AI via webbkameran ska övervaka ögonrörelser och ansiktsuttryck under nationella prov, för att upptäcka fusk. Du känner dig obekväm med att bli filmad och analyserad på det sättet, men vet inte om du får säga något.",
    choices: [
      { label: "A", text: "Struntar i obehaget och genomför provet som vanligt utan att fråga något." },
      {
        label: "B",
        text:
          "Frågar läraren/rektorn vad systemet faktiskt registrerar, varför det används, och om det finns ett alternativ."
      },
      { label: "C", text: "Vägrar genomföra provet på plats utan förklaring." }
    ],
    bestIndex: 1,
    explanation:
      "Bästa svar: B. Att fråga är inte att vara besvärlig — enligt AI-förordningen räknas biometrisk övervakning och känsloigenkänning av elever som extra känsligt, och skolor har ett ansvar att kunna förklara vad ett sådant system gör, vilken data det sparar och varför det behövs. Att bara köra på (A) innebär att du avstår din rätt att förstå vad som händer med dina uppgifter. C riskerar att eskalera onödigt innan du ens vet vad systemet faktiskt gör — informationen du får genom att fråga avgör om invändningen är befogad och hur du bäst driver den vidare (t.ex. via elevråd eller vårdnadshavare)."
  }
];

/* ---------------------------------------------------------------------- */
/* FACTCHECK_DATA                                                         */
/* 4 exempel från research/elevperspektiv.md avsnitt 5.                   */
/* correctVerdict: "stämmer" | "stämmer-inte" | "delvis-missvisande"      */
/* ---------------------------------------------------------------------- */

const FACTCHECK_DATA = [
  {
    id: "factcheck-1",
    claim:
      "\"Sveriges riksdag har 391 ledamöter, vilket gör den till Europas största nationella parlament.\"",
    correctVerdict: "stämmer-inte",
    verdictLabel: "Stämmer inte",
    explanation:
      "Fel på båda punkterna. Riksdagen har 349 ledamöter, och den är inte Europas största nationella parlament (t.ex. brittiska underhuset och tyska förbundsdagen är större). Typ av fel: en ren hallucination — ett påhittat, exakt och självsäkert formulerat sakfel som är lätt att tro på just för att det låter så precist."
  },
  {
    id: "factcheck-2",
    claim:
      "\"Enligt en studie från Karolinska Institutet (2019) tittar tonåringar i genomsnitt 9 timmar om dagen på mobilen, vilket är dubbelt så mycket som vuxna.\"",
    correctVerdict: "stämmer-inte",
    verdictLabel: "Stämmer inte",
    explanation:
      "Det finns ingen sådan specifik, verifierbar studie med det påståendet från Karolinska Institutet. AI-modeller \"uppfinner\" ofta trovärdigt klingande källor (rätt lärosäte, rimligt årtal) för att en siffra ska kännas trovärdig. Typ av fel: en fabricerad källhänvisning — ett av de vanligaste och farligaste AI-felen eftersom det ser ut som god källhantering men inte går att spåra."
  },
  {
    id: "factcheck-3",
    claim:
      "\"Demokratin uppfanns av grekerna i Aten, som skapade världens första demokrati där alla fick rösta.\"",
    correctVerdict: "delvis-missvisande",
    verdictLabel: "Delvis missvisande",
    explanation:
      "En missvisande förenkling. I antikens Aten fick bara fria, vuxna, manliga medborgare rösta — kvinnor, slavar och utrikes födda uteslöts helt. Dessutom fanns andra former av kollektivt beslutsfattande i andra delar av världen som sällan nämns i denna typ av västcentrerade standardsvar. Typ av fel: kulturell/historisk bias — inte direkt \"fel\" i strikt mening, men en vinklad sanning som osynliggör viktiga nyanser."
  },
  {
    id: "factcheck-4",
    claim:
      "\"Att dricka kallt vatten bränner fler kalorier än man får i sig, så det är ett effektivt sätt att gå ner i vikt.\"",
    correctVerdict: "stämmer-inte",
    verdictLabel: "Stämmer inte",
    explanation:
      "En spridd hälsomyt. Kroppen förbrukar en försumbart liten mängd extra energi för att värma upp kallt vatten — långt mindre än vad som antyds, och absolut inte mer än kalorierna i vattnet (som är noll). Typ av fel: en spridd myt som AI:n återger okritiskt och tvärsäkert eftersom den förekommer ofta i träningsdatan — ett bra exempel på att \"vanligt förekommande på nätet\" inte är samma sak som \"sant\"."
  }
];
