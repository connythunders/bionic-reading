# Underlag till IT: AI-funktioner i undervisningen via vårt Microsoft-avtal

## Bakgrund
Jag har byggt ett antal webbaserade övningsverktyg som eleverna använder (till exempel UF-idémentor, NP-träning i engelska och matematik, samhällskunskap och en samtalsträning i engelska). Verktygen använder AI för att ge återkoppling på det eleverna skriver eller säger.

I dag anropar verktygen externa AI-tjänster (Anthropic och Google) med privata API-nycklar. Skolan har inget personuppgiftsbiträdesavtal med dem, och datan behandlas i USA. Jag vill i stället använda en tjänst som skolan redan har avtal med, och som helst behandlar data i EU.

Se även `GDPR-KARTLAGGNING.md` i repot (kartläggning av alla sidor och risknivåer).

## Vad som skickas
- Endast **text** som eleven skrivit eller som webbläsaren omvandlat från tal (inget ljud skickas till AI-tjänsten i dag).
- Inget konto krävs och ingen databas används. Appen sparar ingenting på servern. Samtalet ligger bara i elevens webbläsare.
- Texten maskeras för personnummer, e-post och mobilnummer innan den skickas, och eleverna varnas för att skriva personuppgifter.

## Det jag behöver från er
1. **Besked om Azure:** Har vi en Azure-prenumeration (eller kan vi få en) inom vårt Microsoft-avtal? Microsoft 365 räcker inte för API-åtkomst.
2. **Region:** En Azure OpenAI-/Foundry-resurs i EU, helst Sverige eller annan EU-region. Vilka modeller finns i regionen?
3. **Modell:** En chattmodell som klarar svenska och engelska och kan returnera strukturerat svar (JSON). Jag behöver endpoint, deployment-namn och nyckel (eller en hanterad identitet) som servern kan använda.
4. **Dataskydd i Azure:** Kan lagring av indata/utdata stängas av eller begränsas (till exempel undantag från missbruksövervakning) och hur länge sparas data annars? Vilka underbiträden används?
5. **Avtal:** Bekräfta att Microsofts DPA och produktvillkor gäller för tjänsten, och vem som ansvarar för att det dokumenteras i skolans register.
6. **Kostnad och gränser:** Kostnadstak, kvoter och varningar, så att en delad nyckel inte kan generera oväntade kostnader eller missbrukas.
7. **Inloggning:** Behöver tjänsten ligga bakom skolkonto (Entra ID), eller är anonym åtkomst med dagsgränser acceptabel?
8. **Hosting:** Får verktygens server (en liten proxy) ligga hos Microsoft (till exempel Azure Static Web Apps eller App Service) i stället för Vercel? Vilken region?
9. **Tal (senare steg):** Azure AI Speech för svenska och engelska, inklusive uttalsbedömning, skulle ersätta webbläsarens taligenkänning (som i dag skickar ljud till Google eller Microsoft) och den externa uppläsningstjänsten ElevenLabs.

## Uppskattad användning
Antal elever: [fyll i]. Typisk användning: [fyll i, t.ex. 10–20 korta samtal per elev och månad]. Perioder med mycket användning: [t.ex. före nationella prov].

## Vad jag gör på min sida
- Bygger en gemensam proxy som håller nyckeln på servern, maskerar texten, begränsar användningen och skickar anropet vidare till Azure. Inga nycklar ska ligga i webbläsaren.
- Flyttar över verktygen ett i taget, de känsligaste först.
- Skriver utkast till behandlingsbeskrivning och integritetsinformation till eleverna.

## Frågor till dataskyddsombudet
- Vilken rättslig grund och vilken information till elever och vårdnadshavare krävs?
- Behövs en konsekvensbedömning (DPIA)?
- Finns det användningsområden som inte ska få använda AI (till exempel elevhälsa och ärenden om enskilda elever)?
