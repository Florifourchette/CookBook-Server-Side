import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  deleteRecipe,
  editRecipe,
} from "../models/recipes.js";

const recipesRoutes = Router();

recipesRoutes.route("/").get(getRecipes);
recipesRoutes.route("/:id").get(getRecipe);
recipesRoutes.route("/:id").put(editRecipe);
recipesRoutes.route("/:id").delete(deleteRecipe);

export default recipesRoutes;
