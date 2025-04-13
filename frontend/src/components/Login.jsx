import { verifyUser } from '../api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let response = await verifyUser(user)
    navigate('/home')

    if (response) {
      navigate('/home')
    } else {
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder={'Email'}
        onChange={handleChange}
        name="email"
        required
        maxLength={40}
      />
      <input
        placeholder={'Password'}
        onChange={handleChange}
        name="password"
        required
        maxLength={20}
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
