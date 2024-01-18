import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../client'
import { useStateContext } from '../context/Provider'

function Signup() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passRef = useRef()
  const passConfirmationRef = useRef()

  const {setToken, setUser} = useStateContext()

    const onSubmit = (e) => {
      e.preventDefault()
      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
        password_confirmation: passConfirmationRef.current.value
      }

      axiosClient.post('/signup', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err => {
          const res = err.response
          if(res && res.status === 422) {
            console.log(res.data.errors)
          }
        })
    }
  
    return (
      <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
          <form onSubmit={onSubmit}>
            <h1 className='title'>
              Signup for free 
            </h1>
            <input ref={nameRef} type='text' placeholder='Full Name'/>
            <input ref={emailRef} type='email' placeholder='Email Address'/>
            <input ref={passRef} type='password' placeholder='Password'/>
            <input ref={passConfirmationRef} type='password' placeholder='Password Confirmation'/>
            <button className='btn btn-block'>Signup</button>
            <p className='message'>
              Already Registered? <Link to='/login'>Login</Link>
            </p>
          </form>
        </div>
      </div>
  )
}

export default Signup