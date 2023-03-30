import pool from "../database/pg.js";

const getRecipes = async (req, res, next) => {
  try {
    const { rows: recipes } = await pool.query(
      "SELECT * FROM recipes WHERE active=true"
    );
    return res.json(recipes);
  } catch (error) {
    console.log(error.message);
    return next("RECIPE_NOT_FOUND");
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { rows: recipes } = await pool.query(
      "SELECT * FROM recipes WHERE id = $1, active=true",
      [id]
    );
    return res.json(recipes);
  } catch (error) {
    console.log(error.message);
    return next("RECIPE_NOT_FOUND");
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
      "INSERT INTO recipes (recipetitle, shortdescription, longdescription, recipepicture, steps, ingredient, vegan, active) VALUES ($1, $2, $3, $4, $5, $6, $7, true) RETURNING *",
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
    console.log(error.message);
    return next("RECIPE_INVALID_ENTRIES");
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows: recipes } = await pool.query(
      "UPDATE recipes SET active='false' WHERE id=$1",
      [id]
    );
    // const { rows: recipes } = await pool.query(
    //   "DELETE FROM recipes WHERE id = $1",
    //   [id]
    // );
    return res.json(recipes);
  } catch (error) {
    console.log(error.message);
    return next("RECIPE_NOT_DELETED");
  }
};

const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      recipetitle,
      shortdescription,
      longdescription,
      recipepicture,
      steps,
      ingredient,
      vegan,
    } = req.body;
    const {
      rows: [recipe],
    } = await pool.query(
      "UPDATE recipes SET recipetitle=$2, shortdescription=$3, longdescription=$4, recipepicture=$5, steps=$6, ingredient=$7, vegan=$8 WHERE id=$1 RETURNING *",
      [
        id,
        recipetitle,
        shortdescription,
        longdescription,
        recipepicture,
        steps,
        ingredient,
        vegan,
      ]
    );
  } catch (error) {
    console.log(error.message);
    return next("RECIPE_NOT_UPDATED");
  }

  res.json({ recipe });
};

export { getRecipes, getRecipe, deleteRecipe, editRecipe, createRecipe };
