import Express, { Router } from "express";
import recipesRoutes from "./controllers/recipes.js";
import categoriesRoutes from "./controllers/categories.js";
import cors from "cors";
import pkg from "pg";

const port = 8001;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/recipes/", recipesRoutes);
app.use("/categories/", categoriesRoutes);

app.use((error, req, res, next) => {
  const errorMessages = [
    "RECIPE_NOT_FOUND",
    "RECIPE_INVALID_ENTRIES",
    "RECIPE_NOT_DELETED",
    "RECIPE_NOT_UPDATED",
  ];

  if (errorMessages.includes(error)) {
    switch (error) {
      case "RECIPE_NOT_FOUND":
        res.status(404).json("We could not find what you were looking for");
        break;
      case "RECIPE_INVALID_ENTRIES":
        console.log(error.message);
        res.status(400).json("Invalid entries");
        break;
      case "RECIPE_NOT_DELETED":
        res.status(400).json("This recipe does not exist");
        break;
      case "RECIPE_NOT_UPDATED":
        res.status(400).json("Wrong input, please modify");
        break;
      default:
        res.status(500).json("Contact administrator");
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
