import mongoose from "mongoose";
import ErroBase from "../errors/erro-base.js";
import RequisicaoIncorreta from "../errors/requisicao-incorreta.js";
import ErroValidacao from "../errors/erro-validacao.js";
import Erro404NotFound from "../errors/erro-404-not-found.js";
function errorHandler(err, _req, res, _next) {
  if (err instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(err).enviarResposta(res);
  } else if (err instanceof ErroBase) {
    err.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default errorHandler;
