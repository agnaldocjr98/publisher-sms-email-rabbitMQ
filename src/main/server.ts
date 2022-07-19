import "module-alias/register";
import app from "./config/app";
import dotenv from "dotenv";

import path from "path";
import moduleAlias from "module-alias";

moduleAlias.addAlias("@", path.join(__dirname, "../"));

dotenv.config();

app.listen(process.env.NODE_PORT, async () => {
  console.log(`Publisher API Online - Porta: ${process.env.NODE_PORT}`);
});
