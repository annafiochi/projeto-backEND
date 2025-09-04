import express from "express";

// Importar todas as rotas
import bookRouter from "./bookRoutes.js";

const router = express.Router();

// Rotas públicas

router.use("/books", bookRouter);

// Rotas protegidas

export default router;
