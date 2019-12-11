import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
// import SpeechRecognition from "react-speech-recognition";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Typography from "@material-ui/core/Typography";
import { TranscriberComponent } from "./Transcriber";

const iconStyle = {
  color: "#1260DF !important",
  fontSize: "3rem",
  borderRadius: "50%",
  border: "solid #1260DF 1px"
};

class Voice extends React.Component {
  constructor(props) {
    super(props);

    let compatible = true;
    this.recognition = null;
    this.wordTranscriptions = props.data || {};
    this.state = {
      recognized: "",
      transcribed: "",
      compatible,
      isRecording: false,
      rawData: []
    };

    this.beginRecognition = this.beginRecognition.bind(this);
    this.resetTranscript = this.resetTranscript.bind(this);
    this.setupRecognition = this.setupRecognition.bind(this);
  }

  async componentDidMount() {
    // if (this.props.dataPath) {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("get", this.props.dataPath, true);
    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //       if (xhr.status === 200) {
    //         this.wordTranscriptions = JSON.parse(xhr.responseText);
    //       } else {
    //         console.log("error");
    //       }
    //     }
    //   };
    //   xhr.send();
    // }
    this.setupRecognition();
  }

  transcribe(recognized) {
    // check if the whole string is in the dictionary
    console.log("recognized", recognized);
    const noSpaces = recognized.replace(/\s/g, "").toUpperCase();
    if (this.wordTranscriptions[noSpaces]) {
      if (this.props.wrapTokens) {
        return this.props.wrapTokens.replace(
          "%s",
          this.wordTranscriptions[noSpaces]
        );
      } else {
        return this.wordTranscriptions[noSpaces];
      }
    }

    // check words
    const buffer = [];
    recognized.split(" ").forEach(word => {
      if (!word) {
        buffer.push(" ");
        return;
      }
      const wordUpper = word.toUpperCase();

      // check if word is in the dictionary
      let transcribed = this.wordTranscriptions[wordUpper];

      // if all uppercase, it's probably an acronym
      if (!transcribed && word === wordUpper) {
        transcribed = "";
        for (let i = 0; i < word.length; i++) {
          // append the transcription for each letter-word
          transcribed +=
            this.wordTranscriptions[word.charAt(i)] || word.charAt(i);
        }
      }

      // wrap known tokens
      if (transcribed && this.props.wrapTokens) {
        console.log("wrapping tokens", transcribed, this.props.wrapTokens);
        transcribed = this.props.wrapTokens.replace("%s", transcribed);
      }

      // wrap unknown tokens
      if (!transcribed && this.props.wrapUnknown) {
        console.log("wrapping unknown", word, this.props.wrapUnknown);
        word = this.props.wrapUnknown
          .replace("<", "&lt;")
          .replace(">", "&gt;")
          .replace("%s", word);
      }

      buffer.push(transcribed || word);
    });
    return buffer.join(" ");
  }

  setupRecognition() {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onend = this.finishRecognition.bind(this);
    recognition.onresult = this.finishRecognition.bind(this);
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    this.recognition = recognition;
    console.log("recognitioin", recognition);
  }

  beginRecognition() {
    if (this.state.isRecording) {
      console.log("about to turn off");
      this.finishRecognition();
    } else {
      console.log("starting here");
      this.recognition.onresult = this.processRecognition.bind(this);
      this.recognition.onend = this.finishRecognition.bind(this);
      this.recognition.start();
      this.setState({
        isRecording: true
      });
    }
  }

  async processRecognition(event) {
    if (!event.results) {
      this.setState({
        recognized: "error",
        transcribed: ""
      });
    } else {
      const recognized = event.results[event.results.length - 1][0].transcript;
      const transcribed = this.transcribe(recognized);
      this.setState({
        recognized:
          event.results.length === 1
            ? recognized
            : this.state.recognized + recognized,
        transcribed:
          event.results.length === 1
            ? transcribed
            : this.state.transcribed + transcribed
      });

      if (this.props.onTranscription) {
        this.props.onTranscription.call(null, recognized, transcribed);
      }
    }
    this.setState({ rawData: event.results });

    await this.props.quark(
      this.state.transcribed,
      formatRawData(this.state.rawData),
      0
    );
  }

  resetTranscript() {
    this.setState({ transcribed: "" });
  }

  finishRecognition(event) {
    this.recognition.onend = this.recognition.onresult = null;
    this.recognition.stop();
  }

  render() {
    const { isRecording, compatible } = this.state;
    const { feedback, actions = [] } = this.props.voice;
    const hasFB = feedback.utterance && feedback.utterance.length > 0;
    const hasActions = actions.length > 0;

    if (!compatible) {
      return (
        <div>
          Voice Transcription Not Supported on this Browser, try Chrome.
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: "60rem",
            marginTop: "8rem"
          }}
        >
          <br />
          {isRecording ? (
            <Typography
              variant="h6"
              align="left"
              style={{ marginBottom: "2rem", color: "red" }}
            >
              Voice entry mode active now
            </Typography>
          ) : (
            <Typography
              variant="h6"
              align="left"
              style={{ marginBottom: "2rem", color: "#1260DF" }}
            >
              Voice entry mode inactive, click mic icon to begin.
            </Typography>
          )}
          <div style={{ border: "2px solid #1260DF" }}>
            <p>
              <Typography variant="h6" align="left" style={{ margin: "1rem" }}>
                Transcribed :
                <span className="result">{` ${this.state.transcribed}`}</span>
              </Typography>
            </p>
            <br /> <br />
          </div>
          <br />
          <div
            style={{ height: "30px", display: "flex", flexDirection: "row" }}
          >
            <div
              style={{ width: "auto", color: "white", fontFamily: "Open Sans" }}
            >
              <IconButton
                aria-label="Toggle Mic"
                onClick={this.beginRecognition}
                disableRipple={true}
                style={{
                  margin: "0 1rem 1rem 0"
                }}
              >
                {isRecording ? (
                  <MicOff style={iconStyle} />
                ) : (
                  <Mic style={iconStyle} />
                )}
              </IconButton>
              ;
            </div>
            <br />
            <ul>
              <button
                style={{
                  marginLeft: "40px",
                  width: "auto",
                  color: "black",
                  fontFamily: "Open Sans",
                  textAlign: "center"
                }}
                onClick={this.resetTranscript}
              >
                <Typography variant="h6" align="center">
                  x Clear
                </Typography>
              </button>
              <br />
            </ul>
          </div>
          {hasFB && (
            <div style={{ border: "2px solid red", marginTop: "4rem" }}>
              <p>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ margin: "1rem" }}
                >
                  Utterance:
                  <span className="result">{` ${feedback.utterance}`}</span>
                </Typography>
              </p>
            </div>
          )}
          {hasActions && (
            <div style={{ border: "2px solid red", marginTop: "4rem" }}>
              <p>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ margin: "1rem" }}
                >
                  Actions:
                </Typography>
                {actions.map(a => {
                  const keys = Object.keys(a);
                  return keys.map(k => {
                    return (
                      <div style={{ margin: "1rem" }}>
                        <span className="result">{`${k}: ${a[k]}`}</span>
                      </div>
                    );
                  });
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Voice.defaultProps = {
  textStart: "Start",
  textStop: "Stop ",
  textUnsupported: "⚠ Your browser does not support Speech Recognition.",
  wrapTokens: "",
  wrapUnknown: ""
};

const mapDispatchToProps = dispatch => {
  return {
    quark: (utterance, speech, convid) => {
      dispatch(actions.submitQuarkReq(utterance, speech, convid));
    }
  };
};

function mapStateToProps(state) {
  return { result: state.result, voice: state.voice };
}

// const asrOptions = {
//   autoStart: false
// };
// const WrappedVoice = SpeechRecognition(asrOptions)(Voice);
export const VoiceComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Voice);

function formatRawData(data) {
  const base = [];
  const keys1 = Object.keys(data);
  keys1.map(k => {
    const keys2 = Object.keys(data[k]);
    keys2.map(e => {
      const { confidence, transcript } = data[k][e];
      console.log("confidence", confidence, typeof confidence);
      console.log("transcript", transcript, typeof transcript);
      base.push({ confidence: confidence.toString(), transcript });
    });
  });
  return base;
}
