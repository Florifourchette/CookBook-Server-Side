import pool from "../database/pg.js";

const getRecipes = async (req, res) => {
  const { rows: recipes } = await pool.query("SELECT * FROM recipes");
  res.json(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { rows: recipes } = await pool.query(
    "SELECT * FROM recipes WHERE id = $1",
    [id]
  );
  res.json(recipes);
};

export { getRecipes, getRecipe };
