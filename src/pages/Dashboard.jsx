import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useAuth } from '../AuthProvider'
import Header from "../components/Header"
import { useState, useEffect } from "react"
import Loading from "./Loading"

function Dashboard() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`)
      .then(async resp => {
        if (!resp.ok) {
          const errorData = await resp.json()
          throw new Error(errorData.message || 'Erro inesperado.')
        }
        return resp.json()
      }).then(data => {
        setPosts(data.posts)

      }).catch(error => {
        toast.error(error.message)

      }).finally(() => {
        setIsLoading(false)
      })
  }, [])

  function editPost(id) {
    navigate(`/posts/${id}/edit`)
  }

  function deletePost(id) {
    if(!confirm('Tem certeza que deseja excluir esse post?')) return

    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(resp => {
        if(resp.ok){
          const updatedPosts = posts.filter((post) => post._id !== id)
          setPosts(updatedPosts)
        }
      }).catch(error => {
        toast.error(error.message)
      })
  }

  if (isLoading)  return <Loading />

  return (
    <>
      <Header/>
      <main className="max-w-5xl px-4 m-auto">
        <div className="flex items-center justify-between mb-4 relative">
          <h1 className="font-semibold text-2xl">Posts</h1>
          { user && <Link to="/posts/create" className="btn-default absolute right-0">Novo Post</Link> }
        </div>
        { posts.length == 0 && (<div className="border border-gray-300 p-4 rounded flex items-center"><svg class="w-5 h-5 mr-2 fill-current opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M527.9 224H480v-48c0-26.5-21.5-48-48-48H272l-64-64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h400c16.5 0 31.9-8.5 40.7-22.6l79.9-128c20-31.9-3-73.4-40.7-73.4zM48 118c0-3.3 2.7-6 6-6h134.1l64 64H426c3.3 0 6 2.7 6 6v42H152c-16.8 0-32.4 8.8-41.1 23.2L48 351.4zm400 282H72l77.2-128H528z"></path></svg> Nenhum post cadastrado.</div>) }
        { posts.map((post) => 
            <div key={post._id} className="bg-white rounded mt-2 p-4 flex items-center justify-between">
              <Link to={`/posts/${post._id}`} className="hover:underline">{post.title}</Link>
              <span className="flex items-center gap-1 text-slate-400 z-10">
                <Link to={`/posts/${post._id}/edit`} title="Editar" className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current hover:text-slate-600"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/></svg>
                </Link>
                <button onClick={(e) => { e.preventDefault(); deletePost(post._id)} } title="Excluir" className="px-1 fill-current">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 hover:text-slate-600"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                </button>
              </span>
            </div>
        ) }
      </main>
    </>
  )
}

export default Dashboard