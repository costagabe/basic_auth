import { Model } from "mongoose";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

export default class BaseController {
  constructor(private classe: Model<any>) {}

  async editar(obj, validacoes?, mensagem = "Registro já existe no sistema.") {
    try {
      if (await this.validar(validacoes)) {
        const id = obj._id;
        delete obj._id;
        await this.classe.updateOne({ _id: id }, { $set: obj });
        return { mensagem: "Registro editado com sucesso." };
      } else {
        throw Error(mensagem);
      }
    } catch (e) {
      return { erro: e.message };
    }
  }

  async listar(populate = {}, campos = [], { filtros, sort, paginacao }) {
    ajustarFiltros(filtros);
    try {
      paginacao = paginacao || { skip: 0, limit: 10 };
      paginacao.skip = paginacao.skip * paginacao.limit;
      const lista = await this.classe
        .find(filtros || {}, campos)
        .sort(sort || [["_id", "desc"]])
        .limit(paginacao.limit)
        .skip(paginacao.skip)
        .populate(populate);

      const filtrosCount = filtros || {};
      const count = await this.classe.countDocuments({ ...filtrosCount, $or: [{ delete: false }, { delete: undefined }] });
      return { registros: lista, total: count || 1 };
    } catch (e) {
      return { erro: e.message };
    }
  }
  async salvar(obj, validacoes?, mensagem = "Registro já existe no sistema.") {
    try {
      if (await this.validar(validacoes)) {
        const ret = await this.classe.create(obj);
        return { mensagem: "Registro cadastrado com sucesso", registro: ret };
      } else {
        throw Error(mensagem);
      }
    } catch (e) {
      return { erro: e.message };
    }
  }
  async apagar(id, mensagem = "Registro removido com sucesso.") {
    try {
      let registro;
      if (typeof id !== "object") {
        registro = await this.classe.findById(id);
      } else {
        registro = id;
      }
      await registro.remove();
      return { mensagem };
    } catch (e) {
      if (e.message === "Apagado") {
        return { mensagem };
      } else {
        return { erro: e.message };
      }
    }
  }

  async listarDetalhe(req, detalhe) {
    const id = req.params.id;
    const limit = Number(req.body.paginacao.limit) || 10;
    let skip = Number(req.body.paginacao.skip) || 0;
    skip *= limit;

    const objeto = await this.classe.findById(id).populate({
      path: detalhe,
      options: {
        sort: { _id: 1 },
        limit,
        skip
      }
    });

    const count = (
      await this.classe
        .aggregate()
        .match({ _id: new ObjectId(id) })
        .project({ rotas: { $size: `\$${detalhe}` } })
        .exec()
    )[0][detalhe];
    const registros = objeto.get(detalhe);
    return { registros: registros, total: count || 1 };
  }

  async criarVinculo(idMestre, lista, classeDetalhe, campoMestre, campoDetalhe) {
    try {
      await this.classe.updateOne(
        { _id: idMestre },
        {
          $addToSet: {
            [campoDetalhe]: lista
          }
        }
      );

      await classeDetalhe.updateMany(
        { _id: { $in: lista } },
        {
          $addToSet: {
            [campoMestre]: idMestre
          }
        }
      );

      return { mensagem: "Vinculos realizados com sucesso." };
    } catch (e) {
      return { erro: "Ocorreu um erro desconhecido." };
    }
  }

  async apagarVinculo(idMestre, idDetalhe, classeDetalhe, campoMestre, campoDetalhe) {
    await this.classe.updateOne({ _id: idMestre }, { $pullAll: { [campoDetalhe]: [idDetalhe] } });
    await classeDetalhe.updateOne({ _id: idDetalhe }, { $pullAll: { [campoMestre]: [idMestre] } });

    return { mensagem: "Vinculo removido com sucesso." };
  }
  private async validar(validacoes) {
    let flag = !validacoes; // para continuar a sequencia caso não haja validações OU caso haja validações E passe nas validações
    if (validacoes) {
      const existe = await this.classe.find({ ...validacoes });
      flag = !existe.length;
    }
    return flag;
  }
}

function ajustarFiltros(filtros: any = {}) {
  const key = Object.keys(filtros)[0];
  if (key && typeof filtros[key] === 'string') {
    const filtro = filtros[key].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    filtros[key] = isNaN(filtro) ? new RegExp(`^${filtro}.*`, "i") : filtro;
    if (key === "id") {
      try {
        filtros._id = isNaN(filtros.id) ? new ObjectId(filtros.id) : filtros.id;
        delete filtros.id;
      } catch (e) {
        filtros = { _id: null };
      }
    }
  }
}
