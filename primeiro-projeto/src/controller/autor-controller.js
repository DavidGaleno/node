import Erro404NotFound from "../errors/erro-404-not-found.js";
import ErroBase from "../errors/erro-base.js";
import { autor } from "../models/index.js";

class AutorController {
  static async listarAutores(req, _res, next) {
    const result = autor.find({});
    req.result = result;
    next();
  }
  static async listaAutorPorId(req, res, next) {
    try {
      const id = req.params["id"];
      const resultado = await autor.findById(id);
      if (resultado == null) {
        next(new Erro404NotFound("Autor não encontrado"));
      } else {
        res.status(200).send(resultado);
      }
    } catch (err) {
      next(err);
    }
  }
  static async adicionarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res
        .status(201)
        .json({ mensagem: "Livro criado com suceso", livro: novoAutor });
    } catch (err) {
      next(err);
    }
  }
  static async atualizaAutor(req, res, next) {
    try {
      const id = req.params["id"];
      const resultado = await autor.findByIdAndUpdate(id, req.body);
      const autores = await autor.findById(id);
      if (resultado) {
        res.status(200).json(autores);
      } else {
        new ErroBase("Autor não encontrado", 404).enviarResposta(res);
      }
    } catch (err) {
      next(err);
    }
  }
  static async deletarAutor(req, res, next) {
    try {
      const id = req.params["id"];
      const resultado = await autor.findByIdAndDelete(id, req.body);
      const autores = await autor.find({});
      if (resultado) {
        res.status(200).json(autores);
      } else {
        new ErroBase("Autor não encontrado", 404).enviarResposta(res);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default AutorController;
