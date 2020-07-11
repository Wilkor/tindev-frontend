import React, {useEffect,useState} from 'react';
import dislike from  '../assets/dislike.svg'
import logo from  '../assets/logo.svg'
import like from  '../assets/like.svg'
import api from '../services/api';
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import itsamatch from '../assets/itsamatch.png'

import './main.css'
export default function Main({match}){

    const [users,setUsers] = useState([])
    const [matchDev,setMatchDev] = useState(null);



   useEffect(()=>{
     async function loadUsers(){
     const response = await api.get('/devs',{ headers:{
      user:match.params.id
  }})
      setUsers(response.data)
     }

    loadUsers()
   },[match.params.id])

    useEffect(()=>{
      const socket = io('https://tindev-wilkor-backend.herokuapp.com', {
        query:{user:match.params.id}
      })

      socket.on('match',dev=>{
        setMatchDev(dev)
      })

    },[match.params.id])

   async function handleDislike(id){
 
     await api.post(`/devs/${id}/dislikes`,null,{headers:{
         user:match.params.id
     }})

     setUsers(users.filter(user=> user._id != id));
  }

  async function handleLike(id){

     await api.post(`/devs/${id}/likes`,null,{headers:{
        user:match.params.id
    }})
    setUsers(users.filter(user=> user._id != id));
  }


    return (
        <div className="main-container">
       <Link to="/">
        <img src={logo} alt="TinDev"/>
       </Link>
        {users.length > 0 ? (
            <ul> 
            {users.map(user => (
            <li key={user._id}>
            <img src={user.avatar} alt="TinDev"/>
            <footer>
            <strong>{user.name}</strong>
            <p>{user.bio}</p>
            </footer>

            <div className="buttons">

            <button type="button" onClick={() =>handleDislike(user._id)}>
            <img src={dislike} alt="dislike"/>
            </button>
            <button type="button"  onClick={() =>handleLike(user._id)}>
            <img src={like} alt="like"/>
            </button>
            
            </div>

            </li>
            ))}

        </ul>
        ) : <div className="empty"> Zerou a lista =(
            </div>
        
        }

        {matchDev &&(

          <div className="match-container">
           <img src={itsamatch} alt="its a match"/>
           <img className="avatar" src={matchDev.avatar} alt="avatar"/>
           <strong>{matchDev.name}</strong>
           <p>{matchDev.bio}</p>
           <button type="button" onClick={()=> setMatchDev(null)}>
            fechar
            </button>
          </div>


        )
         }


            
                </div>

        
    )
}
