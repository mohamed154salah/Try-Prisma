import dotenv from "dotenv";
dotenv.config();
import app from "./server";
import config from "./config/index";
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
