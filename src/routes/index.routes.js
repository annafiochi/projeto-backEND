import express from "express";

// Importar todas as rotas
import bookRouter from "./bookRoutes.js";
import shelfRouter from "./shelfRoutes.js";

const router = express.Router();

// Rotas públicas

router.use("/books", bookRouter);
router.use("/shelves", shelfRouter);

// Rotas protegidas

export default router;
