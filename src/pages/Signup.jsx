import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import Header from "../components/Header"

function Signup() {

  const navigate = useNavigate()

  async function createUser(formData) {
    const form = Object.fromEntries(formData)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)

      }).then(async resp => {
        if (!resp.ok) {
          const errorData = await resp.json()
          throw new Error(errorData.message || 'Erro inesperado.')
        }
        return resp.json();

      }).then(data => {
        toast.success('Cadastro realizado com sucesso! Faça o login.')
        navigate('/')

      }).catch(error => {
        toast.error(error.message)
      })
  }

  return (
    <>
      <Header/>
      <main className="max-w-md px-4 m-auto">
        <h1 className="text-xl text-center mb-4">Cadastro de Professores</h1>
        <form action={createUser} className="card">
          <div>
            <label htmlFor="name">Nome</label>
            <input type="text" name="name" id="name" className="mt-1 block w-full" required autoFocus />
          </div>
          <div className="mt-4">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" className="mt-1 block w-full" required />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" id="password" className="mt-1 block w-full" required />
          </div>
          <div className="flex items-center justify-end mt-6">
            <Link to="/login" className="underline text-sm text-gray-600 hover:text-gray-900">
              Já registrado?
            </Link>
            <button type="submit" className="btn-default ml-4">
                Cadastrar
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Signup