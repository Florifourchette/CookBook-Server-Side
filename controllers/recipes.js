import { Router } from "express";
import { getRecipes, getRecipe } from "../models/recipes.js";

const recipesRoutes = Router();

recipesRoutes.route("/").get(getRecipes);
recipesRoutes.route("/:title").get(getRecipe);

export default recipesRoutes;
