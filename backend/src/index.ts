import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./utils/connectDb";

import userRoute from "./routes/userRoute";
import companyRoute from "./routes/companyRoute";
import jobRoute from "./routes/jobRoute";
import applicationRoute from "./routes/applicationRoute";

const app = express();
const PORT = 3009;
const corsOptions = {
  origin: "https://jobneeded.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  console.log("Connected PORT");
  connect();
});
