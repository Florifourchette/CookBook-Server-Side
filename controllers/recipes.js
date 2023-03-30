import { Router } from "express";
import { getRecipes, getRecipe } from "../models/recipes.js";

const recipesRoutes = Router();

recipesRoutes.route("/").get(getRecipes);
recipesRoutes.route("/:id").get(getRecipe);

export default recipesRoutes;
