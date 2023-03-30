import pool from "../database/pg.js";
import { getRecipes } from "./recipes.js";

const getCategories = async (req, res) => {
  try {
    const { rows: categories } = await pool.query("SELECT * FROM categories");
    res.json(categories);
  } catch (e) {
    console.log(e);
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: recipes } = await pool.query(
      "SELECT * FROM recipes WHERE category_id=$1",
      [id]
    );
    res.json(recipes);
  } catch (e) {
    console.log(e);
  }
};

export { getCategories, getCategory };
