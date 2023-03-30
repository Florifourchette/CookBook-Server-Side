import pool from "../database/pg.js";

const getRecipes = async (req, res, next) => {
  try {
    const { rows: recipes } = await pool.query("SELECT * FROM recipes");
    return res.json(recipes);
  } catch (error) {
    return next((error.message = "RECIPE_NOT_FOUND"));
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { rows: recipes } = await pool.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );
    return res.json(recipes);
  } catch (error) {
    return next((error.message = "RECIPE_NOT_FOUND"));
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const {
      recipetitle,
      shortdescription,
      longdescription,
      recipepicture,
      steps,
      ingredient,
      vegan,
    } = req.body;

    if (
      !recipetitle ||
      !shortdescription ||
      !longdescription ||
      !steps ||
      !ingredient
    ) {
      throw Error();
    }

    const { rows: newRecipe } = await pool.query(
      "INSERT INTO recipes (recipetitle, shortdescription, longdescription, recipepicture, steps, ingredient, vegan) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        recipetitle,
        shortdescription,
        longdescription,
        recipepicture,
        steps,
        ingredient,
        vegan,
      ] //pg module checks the values
    );
    return res.status(201).json(newRecipe);
  } catch (error) {
    return next((error.message = "RECIPE_INVALID_ENTRIES"));
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows: recipes } = await pool.query(
      //await replacement for dot then
      "DELETE FROM recipes WHERE id = $1",
      [id]
    );
    return res.json(recipes);
  } catch (error) {
    return next((error.message = "RECIPE_NOT_DELETED"));
  }
};

export { getRecipes, createRecipe, getRecipe, deleteRecipe };
