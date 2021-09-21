import { Box } from "@material-ui/core";
import {
  createStyles,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";
import { useStore } from "./common/stores/Store";
import { StartPage } from "./pages/start-page/StartPage";
import { useEffect } from "react";
import { IUserThemeSettings } from "./common/stores/CommonStore";
import { USER_THEME_SETTINGS } from "./common/constants/localStorageConstants";
import { grey } from "@material-ui/core/colors";
import React from "react";

interface IStyleProps {
  isDarkMode: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    boxContainer: ({ isDarkMode }: IStyleProps) => ({
      backgroundColor: isDarkMode ? "#0e0e0e" : grey["100"],
    }),
  })
);

const App = observer(() => {
  const {
    commonStore: {
      userThemeSettings: { isDarkMode },
      setUserThemeSettings,
      storeTheme,
    },
  } = useStore();

  const classes = useStyles({ isDarkMode });
  const muiTheme = createTheme(storeTheme);

  useEffect(() => {
    const userThemeSettings: IUserThemeSettings = JSON.parse(
      localStorage.getItem(USER_THEME_SETTINGS)!
    );

    if (userThemeSettings) {
      setUserThemeSettings(userThemeSettings);
    }
  }, [setUserThemeSettings]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Box className={classes.boxContainer}>
        <StartPage />
      </Box>
    </ThemeProvider>
  );
});

export default App;
