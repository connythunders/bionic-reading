# Så här testar du Quiz-appen lokalt

## Steg 1: Klona och checka ut din branch

```bash
# Klona repository (om du inte redan har det)
git clone https://github.com/connythunders/super-broccoli.git
cd super-broccoli

# Checka ut den nya branch:en
git checkout claude/build-from-image-deUKq

# Eller pull om du redan har det lokalt
git pull origin claude/build-from-image-deUKq
```

## Steg 2: Testa frontend direkt (SNABBAST)

**Alternativ A - Öppna direkt i webbläsare:**
Dubbelklicka på någon av dessa filer i Utforskaren/Finder:
- `index.html`
- `adaptivt-prov.html`
- `quiz-standalone.html`

**Alternativ B - Med Python:**
```bash
# I projektkatalogen
python3 -m http.server 8080

# Öppna sedan: http://localhost:8080
```

**Alternativ C - Med Node.js:**
```bash
npx http-server -p 8080

# Öppna sedan: http://localhost:8080
```

## Steg 3: Testa full Docker-setup (med backend & databas)

**Förutsättningar:**
- Docker Desktop installerat ([Ladda ner här](https://www.docker.com/products/docker-desktop/))

**Kör:**
```bash
# Starta alla tjänster (PostgreSQL, Node.js, NGINX)
docker-compose up -d

# Vänta några sekunder, kontrollera sedan att alla körs
docker-compose ps

# Visa loggar
docker-compose logs -f
```

**Åtkomst:**
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- Database: localhost:5432

**Stoppa:**
```bash
docker-compose down
```

## Felsökning

**Port redan i bruk?**
```bash
# Windows
netstat -ano | findstr :8080

# Mac/Linux
lsof -i :8080
```

Byt port i `docker-compose.yml` om nödvändigt:
```yaml
nginx:
  ports:
    - "9090:80"  # Använd port 9090 istället
```

**Docker fungerar inte?**
Testa utan Docker först - öppna bara HTML-filerna direkt!
