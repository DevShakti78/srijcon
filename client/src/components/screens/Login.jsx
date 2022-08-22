import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {userContext} from "../../App"
import M from 'materialize-css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import {userLogin} from '../../redux/Action'
import "../../App.css"

const theme = createTheme();
const Login = () => {
  const dispatch = useDispatch()
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const navigate = useNavigate()
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword({ ...values, [prop]: event.target.value })
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      setEmail(data.get('email'));
      setPassword(data.get('password'))
  
    // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    //   return  M.toast({html: "invalid email" ,classes:"#ff1744 red accent-3"})
    //     }
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error,classes:"#ff1744 red accent-3"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch(userLogin(data.user))
        M.toast({html: "signed in succesfully",classes:"#7cb342 light-green darken-1"})
        navigate('/create')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className='myloginstyle'>

    
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
             <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup">
                  {"Don't have an account? Sign Up"}
                  </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
    </div>
//     <div className='mycard'>
     
//       {/* <div className="card auth-card">
//       <img className='myimage' src="https://miro.medium.com/max/846/1*Gc0oA40CYiKstDsMzXhLlw.png" alt="" />
//       <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
//       <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
//         <button onClick={()=>PostData()} className="btn waves-effect waves-light #4a148c purple darken-4" >Login
//   </button>
//   <h5>
//   <Link to="/signup">Don't have an account ?</Link>
// </h5>
//       </div> */}
//     </div>
  )
}

export default Login