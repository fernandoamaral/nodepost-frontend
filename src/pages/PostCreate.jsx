import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import Header from "../components/Header"

function PostCreate() {

  const navigate = useNavigate()

  async function createPost(formData) {
    const form = Object.fromEntries(formData)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)

      }).then(async resp => {
        if (!resp.ok) {
          const errorData = await resp.json()
          throw new Error(errorData.message || 'Erro inesperado.')
        }
        return resp.json();

      }).then(data => {
        toast.success('Post cadastrado com sucesso!')
        navigate('/')

      }).catch(error => {
        toast.error(error.message)
      })
  }

  return (
    <>
      <Header/>
      <main className="max-w-5xl px-4 m-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-2xl">Posts</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-400">Voltar</Link>
        </div>
        <form action={createPost} className="card">
          <div>
            <label htmlFor="title">Título</label>
            <input type="text" name="title" id="title" className="mt-1 block w-full" />
          </div>
          <div className="mt-4">
            <label htmlFor="content">Conteúdo</label>
            <textarea name="content" id="content" className="mt-1 block w-full" rows="8"></textarea>
          </div>
          <button className="mt-6 btn-default">Adicionar</button>
        </form>
      </main>
    </>
  )
}

export default PostCreate