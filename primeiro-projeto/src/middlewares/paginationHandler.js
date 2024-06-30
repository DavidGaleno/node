import RequisicaoIncorreta from "../errors/requisicao-incorreta.js";

async function paginationHandler(req, res, next) {
  try {
    let {
      limite = 3,
      pagina = 1,
      campoOrdenacao = "_id",
      ordem = 1,
    } = req.query;

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const result = req.result;

    if (limite <= 0 || pagina <= 0) {
      next(new RequisicaoIncorreta());
    } else {
      const lista = await result
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();
      res.status(200).json(lista);
    }
  } catch (err) {
    next(err);
  }
}

export default paginationHandler;
