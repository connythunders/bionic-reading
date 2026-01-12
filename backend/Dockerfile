# Dockerfile för Node.js backend
FROM node:18-alpine

# Skapa app-katalog
WORKDIR /app

# Kopiera package files
COPY package*.json ./

# Installera dependencies
RUN npm install --production

# Kopiera applikationskod
COPY . .

# Exponera port
EXPOSE 3000

# Starta applikationen
CMD ["npm", "start"]
