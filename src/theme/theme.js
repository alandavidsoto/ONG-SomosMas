import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#DB5752",
      dark: "#982C28",
      light: "#FD938F",
    },
    primary: {
      main: "#629AD6",
      dark: "#629AD6",
      light: "#C8E3FF",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: ".4rem",
      },
    },
  },
});

export default theme;
