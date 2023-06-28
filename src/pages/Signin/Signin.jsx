import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';
import { Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Grid, 
  Box, 
  Typography, 
  Container } from '@mui/material';
import { 
  LockOutlined as LockOutlinedIcon, 
  CheckCircleOutline as CheckCircleOutlineIcon, 
  CancelOutlined as CancelOutlinedIcon } from '@mui/icons-material';
import SigninModal from '../../components/SigninModal/SigninModal';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (auth.currentUser){
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(updateNav("signin"));
  }, [dispatch]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: ""
    };

    if (isSubmitted && email.trim() === "") {
      newErrors.email = "This field is required";
      isValid = false;
    }

    if (isSubmitted && pass.trim() === "") {
      newErrors.password = "This field is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            setOpen(true);
          }
        })
        .catch((error) => {
          console.log(error)
          setOpen(true);
        });
    }
  };

  return (
    <>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={isSubmitted && email.trim() === ""}
              helperText={isSubmitted && email.trim() === "" && "This field is required"}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              error={isSubmitted && pass.trim() === ""}
              helperText={isSubmitted && pass.trim() === "" && "This field is required"}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <SigninModal
        open={open}
        title={auth.currentUser ? "Logged in Successfully" : "Incorrect Email or Password"}
        handleClose={handleClose}
        modalIcon={auth.currentUser ? <CheckCircleOutlineIcon sx={{ fontSize: "9rem", color: "primary.main", marginBottom: "1.4rem" }} />
      : <CancelOutlinedIcon sx={{ fontSize: "9rem", color: "danger.main", marginBottom: "1.4rem" }} />}
      />
    </>
  );
}

export default SignIn;

