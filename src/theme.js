import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue["500"],
      main: blue["700"],
      dark: blue["900"],
    },
    background: {
      paper: "#fdfdfd",
      default: "#fdfdfd",
    },
  },
});

export default theme;
