import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/Provider'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const[errors, setErrors] = useState(null)
  const {setToken, setUser} = useStateContext()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const onSubmit = (e) => {
      e.preventDefault()

      axiosClient.post('/signup', formData,  { withCredentials: true})
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err => {
          const response = err.response
          if(response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  
    return (
      <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Signup for free</h1>
          {errors && (
            <div className='alert'>
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Full Name'
          />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email Address'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Password'
          />
          <input
            type='password'
            name='password_confirmation'
            value={formData.password_confirmation}
            onChange={handleInputChange}
            placeholder='Password Confirmation'
          />
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