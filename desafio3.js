const express = require("express");
const Contenedor = require("./desafio2.js");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
const products = new Contenedor("file.txt");

app.get("/products", async (_req, res) => {
    try {
        const result = await products.getAll();
        res.send({ data: result });
    } catch (error) {
        console.log(error);
        res.status(404).send({ data: null, error: `Archivo no encontrado` });
    }
});

app.get("/randomProduct", async (_req, res) => {
    try {
        const result = await products.getAll();
        const randomProduct = Math.floor(Math.random() * result.length);
        res.send(result[randomProduct]);
    } catch (error) {
        res.status(404).send({ data: null, error: `Archivo no encontrado` });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});

server.on("error", (error) => console.log(`Gateway error: ${error}`));