import pool from "../database/pg.js";
import { getRecipes } from "./recipes.js";

const getCategories = async (req, res) => {
  const { rows: categories } = await pool.query("SELECT * FROM categories");
  res.json(categories);
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const { rows: recipes } = await pool.query(
    "SELECT * FROM recipes WHERE category_id=$1",
    [id]
  );
  res.json(recipes);
};

export { getCategories, getCategory };
