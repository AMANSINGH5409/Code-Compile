import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Compiler = () => {
  const { codeId } = useParams();
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/compiler/load", {
        codeId,
      });

      if (response.status === 200) {
        dispatch(updateFullCode(response.data.fullCode));
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (codeId) {
      loadCode();
    }
  }, [codeId]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;
