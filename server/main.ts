import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import db from "./plugins/db";
import good from "./routes/good";
import auth from "./routes/auth";
import user from "./routes/user";

const app = express();

app.set("secret", "jf389u3cosidufq0e3");

app.use(cors());
app.use(express.json());

db(app);

good(app);
auth(app);
user(app);

app.use(errorHandler());
app.listen(4000, () => {
  console.log("http://localhost:4000");
});
