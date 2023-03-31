import pool from "../database/pg.js";
import { getRecipes } from "./recipes.js";

const getCategories = async (req, res, next) => {
  try {
    const { rows: categories } = await pool.query("SELECT * FROM categories");
    res.json(categories);
  } catch (error) {
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
    return next("RECIPES_IN_CATEGORY_NOT_FOUND");
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw Error();
    }

    const { rows: newCategory } = await pool.query(
      "INSERT INTO Categories (name) VALUES ($1) RETURNING *",
      [name] //pg module checks the values
    );
    return res.status(201).json(newCategory);
  } catch (error) {
    return next("CATEGORY_INVALID_ENTRIES");
  }
};

export { getCategories, getCategory, createCategory };
