import axios from 'axios'

const URL = 'http://localhost:3000'

export async function getPosts() {
  // localhost:3000/posts
  const response = await axios.get(`${URL}/posts`)
  if (response.status === 200) {
    return response.data
  } else {
    return
  }
}

export async function getPost(id) {
  // localhost:3000/posts/2351
  const response = await axios.get(`${URL}/posts/${id}`)
  if (response.status === 200) {
    return response.data
  } else {
    return
  }
}

export async function createPost(post) {
  // localhost:3000/posts/
  const response = await axios.post(`${URL}/posts`, post)
  return response
}

export async function updatePost(id, post) {
  // localhost:3000/posts/5
  const response = await axios.post(`${URL}/posts/${id}`, post)
  return response
}

export async function deletePost(id) {
  const response = await axios.delete(`${URL}/posts/${id}`)
  return response
}

// User Login

export async function getUser(id) {
  // localhost:3000/posts/2351
  const response = await axios.get(`${URL}/users/${id}`)
  if (response.status === 200) {
    return response.data
  } else {
    return
  }
}

export async function createUser(user) {
  // localhost:3000/users/
  const response = await axios.post(`${URL}/users`, user)
  return response
}

export async function updateUser(id, user) {
  // localhost:3000/users/5
  const response = await axios.post(`${URL}/users/${id}`, user)
  return response
}

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user)
  console.log(response)
  if (response.data.success) {
    return response.data.user
  } else {
    return
  }
}
