const onboardingData = {
  kommun: "[KOMMUN]",
  sections: [
    {
      id: "valkommen",
      icon: "👋",
      title: "Välkommen till hemtjänsten",
      summary: "Din första vecka och vad du kan förvänta dig.",
      content: `
        <p>Välkommen som ny medarbetare hos oss i [KOMMUN]s hemtjänst! Du har valt ett av samhällets viktigaste yrken. Det du gör varje dag gör skillnad för människor som behöver stöd för att leva ett tryggt och självständigt liv i sitt eget hem.</p>
        <p>De första veckorna kommer du att gå bredvid en erfaren kollega. Du förväntas inte kunna allt direkt – fråga mycket, ofta och tidigt. Det finns inga dumma frågor.</p>
        <h3>Din första dag</h3>
        <ul>
          <li>Du träffar din enhetschef och får en rundtur i lokalerna</li>
          <li>Du får ditt passerkort, arbetskläder och inloggning till våra system</li>
          <li>Du följer med en kollega ut på rutten för att lära känna brukare och rutiner</li>
        </ul>
      `,
      checklist: [
        { id: "v1", text: "Jag har träffat min enhetschef" },
        { id: "v2", text: "Jag har fått passerkort och arbetskläder" },
        { id: "v3", text: "Jag har fått inloggningsuppgifter till alla system" },
        { id: "v4", text: "Jag vet var jag ska börja min första arbetsdag" },
        { id: "v5", text: "Jag har fått en kontaktperson/handledare" }
      ]
    },
    {
      id: "schema",
      icon: "📅",
      title: "Schema, tidrapportering och frånvaro",
      summary: "Hur arbetstiden fungerar i praktiken.",
      content: `
        <p>Du arbetar enligt ett rullande schema som publiceras i förväg. Schemat finns i [SCHEMASYSTEM, t.ex. Medvind eller Time Care Pool].</p>
        <h3>Arbetstider</h3>
        <p>Hemtjänsten har verksamhet dygnet runt. Du jobbar enligt avtal – vanligast är dag- och kvällspass, ibland helger. Tider för rast och kortare paus framgår av schemat.</p>
        <h3>Sjukanmälan</h3>
        <p>Ring din enhetschef <strong>[TELEFON]</strong> <strong>före kl. 06.30</strong> vid morgonpass, eller senast 2 timmar innan pass börjar vid andra tider. Sms eller mejl räcker inte – ring. Är chefen inte tillgänglig, ring [VIKARIESAMORDNARE/TELEFON].</p>
        <h3>Vård av barn (VAB)</h3>
        <p>Anmäl till Försäkringskassan samma dag och meddela din chef.</p>
        <h3>Byta pass</h3>
        <p>Byten mellan kollegor måste godkännas av chef i förväg.</p>
      `,
      checklist: [
        { id: "s1", text: "Jag vet hur jag loggar in i schemasystemet" },
        { id: "s2", text: "Jag vet vem jag ska ringa vid sjukdom och vilket nummer" },
        { id: "s3", text: "Jag vet före vilken tid jag måste sjukanmäla mig" },
        { id: "s4", text: "Jag vet hur jag rapporterar arbetad tid" },
        { id: "s5", text: "Jag vet hur jag ansöker om semester och ledighet" }
      ]
    },
    {
      id: "nycklar",
      icon: "🔑",
      title: "Nycklar, larm och trygghet i hemmet",
      summary: "Hur du hanterar nycklar och larm hos brukare.",
      content: `
        <p>Du kommer att hantera nycklar till brukarnas hem. Det är ett stort ansvar – <strong>nycklar får aldrig märkas med namn eller adress.</strong></p>
        <h3>Nyckelhantering</h3>
        <ul>
          <li>Hämta och lämna nycklar i nyckelskåpet vid varje arbetspass</li>
          <li>Kvittera nycklar i [SYSTEM, t.ex. Phoniro Care/digital nyckelhantering]</li>
          <li>Bär nycklar i en säkrad ficka eller nyckelband under hela passet</li>
          <li>Tappar du en nyckel: kontakta chef <strong>omedelbart</strong>, oavsett tid på dygnet</li>
        </ul>
        <h3>Digitala lås</h3>
        <p>Många brukare har idag digitala lås som öppnas via mobilen. Du loggar in i appen och får tillgång enbart under den tid besöket är schemalagt.</p>
        <h3>Trygghetslarm</h3>
        <p>Om brukaren har trygghetslarm – kontrollera att det fungerar och sitter rätt vid varje besök. Vid utlöst larm: åk dit, ring 112 vid behov, dokumentera händelsen.</p>
        <h3>Brand och säkerhet i hemmet</h3>
        <ul>
          <li>Kolla att spisen är avstängd när du lämnar</li>
          <li>Notera om brandvarnare saknas eller piper svagt → rapportera</li>
          <li>Lämna aldrig ytterdörren olåst om brukaren inte uttryckligen ska få besök</li>
        </ul>
      `,
      checklist: [
        { id: "n1", text: "Jag vet hur jag hämtar och lämnar nycklar" },
        { id: "n2", text: "Jag vet hur jag kvitterar nycklar i systemet" },
        { id: "n3", text: "Jag vet vad jag gör om en nyckel försvinner" },
        { id: "n4", text: "Jag har fått instruktion i digitala lås (om vi använder det)" },
        { id: "n5", text: "Jag vet hur jag agerar vid utlöst trygghetslarm" }
      ]
    },
    {
      id: "mobil",
      icon: "📱",
      title: "Mobilen, appen och dokumentation",
      summary: "Verktygen du använder varje dag.",
      content: `
        <p>Du får en tjänstemobil med appar för planering, dokumentation och kommunikation.</p>
        <h3>Verksamhetssystem</h3>
        <p>I appen (t.ex. Lifecare, Procapita eller Combine) kan du:</p>
        <ul>
          <li>Se dagens schema och vilka insatser som ska göras hos varje brukare</li>
          <li>Kvittera att besöket är utfört</li>
          <li>Skriva social dokumentation (genomförandejournal)</li>
        </ul>
        <h3>Social dokumentation – grunderna</h3>
        <p>Du dokumenterar enligt <strong>Socialtjänstlagen (SoL)</strong>. Det betyder:</p>
        <ul>
          <li>Skriv vad du har gjort, inte vad du tycker</li>
          <li>Skriv kort, sakligt och i kronologisk ordning</li>
          <li>Använd respektfullt språk – brukaren har rätt att läsa det du skriver</li>
          <li>Avvikelser från planeringen ska alltid dokumenteras</li>
        </ul>
        <h3>Exempel på bra dokumentation</h3>
        <blockquote>"Stöd vid morgonhygien. Brukaren önskade duscha själv idag och klarade det med tillsyn. Påklädning utfördes med visst stöd. Frukost intogs självständigt."</blockquote>
        <h3>Sekretess</h3>
        <p>Du har <strong>tystnadsplikt</strong> enligt lag (Offentlighets- och sekretesslagen). Du får inte prata om brukare med vänner, familj, andra brukare eller på sociala medier – inte ens utan att nämna namn. Det här gäller även efter att du slutat din anställning.</p>
      `,
      checklist: [
        { id: "m1", text: "Jag har fått min tjänstemobil och kan logga in" },
        { id: "m2", text: "Jag vet hur jag ser dagens schema i appen" },
        { id: "m3", text: "Jag vet hur jag kvitterar besök" },
        { id: "m4", text: "Jag har skrivit min första dokumentationsanteckning med handledare" },
        { id: "m5", text: "Jag har skrivit under sekretessförbindelse" }
      ]
    },
    {
      id: "transport",
      icon: "🚗",
      title: "Transport, arbetskläder och utrustning",
      summary: "Bil, cykel, kläder och praktiska saker.",
      content: `
        <p>Mellan brukare tar du dig oftast med tjänstebil, tjänstecykel eller till fots beroende på område. Tjänstebilar bokas via [SYSTEM] och tankas på [STATION] med tankkort.</p>
        <h3>Vid trafikolycka eller skada på tjänstebil</h3>
        <ol>
          <li>Säkra platsen och se till att ingen är skadad</li>
          <li>Ring 112 om personskada</li>
          <li>Ring chef</li>
          <li>Fyll i skadeanmälan i bilen</li>
        </ol>
        <h3>Arbetskläder</h3>
        <p>Du får arbetskläder kostnadsfritt – byxor, t-shirts/pikéer, jacka och regnkläder. Kläderna tvättas på arbetsplatsen, inte hemma (smittskydd).</p>
        <p><strong>Skor</strong> köper du själv men ska vara hela, rena och med halksäker sula. Inga sandaler eller öppna skor.</p>
        <h3>Personlig utrustning</h3>
        <ul>
          <li>ID-bricka ska bäras synligt under hela arbetspasset</li>
          <li>Inga ringar, klockor eller armband nedanför armbågen (hygien)</li>
          <li>Långt hår uppsatt</li>
          <li>Naglar korta, ingen nagellack eller lösnaglar</li>
        </ul>
      `,
      checklist: [
        { id: "t1", text: "Jag har fått arbetskläder i rätt storlek" },
        { id: "t2", text: "Jag har en ID-bricka och bär den synligt" },
        { id: "t3", text: "Jag vet hur jag bokar och hanterar tjänstebil/cykel" },
        { id: "t4", text: "Jag vet vad jag ska göra vid en trafikolycka" },
        { id: "t5", text: "Jag följer reglerna för hygienisk klädsel" }
      ]
    },
    {
      id: "bemont",
      icon: "🤝",
      title: "Bemötande och värdegrund",
      summary: "Hur vi möter människor i deras eget hem.",
      content: `
        <p>Du arbetar i någon annans hem. Det är inte din arbetsplats på samma sätt som ett kontor – det är <strong>brukarens privata sfär</strong>, och du är gäst där. Det är en av de viktigaste grundprinciperna i vårt arbete.</p>
        <p><strong>Den nationella värdegrunden för äldreomsorg</strong> (Socialtjänstlagen 5 kap. 4 §) säger att äldre ska få leva ett värdigt liv och känna välbefinnande.</p>
        <h3>Självbestämmande</h3>
        <p>Brukaren bestämmer själv – över sin dag, sin mat, sina vanor och sitt liv. Även om du tycker att något borde göras annorlunda, är det inte ditt beslut.</p>
        <h3>Integritet</h3>
        <p>Knacka alltid innan du går in. Hälsa. Berätta vem du är och vad du ska göra. Stäng dörren när brukaren duschar eller går på toaletten – även om du står där bredvid och hjälper till.</p>
        <h3>Delaktighet</h3>
        <p>Fråga hur brukaren vill ha det. "Vilken tröja vill du ha idag?" "Vill du att jag öppnar fönstret?" Små frågor gör stor skillnad.</p>
        <h3>Respekt</h3>
        <p>Använd titlar och namn som brukaren själv föredrar. Prata med brukaren, inte över huvudet på hen, även om anhöriga är där. Skämta inte om brukaren – inte ens på fikarasten.</p>
        <h3>Bemötande vid demens</h3>
        <ul>
          <li>Tala lugnt, en sak i taget</li>
          <li>Argumentera inte emot om brukaren är förvirrad om verkligheten – möt personen där hen är</li>
          <li>Använd kroppsspråk, ögonkontakt och beröring (när det är välkommet)</li>
        </ul>
        <h3>När det är svårt</h3>
        <p>Du kommer möta människor med demens, ångest, sorg och ibland aggressivitet. Du kommer också möta tacksamhet, värme och fantastiska livshistorier. Prata med dina kollegor och din chef – du ska inte bära det ensam.</p>
      `,
      checklist: [
        { id: "b1", text: "Jag har läst om den nationella värdegrunden" },
        { id: "b2", text: "Jag knackar alltid innan jag går in" },
        { id: "b3", text: "Jag presenterar mig vid varje nytt besök" },
        { id: "b4", text: "Jag frågar brukaren hur hen vill ha det" },
        { id: "b5", text: "Jag vet att jag kan prata med min chef när något känns tungt" }
      ]
    },
    {
      id: "hygien",
      icon: "🧴",
      title: "Hygien, ergonomi och smittskydd",
      summary: "Skydda dig själv och brukarna.",
      content: `
        <p><strong>Basala hygienrutiner</strong> är det viktigaste verktyget du har för att förhindra smittspridning. Det gäller alltid, hos alla brukare, vid alla besök.</p>
        <h3>De fem stegen</h3>
        <ol>
          <li><strong>Handdesinfektion</strong> före och efter varje besök, och mellan moment hos samma brukare</li>
          <li><strong>Handskar</strong> vid kontakt med kroppsvätskor, sår eller slemhinnor – byts mellan moment</li>
          <li><strong>Plastförkläde</strong> vid risk för stänk eller nära kroppskontakt (t.ex. dusch, blöjbyte)</li>
          <li><strong>Munskydd</strong> vid förkylningssymtom hos dig eller brukaren, eller enligt rutin</li>
          <li><strong>Rena arbetskläder</strong> varje pass – aldrig samma kläder hem och tillbaka</li>
        </ol>
        <h3>Tvätta händerna med tvål och vatten</h3>
        <ul>
          <li>När händerna är synligt smutsiga</li>
          <li>Efter toalettbesök</li>
          <li>Efter kontakt med magsjuk brukare (handsprit räcker inte mot calici/vinterkräksjuka)</li>
        </ul>
        <h3>Ergonomi – skydda din rygg</h3>
        <ul>
          <li>Använd alltid hjälpmedel som finns: lyftbälte, glidlakan, vridplatta</li>
          <li>Jobba aldrig ensam vid tunga lyft som kräver två – ring kollega</li>
          <li>Höj sängen till arbetshöjd innan du börjar</li>
          <li>Stå nära brukaren, böj knäna, håll ryggen rak</li>
          <li>Anmäl till chef om hjälpmedel saknas eller är trasiga</li>
        </ul>
        <h3>Vid stick- eller skärskada</h3>
        <ol>
          <li>Skölj såret rikligt med vatten</li>
          <li>Desinficera</li>
          <li>Ring chef och företagshälsovården samma dag</li>
        </ol>
      `,
      checklist: [
        { id: "h1", text: "Jag kan de fem stegen i basala hygienrutiner" },
        { id: "h2", text: "Jag vet skillnaden mellan handsprit och handtvätt med tvål" },
        { id: "h3", text: "Jag har fått introduktion i de vanligaste lyfthjälpmedlen" },
        { id: "h4", text: "Jag vet hur jag rapporterar trasiga hjälpmedel" },
        { id: "h5", text: "Jag vet vad jag gör vid stickskada" }
      ]
    },
    {
      id: "kontakt",
      icon: "📞",
      title: "Kontaktpersoner och vem-gör-vad",
      summary: "Vem du ringer när.",
      content: `
        <h3>Din närmaste chef – enhetschef</h3>
        <p>[CHEFENS NAMN]<br>Telefon: [TELEFON]<br>E-post: [E-POST]<br>Träffbar: vardagar [TIDER]</p>
        <h3>Vid sjukanmälan eller akut frånvaro</h3>
        <p>[TELEFONNUMMER FÖR SJUKANMÄLAN]</p>
        <h3>Schemaplanerare / bemanning</h3>
        <p>[NAMN]<br>Telefon: [TELEFON]<br>För: schemafrågor, byten, vikariefrågor</p>
        <h3>Sjuksköterska</h3>
        <p>Telefon: [TELEFON]<br>För: medicinska frågor, sår, mediciner, fallolyckor</p>
        <h3>Arbetsterapeut / fysioterapeut</h3>
        <p>Telefon: [TELEFON]<br>För: hjälpmedel, träning, anpassningar i hemmet</p>
        <h3>Skyddsombud</h3>
        <p>[NAMN]<br>För: arbetsmiljöfrågor, om något känns fel</p>
        <h3>Facklig representant (Kommunal)</h3>
        <p>[NAMN]<br>För: anställningsfrågor, stöd</p>
        <h3>Företagshälsovård</h3>
        <p>Telefon: [TELEFON]<br>För: arbetsrelaterad ohälsa, stickskador, stress</p>
        <h3>IT-support</h3>
        <p>Telefon: [TELEFON]<br>För: problem med mobil, appar, inloggning</p>
        <h3>Vid akut situation hos brukare</h3>
        <ul>
          <li><strong>112</strong> – ambulans/polis/räddningstjänst</li>
          <li><strong>1177</strong> – sjukvårdsrådgivning</li>
          <li>Sjuksköterska i tjänst (kvällar/helger): [TELEFON]</li>
        </ul>
      `,
      checklist: [
        { id: "k1", text: "Jag har sparat min chefs nummer i mobilen" },
        { id: "k2", text: "Jag har sparat numret för sjukanmälan" },
        { id: "k3", text: "Jag vet vem sjuksköterskan i mitt område är" },
        { id: "k4", text: "Jag vet vem som är skyddsombud" },
        { id: "k5", text: "Jag vet vad jag ska göra vid akut situation hos brukare" }
      ]
    }
  ]
};
