import Base from "./Base";
import mongoose from "mongoose";

const schema = {
  nome: {
    type: String,
    required: "Nome do usuário obrigatório."
  },
  email: {
    type: String,
    required: "Email do usuário obrigatório."
  },
  senha: {
    type: String,
    required: "A senha do usuário é obrigatória."
  },
  ativo: Boolean,
  empresas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Empresas" }]
};

class UsuarioModel extends Base {
  constructor(props?: Object) {
    super(schema, props);
  }
}
export interface Usuario {
  ativo: Boolean;
  email: String;
  nome: String;
  perfis?: Array<any>;
  senha?: String;
}
export default mongoose.model("Usuarios", new UsuarioModel());
