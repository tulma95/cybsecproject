import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('')
  const [loggedUser, setLoggedUser] = useState(undefined)
  useEffect(() => {
    const user = localStorage.getItem('user')
    setLoggedUser(JSON.parse(user))
  }, [])
  const submitRegister = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  const submitLogIn = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    if (res.status === 401) {
      const { message } = await res.json()
      setErrorMessage(message)
    } else if (res.status === 404) {
      setErrorMessage('no user found')
    } else {
      setErrorMessage('succesfully logged in')
      localStorage.setItem('user', JSON.stringify({ username, password }))
      setLoggedUser({ username, password })
    }
  }

  return (
    <div className={styles.container}>
      {!!loggedUser ? (
        <div>
          <div>welcome to app {loggedUser?.username}</div>
          <button
            onClick={() => {
              localStorage.removeItem('user')
              setErrorMessage('')
              setLoggedUser(null)
            }}
          >
            log out
          </button>
        </div>
      ) : (
        <div>
          <div>{errorMessage}</div>
          <form action='submit' onSubmit={submitRegister}>
            <label>username</label>
            <input type='text' name='username' />
            <label>password</label>
            <input type='password' name='password' />
            <button type='submit'>register</button>
          </form>
          <form action='submit' onSubmit={submitLogIn}>
            <label>username</label>
            <input type='text' name='username' />
            <label>password</label>
            <input type='password' name='password' />
            <button type='submit'>Log in</button>
          </form>
        </div>
      )}
    </div>
  )
}
