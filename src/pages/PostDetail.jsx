import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "../components/Header"
import Loading from "./Loading"
import { formatDate } from "../Utils"

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

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

  if (!post) return <Loading />

  return (
    <>
      <Header />
      <main className="max-w-5xl px-4 m-auto">
        <div className="mb-4">
          <h1 className="font-semibold text-2xl">{post.title}</h1>
          <p className="text-gray-500 text-sm">{`Por ${post.author.name} em ${formatDate(post.createdAt)}`}</p>
        </div>
        <div className="card whitespace-pre-line">
          {post.content}
        </div>
      </main>
    </>
  )
}

export default PostDetail
