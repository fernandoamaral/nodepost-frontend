import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import Header from "../components/Header"
import { useState, useEffect } from "react"
import Loading from "./Loading"

function PostEdit() {

  const { id } = useParams()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`)
      .then(async (resp) => {
        if (!resp.ok) {
          const errorData = await resp.json()
          throw new Error(errorData.message || "Erro inesperado.")
        }
        return resp.json()
      })
      .then((data) => {
        setPost(data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }, [id])

  async function editPost(formData) {
    const form = Object.fromEntries(formData)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
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

  if (!post) return <Loading />

  return (
    <>
      <Header/>
      <main className="max-w-5xl px-4 m-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-2xl">Posts</h1>
          <Link to="/dashboard" className="text-blue-500 hover:text-blue-400">Voltar</Link>
        </div>
        <form action={editPost} className="card">
          <div>
            <label htmlFor="title">Título</label>
            <input type="text" name="title" id="title" className="mt-1 block w-full" defaultValue={post.title} />
          </div>
          <div className="mt-4">
            <label htmlFor="content">Conteúdo</label>
            <textarea name="content" id="content" className="mt-1 block w-full" rows="8" defaultValue={post.content}></textarea>
          </div>
          <button className="mt-6 btn-default">Editar</button>
        </form>
      </main>
    </>
  )
}

export default PostEdit