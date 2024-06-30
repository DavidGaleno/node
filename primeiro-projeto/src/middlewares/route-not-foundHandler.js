import Erro404NotFound from "../errors/erro-404-not-found.js";

function routeNotFoundHandler(_req, _res, next) {
  const erro = new Erro404NotFound();
  next(erro);
}
export default routeNotFoundHandler;
