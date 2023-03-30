import { Router } from "express";
import {
  getRecipes,
  getRecipe,
  deleteRecipe,
  createRecipe,
} from "../models/recipes.js";

const recipesRoutes = Router();

recipesRoutes.route("/").get(getRecipes);
recipesRoutes.route("/newrecipe").post(createRecipe);
recipesRoutes.route("/:id").get(getRecipe);
recipesRoutes.route("/:id").delete(deleteRecipe);

export default recipesRoutes;
