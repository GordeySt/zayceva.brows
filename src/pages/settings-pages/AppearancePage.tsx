import {
  alpha,
  Grid,
  Theme,
  Typography,
  FormControl,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { MAX_TABLET_WIDTH } from "../../common/constants/AdaptiveConstants";
import { THEMES } from "../../common/constants/ThemeConstants";
import { useStore } from "../../common/stores/Store";
import OneByTwoGrid from "../../components/settings-pages/OneByTwoGrid";
import SingleRowGrid from "../../components/settings-pages/SingleRowGrid";
import ThemeCard from "../../components/settings-pages/ThemeCard";
import { makeCustomThemeFromThemeType } from "./utils/functions";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    margin: "0 auto",

    [theme.breakpoints.down(MAX_TABLET_WIDTH)]: {
      width: "100%",
    },
  },
  sectionHeader: {
    fontSize: 13,
    color: alpha(theme.palette.text.primary, 0.4),
    textTransform: "uppercase",
    fontWeight: 500,
    lineHeight: "normal",
    fontFamily: "Google Sans",
    marginBottom: theme.spacing(1.5),
    paddingBottom: 0,
    padding: theme.spacing(1.5, 2),
  },
  previewContainer: {
    position: "relative",
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
    border: "1px solid " + alpha(theme.palette.divider, 0.1),

    [theme.breakpoints.up(MAX_TABLET_WIDTH)]: {
      borderRadius: 8,
      marginTop: theme.spacing(4),
    },
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 12,
    paddingBottom: theme.spacing(1.5),
    border: "1px solid " + alpha(theme.palette.divider, 0.1),

    [theme.breakpoints.up(MAX_TABLET_WIDTH)]: {
      borderRadius: 8,
    },
  },
  themeCardsContainer: {
    whiteSpace: "nowrap",
    flexDirection: "row",
    alignItems: "baseline",
    display: "flex",
    flexWrap: "nowrap",
  },
  dividerHolder: {
    display: "inline-flex",
    flexDirection: "column",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    position: "absolute",
    height: 96,
  },
}));

const AppearancePage = () => {
  const classes = useStyles();

  const {
    commonStore: { setAppBarTitle, setShowMobileMenu, setShowGoBackButton },
  } = useStore();

  useEffect(() => {
    setAppBarTitle("Внешний вид");
    setShowMobileMenu(false);
    setShowGoBackButton(true);

    return () => {
      setShowMobileMenu(true);
      setShowGoBackButton(false);
    };
  }, [setAppBarTitle, setShowMobileMenu, setShowGoBackButton]);

  return (
    <div className={classes.root}>
      <Grid container className={classes.previewContainer} direction="row">
        <Typography className={classes.sectionHeader}>Палитра</Typography>
        <SingleRowGrid />
        <OneByTwoGrid />
      </Grid>
      <div className={classes.section}>
        <Typography className={classes.sectionHeader}>Темы</Typography>
        <FormControl
          component="fieldset"
          aria-label="theme-type"
          name="theme-type"
          className={classes.themeCardsContainer}
        >
          {THEMES.map((theme, i) => (
            <ThemeCard key={i} theme={makeCustomThemeFromThemeType(theme)} />
          ))}
          <div className={classes.dividerHolder}>
            <Divider className={classes.divider} orientation="vertical" />
          </div>
        </FormControl>
      </div>
    </div>
  );
};

export default AppearancePage;
