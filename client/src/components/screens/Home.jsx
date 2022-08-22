import React from 'react'
import { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data,setData] = useState([])
  const state = useSelector((e) => e.login.token)
  const navigate = useNavigate()
  console.log("statehome",state)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])


  const deletePost = (postid)=>{
    console.log(postid)
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
        navigate("/create")
    })
  }

  return (
    
    <div >
      {
        data.map(item=>{
return (
  <section className="profile" key={item._id}>
    
  <header className="header">
   
    <div className="details">
      <img src={item.photo}  className="profile-pic"/>
      <h1 className="heading">{item.title}</h1>
      <div className="powertype">
        
        <p>{item.power}</p>
      </div>
      <div className="stats">
        <div className="col-4">
          <h4>{item.battlecount}</h4>
          <p>Battle count</p>
        </div>
        <div className="col-4">
          <h4>{item.height}</h4>
          <p>Height</p>
        </div>
        <div className="col-4">
          <h4>{item.weight}</h4>
          <p>Weight</p>
        </div>
      </div>
     
    </div>
    {item.postedBy._id == state._id && <> <DeleteIcon onClick={()=>deletePost(item._id)}/>   <EditIcon/> </>}
 
  </header>
</section>
)
        })
      }


    </div>
  )
}

export default Home