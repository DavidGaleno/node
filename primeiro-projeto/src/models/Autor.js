import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.ObjectId },
    nome: {
      type: String,
      required: [true, ({ path }) => `O ${path} é obrigatório`],
    },
    nacionalidade: { type: String },
  },
  { versionKey: false }
);

const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema };
