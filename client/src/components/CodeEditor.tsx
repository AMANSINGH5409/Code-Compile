import ReactCodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage, langNames } from "@uiw/codemirror-extensions-langs";

const CodeEditor = () => {
  const [value, setValue] = useState("console.log('hello world!');");

  const onChange = useCallback((val: any) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  console.log(langNames);

  return (
    <ReactCodeMirror
      value={value}
      height="100vh"
      extensions={[loadLanguage("javascript")!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
};

export default CodeEditor;
