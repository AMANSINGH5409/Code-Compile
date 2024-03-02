import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import compilerRoute from "./routes/compilerRoutes";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
config();

//Routes
app.use("/compiler", compilerRoute);

dbConnect();
app.listen(3000, () => {
  console.log(
    "http://localhost:3000",
    "\nServer started successfully! Running...."
  );
});
