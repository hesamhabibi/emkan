import React from "react";
import { DeviceView } from "./Device";
import { TranslationContext } from "./Translation";
import { LoadingContext } from "./Loadings";
import { ToastContext } from "~/app/Context/Toast";
import { UserContext } from "~/app/Context/User";
import { InfoContext } from "~/app/Context/InfoHelper";

export {
  DeviceView,
  TranslationContext,
  ToastContext,
  LoadingContext,
  UserContext,
  InfoContext,
};

export const RootElement = React.createContext(null);
