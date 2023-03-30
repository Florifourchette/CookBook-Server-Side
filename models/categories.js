import pool from "../database/pg.js";
import { getRecipes } from "./recipes.js";

const getCategories = async (req, res, next) => {
  try {
    const { rows: categories } = await pool.query("SELECT * FROM categories");
    res.json(categories);
  } catch (error) {
    console.log(error.message);
    next("CATEGORY_NOT_FOUND");
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== "undefined") {
      const { rows: recipes2 } = await pool.query(
        "SELECT * FROM recipes WHERE category_id=$1",
        [id]
      );
      return res.json(recipes2);
    } else if (id === "undefined") {
      const { rows: recipes } = await pool.query("SELECT * FROM recipes");
      return res.json(recipes);
    } else {
      return res.json({ error: "nothing found" });
    }
  } catch (error) {
    console.log(error.message);
    return next("RECIPES_IN_CATEGORY_NOT_FOUND");
  }
};

export { getCategories, getCategory };
