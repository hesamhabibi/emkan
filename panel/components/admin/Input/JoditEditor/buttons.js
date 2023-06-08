const buttonsMD = [
  "source",
  "bold",
  "italic",
  "ul",
  "ol",
  "eraser",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "image",
  "table",
  "link",
  "align",
  "undo",
  "redo",
  "copyformat",
  // "fullsize",
  "dots",
]

/**
 * The list of buttons that appear in the editor's toolbar on small places (≥ options.sizeSM).
 */
const buttonsSM = [
  "source",
  "bold",
  "italic",
  "ul",
  "ol",
  "eraser",
  "fontsize",
  "brush",
  "paragraph",
  // "image",
  "table",
  "link",
  "align",
  "undo",
  "redo",
  "copyformat",
  // "fullsize",
  "dots",
]

/**
 * The list of buttons that appear in the editor's toolbar on extra small places `(< options.sizeSM)`.
 */
const buttonsXS = [
  "bold",
  // "image",
  "brush",
  "paragraph",
  "eraser",
  "align",
  "undo",
  "redo",
  "dots",
]

const buttons = [
  {
    group: "font-style",
    buttons: [],
  },
  {
    group: "script",
    buttons: [],
  },
  {
    group: "list",
    buttons: ["ul", "ol"],
  },
  {
    group: "indent",
    buttons: [],
  },
  {
    group: "font",
    buttons: [],
  },
  {
    group: "color",
    buttons: [],
  },
  // {
  //   group: "media",
  //   buttons: [],
  // },
  // "file",
  "video",
  {
    group: "state",
    buttons: [],
  },
  {
    group: "clipboard",
    buttons: [],
  },
  {
    group: "insert",
    buttons: [],
  },
  {
    group: "form",
    buttons: [],
  },
  {
    group: "history",
    buttons: [],
  },
  {
    group: "search",
    buttons: [],
  },
  {
    group: "source",
    buttons: [],
  },
  {
    // group: "other",
    buttons: ["print"],
  },
]

export { buttonsXS, buttonsMD, buttonsSM, buttons }
