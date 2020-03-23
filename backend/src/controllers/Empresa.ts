import { Controller, Get, Post, Delete } from "@tsed/common";
import BaseController from "./BaseController";
import EmpresaModel from "../models/Empresa";
import Usuario from "../models/Usuario";
@Controller("/empresa")
export class EmpresaController extends BaseController {
  constructor() {
    super(EmpresaModel);
  }

  @Post("/salvar")
  async salvarEmpresa(req, res) {
    const ret = await super.salvar(req.body, { nome: req.body.nome }, "Já existe uma empresa com este nome cadastrado no sistema");
    return res.json(ret);
  }

  @Delete("/apagar/:id")
  async apagarEmpresa(req, res) {
    const id = req.params.id;
    const ret = await super.apagar(id, "Empresa apagada com sucesso");
    return res.json(ret);
  }

  @Post("/listar")
  async listarEmpresas(req, res) {
    return res.json(await super.listar("", [], req.body));
  }

  @Get("/menus")
  async menusEmpresas(req, res) {
    const usuario = await Usuario.findById(req.userId)
      .select("empresas")
      .populate("empresas");
    const ret = usuario.get("empresas").map(empresa => {
      return {
        _id: empresa._id,
        id: empresa.id,
        nome: empresa.nome
      };
    });
    return res.json(ret);
  }

  @Post("/editar")
  async editarEmpresa(req, res) {
    const ret = await super.editar(req.body, { $and: [{ chave: req.body.chave }, { _id: { $ne: req.body.id } }] });
    return res.json(ret);
  }

  @Post("/usuarios/listar/:id")
  async listarEmpresasUsuarios(req, res) {
    return res.json(await super.listarDetalhe(req, "usuarios"));
  }

  @Post("/vincular-usuario")
  async vincularRotina(req, res) {
    return res.json(await super.criarVinculo(req.body.id, req.body.lista, Usuario, "empresas", "usuarios"));
  }

  @Delete("/usuarios/apagar/:id/:idUsuario")
  async deletarEmpresa(req, res) {
    const id = req.params.id;
    const idEmpresa = req.params.idUsuario;
    return res.json(await super.apagarVinculo(id, idEmpresa, Usuario, "empresas", "usuarios"));
  }
}
