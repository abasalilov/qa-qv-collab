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

const ParametersPageComponent = props => {
  const { classes } = props;
  return (
    <section className={classes.section} id="terms">
      <div>Parameters</div>
    </section>
  );
};

export const ParametersPage = {
  component: withStyles(styles)(ParametersPageComponent)
};

ParametersPageComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
