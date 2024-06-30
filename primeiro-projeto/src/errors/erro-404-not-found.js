import ErroBase from "./erro-base.js";

class Erro404NotFound extends ErroBase {
  constructor(mensagem="Página não encontrada") {
    super(mensagem, 404);
  }
}

export default Erro404NotFound;
