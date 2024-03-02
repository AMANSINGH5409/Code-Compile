import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const RenderCode = () => {
  const { fullCode } = useSelector((state: RootState) => state.compiler);

  const combineCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}<script>${fullCode.javascript}</script></body></html>`;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combineCode
  )}`;

  return (
    <div className="h-full bg-white">
      <iframe className="h-full w-full" src={iframeCode} />
    </div>
  );
};

export default RenderCode;
