import { Router } from "express";
import { getCategories, getCategory, createCategory } from "../models/categories.js";

const categoriesRoutes = Router();

categoriesRoutes.route("/").get(getCategories);
categoriesRoutes.route("/").post(createCategory);
categoriesRoutes.route("/:id").get(getCategory);


export default categoriesRoutes;
