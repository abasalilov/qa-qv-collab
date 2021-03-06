import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  ref: {
    margin: "2rem",
    textDecoration: "none",
    color: "#000",
    paddingTop: "2rem"
  },
  section: { marginTop: "1rem" },
  links: { display: "flex", justifyContent: "center", margin: "2rem 1rem" }
};

const ScenesPageComponent = props => {
  const { classes } = props;
  return (
    <section className={classes.section} id="terms">
      <div>Scenes</div>
    </section>
  );
};

export const ScenesPage = {
  component: withStyles(styles)(ScenesPageComponent)
};

ScenesPageComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
