import express from "express";
import livros from "./livros-routes.js";
import autores from "./autores-routes.js";
import errorHandler from "../middlewares/errorHandler.js";
import routeNotFoundHandler from "../middlewares/route-not-foundHandler.js";
const routes = (app) => {
  app.use(express.json(), livros, autores);
  app.use(routeNotFoundHandler);
  app.use(errorHandler);
};

export default routes;
