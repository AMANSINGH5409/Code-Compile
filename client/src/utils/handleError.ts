import toast from "react-hot-toast";

export const handleError = (error: any) => {
  console.log(error?.response);
  toast.error(error?.message ?? "Something went wrong.");
};
