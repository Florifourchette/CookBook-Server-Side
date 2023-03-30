import { Router } from "express";
import { getCategories, getCategory } from "../models/categories.js";

const categoriesRoutes = Router();

categoriesRoutes.route("/").get(getCategories);
categoriesRoutes.route("/:id").get(getCategory);

export default categoriesRoutes;
