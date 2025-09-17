import express from "express";

// Importar todas as rotas
import bookRouter from "./bookRoutes.js";
import shelfRouter from "./shelfRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

// Rotas públicas
router.use("/livros", bookRouter); // Mudando para português
router.use("/estantes", shelfRouter); // Mudando para português  
router.use("/usuarios", userRouter);

// Rotas antigas para compatibilidade
router.use("/books", bookRouter);
router.use("/shelves", shelfRouter);

// Rotas protegidas

export default router;
