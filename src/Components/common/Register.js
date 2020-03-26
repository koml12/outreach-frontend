import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

const Register = props => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Typography variant="h5">Register Here:</Typography>
      </Grid>
      <Grid item xs={3} />

      <Grid item xs={3} />
      <Grid item xs={3}>
        <TextField id="standard-basic" label="First Name" name="first_name" onChange={props.onInputChange} />
      </Grid>
      <Grid item xs={3}>
        <TextField id="standard-basic" label="Last Name" name="last_name" onChange={props.onInputChange} />
      </Grid>
      <Grid item xs={3} />

      <Grid item xs={3} />
      <Grid item xs={3}>
        <TextField
          id="standard-basic"
          type="date"
          label="Birthdate"
          name="birthdate"
          defaultValue={dayjs().format("YYYY-MM-DD")}
          onChange={props.onInputChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField id="standard-basic" label="Phone Number" name="Phone Number" onChange={props.onInputChange} />
      </Grid>
      <Grid item xs={3} />

      <Grid item xs={3} />
      <Grid item xs={9}>
        <TextField id="standard-basic" label="Email" name="email" onChange={props.onInputChange} />
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9}>
        <TextField
          id="standard-basic"
          label="Password"
          type="password"
          name="password"
          onChange={props.onInputChange}
        />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Button variant="contained" onClick={props.onRegister}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
