import Erro404NotFound from "../errors/erro-404-not-found.js";
import ErroBase from "../errors/erro-base.js";
import { livro, autor } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivrosQuery = livro.find({});
      req.result = buscaLivrosQuery;
      next();
    } catch (err) {
      next(err);
    }
  }
  static async listaLivroPorId(req, res, next) {
    try {
      const id = req.params["id"];
      const resultado = await livro.findById(id);
      if (resultado) {
        res.status(200).send(resultado);
      } else {
        next(new Erro404NotFound("Livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  }
  static async listaLivroPorFiltro(req, res, next) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query;

    const busca = {};
    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if (minPaginas) busca.paginas = { $gte: minPaginas };
    if (maxPaginas) busca.paginas = { ...busca.paginas, $lte: maxPaginas };
    if (nomeAutor) {
      const filtro = { $regex: nomeAutor, $options: "i" };
      const autorEncontrado = await autor.findOne({ nome: filtro });
      if (autorEncontrado) busca.autor = autorEncontrado._id;
      else return res.status(200).send([]);
    }

    try {
      const resultado = livro.find(busca);

      req.result = resultado;
      next();
    } catch (err) {
      next(err);
    }
  }
  static async listaLivroGrandes(_req, res, next) {
    const paginas = { paginas: { $lte: 100 } };
    try {
      const resultado = await livro.find(paginas);
      res.status(200).json(resultado);
    } catch (err) {
      next(err);
    }
  }
  static async adicionarLivro(req, res, next) {
    let novoLivroDados = req.body;
    try {
      //Embedded
      //   const autorEncontrado = await autor.findById(novoLivroDados["autor"]);
      //   novoLivroDados = {
      //     ...novoLivroDados,
      //     autor: autorEncontrado._doc,
      //   };
      const novoLivro = await livro.create(novoLivroDados);
      res
        .status(201)
        .json({ mensagem: "Livro criado com suceso", livro: novoLivro });
    } catch (err) {
      next(err);
    }
  }
  static async atualizaLivro(req, res, next) {
    try {
      const id = req.params["id"];
      const resultado = await livro.findByIdAndUpdate(id, req.body);
      const livros = await livro.findById(id);
      if (resultado) {
        res.status(200).send(livros);
      } else {
        new ErroBase("Livro não encontrado", 404).enviarResposta(res);
      }
    } catch (err) {
      next(err);
    }
  }
  static async deletarLivro(req, res, next) {
    try {
      const id = req.params["id"];
      const resultado = await livro.findByIdAndDelete(id, req.body);
      const livros = await livro.find({});
      if (resultado) {
        res.status(200).send(livros);
      } else {
        new ErroBase("Livro não encontrado", 404).enviarResposta(res);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default LivroController;
