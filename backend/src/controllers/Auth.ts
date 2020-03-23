import jwt from "jsonwebtoken";
import { Controller, Get, Post } from "@tsed/common";
import UsuarioModel, { Usuario } from "../models/Usuario";

@Controller("/auth")
export class UsuarioController {
  @Get("/login")
  async login(req, res): Promise<Object> {
    const email = req.query.email;
    const senha = req.query.senha;
    const usuario = await UsuarioModel.findOne({ email, senha });

    if (usuario) {
      if (usuario.get("ativo")) {
        if (senha !== "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3") {
          var token = jwt.sign({ id: usuario._id }, process.env.SECRET, {
            expiresIn: 60 * 120 // expires in 2h
          });
          return res.status(200).json({ auth: true, token });
        } else {
          return res.json({ atencao: "Por favor, altere sua senha antes de entrar no sistema.", mudarSenha: true, uid: usuario._id });
        }
      } else {
        return res.json({
          erro: "Email inativo, por favor, fale com o setor responsável para ativar seu email."
        });
      }
    } else {
      return res.json({ erro: "Email ou senha incorretos." });
    }
  }

  @Post("/cadastro")
  async cadastro(req, res): Promise<Object> {
    const email = req.body.email;
    const senha = req.body.senha;
    const nome = req.body.nome;

    const usuario: Usuario = {
      ativo: false,
      email,
      nome,
      senha
    };

    const existe = await UsuarioModel.find({ email });
    if (!existe.length) {
      const ref = await UsuarioModel.create(usuario);
      return res.json({ mensagem: "Usuário cadastrado com sucesso." });
    } else {
      return res.json({ erro: "Email já cadastrado no sistema." });
    }
  }

  @Post("/alterar-senha")
  async alterarSenha(req, res): Promise<Object> {
    try {
      const senha = req.body.senha;
      const _id = req.body.uid;

      await UsuarioModel.updateOne(
        { _id: _id, senha: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3" },
        {
          $set: {
            senha
          }
        }
      );
      return res.json({ mensagem: "Sucesso ao alterar senha." });
    } catch (e) {
      console.log(e);
      return res.json({ erro: "Erro interno." });
    }
  }
}
