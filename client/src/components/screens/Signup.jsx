import React,{useState} from 'react'
import "../../App.css"
import M from 'materialize-css'
import {useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Signup = () => {
  const theme = createTheme();
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    setName(data.get('name'))
      setEmail(data.get('email')) 
      setPassword(data.get('password')) 
  
    // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    //   return  M.toast({html: "invalid email" ,classes:"#ff1744 red accent-3"})
    //     }
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error,classes:"#ff1744 red accent-3"})
      }
      else{
        M.toast({html: data.message,classes:"#7cb342 light-green darken-1"})
        navigate('/login')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (

<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

//     <div className='mycard'>
//     <div className="card auth-card">
//     <img className='myimage' src="https://miro.medium.com/max/846/1*Gc0oA40CYiKstDsMzXhLlw.png" alt="" />
//       <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
//       <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
//       <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
//       <button onClick={()=>PostData()} className="btn waves-effect waves-light #4a148c purple darken-4" >Register
// </button>
// <h5>
//   <Link to="/login">Already have an account ?</Link>
// </h5>
//     </div>
//   </div>
  )
}

export default Signup