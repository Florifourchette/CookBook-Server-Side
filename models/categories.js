import pool from "../database/pg.js";
import { getRecipes } from "./recipes.js";

const getCategories = async (req, res, next) => {
  try {
    const { rows: categories } = await pool.query("SELECT * FROM categories");
    res.json(categories);
  } catch (error) {
    next((error.message = "RECIPE_NOT_FOUND"));
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows: recipes } = await pool.query(
      "SELECT * FROM recipes WHERE category_id=$1",
      [id]
    );
    return res.json(recipes);
  } catch (error) {
    return next((error.message = "RECIPE_NOT_FOUND"));
  }
};

export { getCategories, getCategory };
