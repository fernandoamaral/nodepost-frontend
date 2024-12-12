import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useAuth } from '../AuthProvider'
import Header from "../components/Header"

function Login() {

  const navigate = useNavigate()
  const { login } = useAuth()

  function enterUser(formData){
    const form = Object.fromEntries(formData)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)

      }).then(async resp => {
        if (!resp.ok) {
          const errorData = await resp.json()
          throw new Error(errorData.message || 'Erro inesperado.')
        }
        return resp.json()

      }).then(data => {
        login(data.token)
        toast.success('Login realizado com sucesso!')
        navigate('/')

      }).catch(error => {
        toast.error(error.message)
      })
  }

  return (
    <>
      <Header/>
      <main className="max-w-md px-4 m-auto">
        <h1 className="text-xl text-center mb-4">Login de Professores</h1>
        <form action={enterUser} className="card">
          <div className="mt-4">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" className="mt-1 block w-full" autoFocus />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" id="password" className="mt-1 block w-full" />
          </div>
          <div className="flex items-center justify-end mt-6">
            <Link to="/signup" className="underline text-sm text-gray-600 hover:text-gray-900">
              Não é registrado?
            </Link>
            <button type="submit" className="btn-default ml-4">
                Entrar
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Login