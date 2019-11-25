import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Image } from "../../components/common";

const styles = {
  bg: {
    height: "40rem",
    border: "dotted blue 2px"
  }
};

const HomePageComponent = props => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginTop: "8rem",
        position: "relative",
        textAlign: "center"
      }}
      className="container"
    >
      <Image
        showSpinner={false}
        src={
          "https://res.cloudinary.com/dbfv0bfmw/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1573858024/AEOVJABS.jpg"
        }
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%"
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>LLEAP Voice Controller</h1>
        <h3
          style={{
            fontSize: "1rem",
            color: "#585858",
            width: "75%",
            margin: "0 auto"
          }}
        >
          LLEAP means Laederal Learning Application. It's the instructors
          software for operating simulator training using a Laederal patient
          simulator!
        </h3>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  mobile: state.mobile
});

const ConnectedHomePage = connect(mapStateToProps, null)(HomePageComponent);

export const HomePage = {
  component: withStyles(styles)(ConnectedHomePage)
};
