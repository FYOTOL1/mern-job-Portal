import mongoose from "mongoose";

const MONGO_URL =
  "mongodb+srv://fyotol:fyotol2008@jobportal.p7b2vms.mongodb.net/job-portal?retryWrites=true&w=majority&appName=jobPortal";
async function connect() {
  try {
    await mongoose.connect(MONGO_URL).then(() => {
      console.log("Connected DB");
    });
  } catch (error) {
    console.log("DB Error", error);
  }
}
export default connect;
