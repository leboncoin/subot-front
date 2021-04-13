import React from 'react';
import './App.css';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";

function Theme(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#ff6e14'
          },
          secondary: {
            main: '#4183d7',
          }
        },
      }),
    [prefersDarkMode],
  );
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}

export default Theme;
