import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  deleteRecipe,
<<<<<<< HEAD
  createRecipe,
=======
  editRecipe,
>>>>>>> main
} from "../models/recipes.js";

const recipesRoutes = Router();

recipesRoutes.route("/").get(getRecipes);
recipesRoutes.route("/").post(createRecipe);
recipesRoutes.route("/:id").get(getRecipe);
recipesRoutes.route("/:id").put(editRecipe);
recipesRoutes.route("/:id").delete(deleteRecipe);

export default recipesRoutes;
