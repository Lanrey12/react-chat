import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const firebase = require("firebase");

class Signup extends Component {

    constructor(){
        super()
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError: ''
        }
    }


    submitSignup = (e) => {
        e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    
        if(!this.formIsValid()) {
          this.setState({ signupError: 'Passwords do not match' });
          return;
        }
    
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(authRes => {
            const userObj = {
              email: authRes.user.email,
            };
            firebase
              .firestore()
              .collection('users')
              .doc(this.state.email)
              .set(userObj)
              .then(() => {
                this.props.history.push('/dashboard');
            }, dbErr => {
              console.log('Failed to add user to the database: ', dbErr);
              this.setState({ signupError: 'Failed to add user' });
            });
        }, authErr => {
          console.log('Failed to create user: ', authErr);
          this.setState({ signupError: 'Failed to add user' });
        });
      };

    formIsValid = () => this.state.password === this.state.passwordConfirmation

    userTyping = (whichInput, event) => {
        switch (whichInput) {
          case 'email':
            this.setState({ email: event.target.value });
            break;
    
          case 'password':
            this.setState({ password: event.target.value });
            break;
    
          case 'passwordConfirmation':
            this.setState({ passwordConfirmation: event.target.value });
            break;
    
          default:
            break;
        }
      }

    render() {

        const { classes } = this.props

        return (
          <main className ={ classes.main}>
               <CssBaseline></CssBaseline>
               <Paper className ={classes.paper}>
                   <Typography component="h1" variant="h5">
                        Sign Up!
                   </Typography>
                   <form onSubmit={(e) => this.submitSignup(e)} className ={classes.form}>
                       <FormControl require fullWidth margin='normal'>
                            <InputLabel htmlFor="signup-email-input" > Enter Your email</InputLabel>
                            <Input autoFocus autoComplete='email' id="signup-email-input" onChange={(e) => this.userTyping('email',e)}></Input>
                       </FormControl>
                       <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping('password', e)} id='signup-password-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Your Password</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping('passwordConfirmation', e)} id='signup-password-confirmation-input'></Input>
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Submit</Button>
                   </form>
                   {
                       this.state.signupError ? 
                       <Typography className={classes.errorText} component="h5" variant="h6">
                           {this.state.signupError}
                       </Typography>:
                       null
                   }
                   <Typography component="h5" variant="h6" className={classes.hasAccountHeader}>Already Have an account?</Typography>
                   <Link className={classes.LogInLink} to='/login'> Log In!</Link>
               </Paper>
          </main>
        )
    }
}

export default withStyles(styles)(Signup)
 