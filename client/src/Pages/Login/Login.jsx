import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { updateIsAuth, updateUserRole } from '../../store/reducers/UserSlice';

const SignInSide = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    if (emailDirty || passwordDirty) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailDirty, passwordDirty]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
 
     if (!re.test(String(email).toLowerCase())) {
       setEmailDirty(true);
     } else {
       setEmailDirty(false);
     }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 24) {
      setPasswordDirty(true);
    } else {
      setPasswordDirty(false);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        const decodedToken = jwtDecode(data.token);
        const userRole = decodedToken.roles[0];
        dispatch(updateUserRole(userRole));
        dispatch(updateIsAuth(true))
        navigate('/');
      } else {
        console.error(data.message);
        alert('Логін або пароль невірний. Спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Помилка при виклику API:', error);
      alert('Виникла помилка при вході. Спробуйте ще раз.');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid style={{ backgroundColor: "black" }} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "white" }}>
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              color={emailDirty ? 'error' : 'primary'}
              value={email}
              onChange={(e) => emailHandler(e)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&::placeholder': {
                    color: 'white',
                  },
                },
                '& .MuiInputAdornment-root': {
                  color: 'white',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              color={passwordDirty ? 'error' : 'primary'}
              value={password}
              onChange={(e) => passwordHandler(e)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&::placeholder': {
                    color: 'white',
                  },
                },
                '& .MuiInputAdornment-root': {
                  color: 'white',
                },
              }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "inherit", border: "1px solid white" }}
              onClick={handleSignIn}
              disabled={!formValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/registration" variant="body2">
                  <Button style={{ color: "white" }}>
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
