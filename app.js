import Express, { Router } from "express";
import recipesRoutes from "./controllers/recipes.js";
import cors from "cors";
import pkg from "pg";

const port = 8001;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/recipes/", recipesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
