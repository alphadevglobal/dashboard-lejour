import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { authProvider } from '../../hooks/authProvider'

import logoImg from '../../assets/lejour_logo.svg'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 86,
    height: 86,
    backgroundColor: '#fafafa',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#86D0CB',
    color: '#FFF',
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('a')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img width={80} height={80} src={logoImg} alt="logo le-jour"/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={username ? false : true}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            color="secondary"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            error={password ? false : true}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
            onChange={(event) => setPassword(event.target.value)}
            onBlur={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Lembrar de mim"
          />
          <Link style={{ textDecoration: 'none' }} to="/dashboard">
            <Button
              fullWidth
              variant="contained"
              color="#86D0CB"
              className={classes.submit}
              onClick={username && password ? authProvider.login(username) : null}
            >
              Sign In
            </Button>
          </Link>
          <Grid container>
            <Grid item xs>
              <Link 
                to="#" 
                style={{ textDecoration: 'none', color: '#E2645A' }} 
                variant="body2"
              >
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                to="/signup" 
                style={{ textDecoration: 'none', color: '#E2645A' }} 
                variant="body2"
              >
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
