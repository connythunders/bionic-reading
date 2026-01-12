# Docker Setup 🐳

Detta dokument beskriver hur du kör quiz-applikationen med Docker.

## Arkitektur

Applikationen består av tre huvudkomponenter:

```
┌─────────────────────────────────────────────┐
│         POSTGRES ROOT NOT HOST              │
├──────────┬─────────────┬────────────────────┤
│   P.O    │   NGINX     │       NODE         │
│  Port    │   Port      │     Port 3000      │
│  5432    │   8080      │                    │
└──────────┴─────────────┴────────────────────┘
│ Database │  Frontend   │     Backend API    │
└──────────┴─────────────┴────────────────────┘
```

### Tjänster

1. **PostgreSQL Database** (`postgres`)
   - Image: `postgres:15-alpine`
   - Port: `5432`
   - Databas: `quizdb`
   - User: `root`
   - Password: `root`
   - Persistent storage med volume

2. **Node.js Backend** (`backend`)
   - Built från `./backend/Dockerfile`
   - Port: `3000`
   - Express REST API
   - Ansluter till PostgreSQL
   - Endpoints:
     - `GET /api/health` - Health check
     - `GET /api/results` - Hämta quiz-resultat
     - `POST /api/results` - Spara quiz-resultat

3. **NGINX Frontend** (`nginx`)
   - Built från `./Dockerfile`
   - Port: `8080` (mappas till intern port 80)
   - Serverar statiska HTML/CSS/JS filer
   - Quiz-gränssnittet

## Snabbstart

### Förutsättningar

- Docker (version 20.10+)
- Docker Compose (version 2.0+)

### Starta alla tjänster

```bash
# Bygg och starta alla containers
docker-compose up -d

# Visa loggar
docker-compose logs -f

# Stoppa alla tjänster
docker-compose down

# Stoppa och ta bort volumes (rensar databasen)
docker-compose down -v
```

### Åtkomst till tjänsterna

När alla containers körs:

- **Frontend (NGINX)**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **PostgreSQL**: `localhost:5432`

## Kommandon

### Bygga om containers

```bash
# Bygga om alla
docker-compose build

# Bygga om specifik tjänst
docker-compose build nginx
docker-compose build backend
```

### Hantera containers

```bash
# Visa körande containers
docker-compose ps

# Stoppa specifik tjänst
docker-compose stop nginx

# Starta specifik tjänst
docker-compose start nginx

# Restart tjänst
docker-compose restart backend
```

### Loggar och debugging

```bash
# Visa loggar för alla tjänster
docker-compose logs

# Visa loggar för specifik tjänst
docker-compose logs nginx
docker-compose logs backend
docker-compose logs postgres

# Följ loggar i realtid
docker-compose logs -f backend

# Visa senaste 100 rader
docker-compose logs --tail=100 backend
```

### Exekvera kommandon i containers

```bash
# Öppna shell i backend container
docker-compose exec backend sh

# Öppna PostgreSQL CLI
docker-compose exec postgres psql -U root -d quizdb

# Kör SQL-frågor direkt
docker-compose exec postgres psql -U root -d quizdb -c "SELECT * FROM quiz_results;"
```

## Databashantering

### Initiera databasen

Databasen initialiseras automatiskt med `init.sql` när containers startas första gången.

### Återställ databasen

```bash
# Stoppa och ta bort volumes
docker-compose down -v

# Starta igen (databas initialiseras på nytt)
docker-compose up -d
```

### Backup av databasen

```bash
# Skapa backup
docker-compose exec postgres pg_dump -U root quizdb > backup.sql

# Återställ från backup
docker-compose exec -T postgres psql -U root quizdb < backup.sql
```

## Utveckling

### Modifiera backend

1. Gör ändringar i `backend/server.js` eller andra filer
2. Bygga om backend container:
   ```bash
   docker-compose build backend
   docker-compose up -d backend
   ```

### Modifiera frontend

1. Gör ändringar i HTML/CSS/JS filer
2. Bygga om NGINX container:
   ```bash
   docker-compose build nginx
   docker-compose up -d nginx
   ```

### Hot reload (utvecklingsläge)

För att aktivera hot reload för backend, ändra i `docker-compose.yml`:

```yaml
backend:
  # ... andra inställningar
  volumes:
    - ./backend:/app
    - /app/node_modules
  command: npm run dev  # Använder nodemon
```

## Felsökning

### Container startar inte

```bash
# Kontrollera status
docker-compose ps

# Visa detaljerade loggar
docker-compose logs <service_name>
```

### Databasanslutning misslyckas

1. Kontrollera att postgres container körs:
   ```bash
   docker-compose ps postgres
   ```

2. Testa anslutning:
   ```bash
   docker-compose exec postgres pg_isready -U root
   ```

3. Kontrollera miljövariabler i backend:
   ```bash
   docker-compose exec backend env | grep DB_
   ```

### Port redan i bruk

Om du får felmeddelande om att port redan används:

```bash
# Hitta vad som använder porten (Linux/Mac)
lsof -i :8080
lsof -i :3000
lsof -i :5432

# Ändra portmappning i docker-compose.yml
ports:
  - "9090:80"  # Använd port 9090 istället för 8080
```

### Rensa allt

```bash
# Stoppa alla containers
docker-compose down

# Ta bort volumes
docker-compose down -v

# Ta bort images
docker-compose down --rmi all

# Rensa Docker cache
docker system prune -a
```

## Produktion

För produktion, överväg följande ändringar:

1. **Säkerhet**:
   - Ändra databaslösenord i `docker-compose.yml`
   - Använd environment variables från `.env` fil
   - Lägg till HTTPS med SSL/TLS certifikat

2. **Performance**:
   - Använd produktionsbygge för Node.js
   - Aktivera NGINX caching
   - Konfigurera connection pooling för PostgreSQL

3. **Monitoring**:
   - Lägg till health checks
   - Implementera logging aggregation
   - Sätt upp monitoring med Prometheus/Grafana

## Nätverk

Alla tjänster kommunicerar via ett internt bridge-nätverk (`quiz_network`).
Detta gör att tjänsterna kan nå varandra med containernamn:

- Backend når databas via: `postgres:5432`
- Frontend når backend via: `backend:3000`

## Volumes

- `postgres_data`: Persistent storage för PostgreSQL data
- Överlever container restarts och updates
- Tas endast bort med `docker-compose down -v`

## Miljövariabler

Miljövariabler definieras i `docker-compose.yml` och kan överskridas med `.env` fil:

```bash
# Skapa .env fil i root
cp backend/.env.example .env

# Redigera .env med dina inställningar
```

## Support

För problem eller frågor, öppna en issue på GitHub repository.
