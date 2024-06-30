import express from "express";
import LivroController from "../controller/livro-controller.js";
import paginationHandler from "../middlewares/paginationHandler.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginationHandler);
routes.get(
  "/livros/busca",
  LivroController.listaLivroPorFiltro,
  paginationHandler
);
routes.get("/livros/grandes", LivroController.listaLivroGrandes);
routes.get("/livros/:id", LivroController.listaLivroPorId);
routes.post("/livros", LivroController.adicionarLivro);
routes.put("/livros/:id", LivroController.atualizaLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;
