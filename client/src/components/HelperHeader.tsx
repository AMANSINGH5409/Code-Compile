import { Code, Copy, Loader2, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HelperHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { codeId } = useParams();
  const [saveLoading, setSaveLoading] = useState(false);
  const { currentLanguage, fullCode } = useSelector(
    (state: RootState) => state.compiler
  );

  const handleLangChange = (
    lang: CompilerSliceStateType["currentLanguage"]
  ) => {
    dispatch(updateCurrentLanguage(lang));
  };

  const handleCodeSave = async () => {
    try {
      setSaveLoading(true);
      const response = await axios.post("http://localhost:3000/compiler/save", {
        fullCode,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate(`/compiler/${response.data.url}`, { replace: true });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCodeUrlCopy = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("URL Copied to Clipboard");
  };

  return (
    <div className="__helper_header h-[50px] flex justify-between items-center bg-black text-white p-2">
      <div className="__btn_container flex items-center gap-4">
        <Button
          onClick={handleCodeSave}
          className="flex justify-center items-center gap-1"
          variant={"success"}
        >
          {saveLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}{" "}
          {saveLoading ? "Saving..." : "Save"}
        </Button>

        {codeId && (
          <Dialog>
            <DialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1">
              <Share2 size={16} /> Share
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-2 justify-center items-center">
                  <Code /> Share your code !!
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <div className="__url flex gap-1 items-center">
                    <input
                      type="text"
                      disabled
                      className="w-full px-2 py-2 rounded-lg bg-slate-800 text-slate-400 select-none"
                      value={window.location.href}
                    />
                    <Button onClick={handleCodeUrlCopy} variant={"outline"}>
                      <Copy size={16} />
                    </Button>
                  </div>
                  <p className="text-center">
                    Share this URL with your friends to collaborate.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="__tab_select flex items-center gap-1">
        <p className="text-sm font-semibold">Current Language:</p>
        <Select defaultValue={currentLanguage} onValueChange={handleLangChange}>
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;
