import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

function teste(valor) {
  return valor > 0;
}

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O título é obrigatório"] },
    editora: {
      type: String,
      enum: {
        values: ["Casa do Código", "Alura"],
        message:
          "A editora {VALUE} não é válida. São válidas a Casa do Código e Alura são aceitos ",
      },
    },
    // "O livro deve ter no mínimo 1 página"
    preco: { type: Number },
    paginas: {
      type: Number,
      validate: {
        validator: teste,
        message: "O livro deve ter no mínimo 1 página",
      },

      max: [10000, "O livro deve ter no máximo 10000 página"],
    },
    //Embedded
    // autor: autorSchema,
    //Reference
    autor: {
      type: mongoose.Schema.ObjectId,
      ref: "autores",
      required: [true, "O autor é obrigatório"],
      autopopulate: { select: "nacionalidade" },
      //true Retorna todos os campos no autopopulate
    },
  },
  { versionKey: false }
);

livroSchema.plugin(autopopulate);

const livro = mongoose.model("livros", livroSchema);

export default livro;
