import React, { useState } from 'react'
import CreateUser from '../components/CreateUser'
import Login from '../components/Login'

export default function Landing() {
  const [view, setView] = useState(0)
  return (
    <>
      {!view ? (
        <>
          <Login />
          <button onClick={() => setView(!view)}>Create New Account</button>
        </>
      ) : (
        <>
          <CreateUser />
          <button onClick={() => setView(!view)}>Login Existing Account</button>
        </>
      )}
    </>
  )
}
