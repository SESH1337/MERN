import React, { useEffect, useState } from 'react'
import { getPosts } from '../api'
import BlogCard from '../components/BlogCard'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts()
      data.sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )
      setPosts(data)
    }
    loadAllPosts()
  }, [])

  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <>
            <BlogCard post={post} />
          </>
        )
      })}
    </div>
  )
}
