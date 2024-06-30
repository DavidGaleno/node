import express from "express";
import AutorController from "../controller/autor-controller.js";
import paginationHandler from "../middlewares/paginationHandler.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores, paginationHandler);
routes.get("/autores/:id", AutorController.listaAutorPorId);
routes.post("/autores", AutorController.adicionarAutor);
routes.put("/autores/:id", AutorController.atualizaAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);

export default routes;
