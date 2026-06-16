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

docker compose up -d

npm install

npm run dev

## Usuario administrador inicial

email:
admin@inventory.com

password:
Admin123*

## Swagger

/api-docs
http://localhost:3000/api-docs
http://localhost:3000/api-docs.json