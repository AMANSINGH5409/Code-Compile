import { Save, Share2 } from "lucide-react";
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

const HelperHeader = () => {
  const dispatch = useDispatch();
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
      const response = await axios.post("http://localhost:3000/compiler/save", {
        fullCode,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="__helper_header h-[50px] flex justify-between items-center bg-black text-white p-2">
      <div className="__btn_container flex items-center gap-4">
        <Button
          onClick={handleCodeSave}
          className="flex justify-center items-center gap-1"
          variant={"success"}
        >
          <Save size={16} /> Save
        </Button>
        <Button
          className="flex justify-center items-center gap-1"
          variant={"secondary"}
        >
          <Share2 size={16} /> Share
        </Button>
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
