import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import Header from "../components/Header"
import { useState, useEffect } from "react"
import Loading from "./Loading"
import { truncateText, formatDate } from "../Utils"

function Home() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(null)

  useEffect(() => {
    const path = !searchQuery ? '/posts' : `/posts/search?q=${searchQuery}`

    fetch(import.meta.env.VITE_API_BASE_URL + path)
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
  }, [searchQuery])

  function handleSearch(formData) {
    setSearchQuery(formData.get('query'))
    console.log(formData.get('query'))
  }

  if (isLoading)  return <Loading />

  return (
    <>
      <Header/>
      <main className="max-w-5xl px-4 m-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-2xl">Posts</h1>
          <div className="w-60 bg-transparent border border-gray-300 rounded-full flex items-center fill-current">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 ml-3 text-gray-400"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            <form action={handleSearch}>
              <input type="text" name="query" className="w-full border-0 outline-0 appearance-none m-0 p-2 bg-transparent text-sm placeholder:text-gray-400 search" placeholder="Pesquisar..." autoComplete="off" defaultValue={searchQuery} />
            </form>
          </div>
        </div>
        { posts.length == 0 && (<div className="border border-gray-300 p-4 rounded flex items-center"><svg class="w-5 h-5 mr-2 fill-current opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M527.9 224H480v-48c0-26.5-21.5-48-48-48H272l-64-64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h400c16.5 0 31.9-8.5 40.7-22.6l79.9-128c20-31.9-3-73.4-40.7-73.4zM48 118c0-3.3 2.7-6 6-6h134.1l64 64H426c3.3 0 6 2.7 6 6v42H152c-16.8 0-32.4 8.8-41.1 23.2L48 351.4zm400 282H72l77.2-128H528z"></path></svg> Nenhum post cadastrado.</div>) }
        { posts.map((post) => 
            <Link to={`/posts/${post._id}`} key={post._id} className="bg-white border-l-4 border-gray-200 hover:border-blue-500 rounded mt-2 p-4 block">
              <p className="font-semibold">{post.title}</p>
              <p className="text-gray-500 text-sm">{`Por ${post.author.name} em ${formatDate(post.createdAt)}`}</p>
              <p className="mt-2">{truncateText(post.content, 200)}</p>
            </Link>
        ) }
      </main>
    </>
  )
}

export default Home