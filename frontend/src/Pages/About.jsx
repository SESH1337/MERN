import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <h1>About Us</h1>
      <p>Welcome to our blog page</p>
      <p>
        This blog was created with a simple goal in mind: to share meaningful
        content that inspires, informs
      </p>
      <p>
        Here, it's not just about writing — it's about building a community of
        readers who enjoy thoughtful conversation and continuous learning.
      </p>
      <p>
        So, grab a cup of coffee (or tea!), browse around, and let’s explore new
        perspectives together. You can visit our blog to create yours
        <Link to="/createblog"> Create Blog</Link>
      </p>
      <p>
        Thanks for stopping by — and don’t forget to subscribe or drop a
        comment. I’d love to hear from you!
      </p>
    </>
  )
}
