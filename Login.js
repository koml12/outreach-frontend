import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import { makeStyles } from '@material-ui/core/styles';

const styles = { //style object
  Button:{
    margin: 20,
  }
}
/*const styles = makeStyles({ //style object
    root:{
      border:0,
      borderRadius:3,
      height:48,
      padding:'0 30px',
    },
  });
const s = styles();
const useStyles = makeStyles({
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
});*/
const Login = (props) => (
  
  //<Grid justify = "center" alignItems="center">
  <Grid 
    container 
    spacing={5}
    direction="column"
    alignItems="center"
    justify="center"
  >
    <Grid item xs={3} />
    <Grid item xs={9}>
      <Typography variant="h5">Log In Here:</Typography>
    </Grid>
    <Grid item xs={3} />
    <Grid item xs={9}>
      <TextField id="standard-basic" name="username" label="Email" onChange={props.onInputChange} />
    </Grid>

    <Grid item xs={3} />
    {props.variant === "Candidate" ? (
      <Grid item xs={9}>
        <TextField
          id="standard-basic"
          type="date"
          label="Birthdate"
          name="password"
          defaultValue={dayjs().format("YYYY-MM-DD")}
          onChange={props.onInputChange}
        />
      </Grid>
    ) : (
      <Grid item xs={9}>
        <TextField
          id="standard-basic"
          name="password"
          type="password"
          label="Password"
          onChange={props.onInputChange}
        />
      </Grid>
    )}

    <Grid item xs={3} />
    <Grid item xs={9}>
      <Button style = {styles.Button} variant="contained" onClick={props.onLogIn}>
        Log In
      </Button>
    </Grid>
  </Grid>
);

export default Login;
