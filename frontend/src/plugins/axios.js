import axios from 'axios'
import notificacao from '@/plugins/notificacao'
import store from '@/store'
import { vue } from '@/main'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 15000
})

instance.interceptors.response.use(res => res, alertarErro)

instance.interceptors.request.use(req => {
  req.headers = {
    Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    'Access-Control-Allow-Origin': '*'
  }
  req.data = {
    ...req.data,
    empresaSelecionada: localStorage.getItem('empresaSelecionada')
  }

  req.cancelToken = store.state.app.cancelToken.token
  return req
})

function alertarErro (erro) {
  if (erro.response) {
    if (erro.response.status === 401) {
      notificacao({ atencao: 'Faça login novamente' })
      store.commit('app/setToken', undefined)
      localStorage.setItem('userToken', '')
      vue.$router.push('/login')
    } else if (erro.response.status === 403) {
      return {
        data: {
          erro: 'Sem autorização.'
        }
      }
    }
    return {
      data: {
        erro: 'Erro ao processar requisição!'
      }
    }
  } else {
    return {
      data: {
        erro: 'Erro de rede'
      }
    }
  }
}
export default instance
