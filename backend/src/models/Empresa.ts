import Base from "./Base";
import mongoose from "mongoose";

const schema = {
  nome: {
    type: String,
    required: "O nome da empresa é obrigatório."
  },
  cnpj: {
    type: String,
    required: "O CNPJ do empresa é obrigatório."
  },
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" }]
};

class EmpresaModel extends Base {
  constructor(props?: Object) {
    super(schema, props);
  }
}

export default mongoose.model("Empresas", new EmpresaModel());
