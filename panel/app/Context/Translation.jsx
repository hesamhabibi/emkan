import React from "react";
import { useRouter } from "next/router";
import translation from "~/app/Translation";

export const TranslationContext = React.createContext(
  (string, options = null) => string
);

export default function Translation({ children }) {
  const router = useRouter();
  if (router.defaultLocale === "en") {
    router.defaultLocale = "fa";
    router.locale = "fa";
  }

  return (
    <TranslationContext.Provider value={translation(router.locale)}>
      {children}
    </TranslationContext.Provider>
  );
}
