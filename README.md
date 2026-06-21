# Inventory API

## Arquitectura

Hexagonal Architecture

## Tecnologías

Node.js
Express
MongoDB
Mongoose
JWT
Docker

## Decisiones Técnicas

### MongoDB Transactions

MongoDB requiere Replica Set para soportar transacciones ACID.
Se ha configurado un Replica Set de un nodo mediante Docker.

### Control de concurrencia

La reducción de stock se realiza mediante operaciones atómicas usando:

findOneAndUpdate
$gte
$inc

evitando inconsistencias ante compras simultáneas.

## Instalación

### Opción 1: API + MongoDB con Docker Compose

docker compose up -d --build

La API queda disponible en:

http://localhost:3000

### Opción 2: MongoDB en Docker + API en local

docker compose up -d mongo

npm install

npm run dev

## Usuario administrador inicial

email:
admin@inventory.com

password:
Admin123*

## Testing - Jest y SuperTest
npm run test

## Swagger

/api-docs
http://localhost:3000/api-docs
http://localhost:3000/api-docs.json