import express from "express";
import databaseConnect from "./config/db-connect.js";
import routes from "./routes/index.js";

const conexao = await databaseConnect();
conexao.on("error", (erro) => console.error("Erro de conexão:", erro));
conexao.once("open", () => {
  console.log("Conexão com Mongo feita com sucesso!");
});

const app = express();
routes(app);

export default app;
