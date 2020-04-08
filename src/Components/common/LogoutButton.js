import React from "react";
import { logout } from "../../utils/utils";

import Button from "@material-ui/core/Button";

const LogoutButton = () => (
  <Button color="inherit" onClick={logout}>
    Logout
  </Button>
);

export default LogoutButton;
