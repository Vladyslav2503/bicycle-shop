import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { updateIsAuth, updateUserRole } from '../../store/reducers/UserSlice';

const defaultTheme = createTheme();

const SignUpSide = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/registration', {
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
        alert('Користувача успішно зареєстровано.');
        navigate('/login');
      } else {
        console.error(data.message);
        alert('Помилка при реєстрації. Спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Помилка при виклику API:', error);
      alert('Виникла помилка при реєстрації. Спробуйте ще раз.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
        <Grid style={{ backgroundColor: 'black' }} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ color: 'white' }}>
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                sx={{ mt: 3, mb: 2, backgroundColor: 'inherit', border: '1px solid white' }}
                onClick={handleSignUp}
                disabled={!formValid}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    <Button style={{ color: 'white' }}>Already have an account? Login</Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUpSide;
