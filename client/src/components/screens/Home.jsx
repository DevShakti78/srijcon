import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'


const Home = () => {
  const [data,setData] = useState([])
    const {state,dispatch} = useContext(userContext)
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


  // const deletePost = (postid)=>{
  //   console.log(postid)
  //   fetch(`/deletepost/${postid}`,{
  //       method:"delete",
  //       headers:{
  //           Authorization:"Bearer "+localStorage.getItem("jwt")
  //       }
  //   }).then(res=>res.json())
  //   .then(result=>{
  //       console.log(result)
  //       const newData = data.filter(item=>{
  //           return item._id !== result._id
  //       })
  //       setData(newData)
  //   })
  // }

  return (
    
    <div >
      {
        data.map(item=>{
return (
  <section className="profile" key={item._id}>
  <header className="header">
    <div className="details">
      <img src={item.photo} alt="John Doe" className="profile-pic"/>
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
  </header>
</section>
)
        })
      }


    </div>
  )
}

export default Home