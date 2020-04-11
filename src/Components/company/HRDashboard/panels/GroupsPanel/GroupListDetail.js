import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const GroupListDetail = (props) => {
  const { id, name, evaluator, registrations, onRemoveRegistration, onEdit, onDelete } = props;

  const deleteGroup = () => {
    const group = {
      id,
      name,
      evaluator,
    };
    onDelete(group);
  };

  const editGroup = () => {
    const group = {
      id,
      name,
      evaluator,
      candidates: registrations.map((registration) => registration.id),
    };
    onEdit(group);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={10}>
        {evaluator ? (
          <Typography>
            Evaluator: {evaluator["first_name"]} {evaluator["last_name"]}
          </Typography>
        ) : (
          <Typography color="error">No evaluator assigned. Edit the group to assign an evaluator.</Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        <ButtonGroup fullWidth>
          <Button color="primary" startIcon={<EditIcon />} onClick={editGroup}>
            Edit
          </Button>
          <Button color="secondary" startIcon={<DeleteIcon />} onClick={deleteGroup}>
            Delete
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Candidates:</Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {registrations.map((registration) => (
            <div>
              <ListItem>
                <ListItemText>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      {registration.candidate["first_name"]} {registration.candidate["last_name"]}
                    </Grid>
                    <Grid item xs={9}>
                      {registration.candidate["email"]}
                    </Grid>
                  </Grid>
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <RemoveCircleOutlineIcon color="secondary" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default GroupListDetail;
