import ReactCodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage, langNames } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCodeValue } from "@/redux/slices/compilerSlice";

const CodeEditor = () => {
  const [value, setValue] = useState("console.log('hello world!');");
  const dispatch = useDispatch();
  const { currentLanguage, fullCode, currentCode } = useSelector(
    (state: RootState) => state.compiler
  );

  const onChange = useCallback((value: string) => {
    // console.log("val:", val);
    // setValue(val);
    dispatch(updateCodeValue(value));
  }, []);

  console.log(langNames);

  return (
    <ReactCodeMirror
      value={fullCode[currentLanguage]}
      height="calc(100vh - 110px)"
      extensions={[loadLanguage(currentLanguage)!]}
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
