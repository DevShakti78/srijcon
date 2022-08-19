import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'

const Createpost = () => {
  const navigate=useNavigate()
    const [title,setTitle] = useState("")
    const [power,setPower] = useState("")
    const [battlecount,setBattlecount] = useState("")
    const [height,setHeight] = useState("")
    const [weight,setWeight] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(() => {
      
      if(url){
        fetch("http://localhost:5000/createpost",{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            'Authorization':"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            title,
            power,
            battlecount,
            height,
            weight,
            pic:url
          })
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.error){
            M.toast({html: data.error,classes:"#ff1744 red accent-3"})
          }
          else{
            M.toast({html: "created post succesfully",classes:"#7cb342 light-green darken-1"})
            navigate('/')
          }
        }).catch(err=>{
          console.log(err)
        })
      }

    }, [url])
    

    const postDetails = () =>{
        const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","tribe-assg")
       data.append("cloud_name","shaktidf")
       fetch("https://api.cloudinary.com/v1_1/shaktidf/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

      

    }
  return (
    <>
    <div style={{display:"flex",margin:"0",justifyContent:"center"}}>

    
    <div className='card input-feild'
    style={{margin:'30px',maxWidth:"500px",padding:"20px",textAlign:"center"}}
    >
       <div className="btn #4a148c purple darken-4">
        <span style={{marginLeft:"20px"}}><i class="material-icons">camera_alt</i></span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
        <input type="text" required placeholder='Name*' value={title} onChange={(e)=>setTitle(e.target.value)} />
        
       
    </div>
    <div className='card input-feild'
    style={{margin:'30px',maxWidth:"500px",padding:"20px",textAlign:"center",marginLeft:"-29px"}}
    >
        <input type="text" required placeholder='Power*' value={power} onChange={(e)=>setPower(e.target.value)} />
        <input type="text" required placeholder='Battle count' value={battlecount} onChange={(e)=>setBattlecount(e.target.value)} />
        <input type="text" required placeholder='Height*' value={height} onChange={(e)=>setHeight(e.target.value)} />
        <input type="text" required placeholder='Weight*' value={weight} onChange={(e)=>setWeight(e.target.value)} />
       
      <button style={{marginRight:"5px"}} onClick={(e)=>postDetails()} className="btn waves-effect waves-light grey" >Cancel
  </button>
  <button onClick={(e)=>postDetails()} className="btn waves-effect waves-light blue darken-4" >Create
  </button>
    </div>
    </div>
    </>
  )
}

export default Createpost