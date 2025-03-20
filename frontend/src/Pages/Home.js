import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import {ToastContainer} from "react-toastify"

const Home = () => {
  const [loggedInUser,setloggedInUser]=useState('');
  const [products,setProducts]=useState('')
  const navigate= useNavigate();

  useEffect(()=>{
    setloggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('user Logged out')
    setTimeout(()=>{
           navigate('/login')
    },1000)
  }
  const  fetchProducts=async()=>{
    try {
      const url="http://localhost:8080/product";
      const headers={
          headers:{
              'Authorization':localStorage.getItem('token')
          }
      }
      const respons=await fetch(url,headers);
      const result=await respons.json();
      console.log(result)
      setProducts(Array.isArray(result) ? result : []);      
    } catch (error) {
      handleError(error)
    }
  }
  useEffect(()=>{
      fetchProducts();
  },[])
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
      {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <li>
                <span>
                  {item.name}: {item.price}
                </span>
              </li>
            </ul>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home