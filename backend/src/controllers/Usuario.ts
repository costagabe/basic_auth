import { Controller, Post, Delete, Get } from "@tsed/common";
import BaseController from "./BaseController";
import UsuarioModel, { Usuario } from "../models/Usuario";
import Empresa from "../models/Empresa";

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
@Controller("/usuario")
export class UsuarioController extends BaseController {
  constructor() {
    super(UsuarioModel);
  }

  @Post("/editar")
  async editarUsuario(req, res) {
    const ret = await super.editar(req.body, { $and: [{ email: req.body.email }, { _id: { $ne: req.body.id } }] });
    return res.json(ret);
  }

  @Post("/salvar")
  async salvarUsuario(req, res) {
    try {
      const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        ativo: req.body.ativo,
        senha: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
      };

      await UsuarioModel.create(usuario);

      return res.json({ mensagem: "Usuário cadastrado com sucesso." });
    } catch (e) {
      return res.json({ erro: e.message });
    }
  }

  @Post("/listar")
  async listarUsuarios(req, res): Promise<Array<Usuario>> {
    req.body.filtros = {
      ...req.body.filtros,
      empresas: ObjectId(req.body.empresaSelecionada)
    };
    return res.json(await super.listar("", [], req.body));
  }

  @Post("/empresas/listar/:id")
  async listarEmpresasUsuario(req, res) {
    return res.json(await super.listarDetalhe(req, "empresas"));
  }

  @Post("/vincular-empresa")
  async vincularEmpresa(req, res) {
    return res.json(await super.criarVinculo(req.body.id, req.body.lista, Empresa, "usuarios", "empresas"));
  }

  @Delete("/empresas/apagar/:id/:idEmpresa")
  async deletarEmpresa(req, res) {
    const id = req.params.id;
    const idPerfil = req.params.idEmpresa;
    return res.json(await super.apagarVinculo(id, idPerfil, Empresa, "usuarios", "empresas"));
  }
}
