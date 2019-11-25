import React from "react";
import App from "./App";
import { HomePage, VoicePage, ParametersPage, ScenesPage } from "./pages";

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true
      },
      { ...VoicePage, path: "/VOICE-ACTIVATION", exact: true },
      { ...ParametersPage, path: "/LLEAP-PARAMETERS", exact: true },
      { ...ScenesPage, path: "/SCENES", exact: true }
    ]
  }
];
