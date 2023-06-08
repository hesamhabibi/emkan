import fa from "./fa";
import en from "./en";

const translation = (locale) => {
  const lang = locale === "fa" ? fa : en;
  return (str, app = null) => {
    if (app) {
      try {
        return lang[app][str] ?? str;
      } catch (e) {}
    }
    return lang[str] || str;
  };
};

export default translation;
