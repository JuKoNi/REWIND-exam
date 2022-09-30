
#Hämta Linux + Node
FROM node:lts-alpine

#Skapa en mapp "app" inuti Docker image
#/app blir aktuell mapp (när man skriver . senare i filen)
WORKDIR /app

#installera webbservern vi ska använda i sista steget
RUN npm install -g http-server

#Kopiera package.json -> in till mappen "app" i image
#COPY package.json package-lock.json ./
COPY package*.json ./

#installera npm-paket
#RUN npm install
RUN npm ci --only=production
#Kopiera över all kod från aktuell mapp på datorn till /app i image
COPY . .

#Bygg projektet - kör byggskriptet
#Statiska filer hamnar i /app/dist
RUN npm run build

#Gör port 8080 synlig utåt
EXPOSE 8080

#Starta en webbserver som servar de statiska filerna i /app/dist
CMD ["http-server", "dist","-p 8080"]

#i cmd: docker build -t react-docker-demo:latest .
#i cmd: docker run --name react-docker-container -d -p 8080:8080