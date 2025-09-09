import express from 'express';
import ShelfController from '../controllers/shelfController.js';

const shelfRouter = express.Router();


// Rotas de Estantes
// GET /shelves - Listar todas as Estantes
shelfRouter.get('/', ShelfController.getAllShelves);

// GET /shelves/:id - Obter uma Estante pelo ID
shelfRouter.get('/:id', ShelfController.getShelfById);

// POST /shelves - Criar uma nova Estante
shelfRouter.post('/', ShelfController.createShelf);

// PUT /shelves/:id - Atualizar uma Estante
shelfRouter.put('/:id', ShelfController.updateShelf);

// DELETE /shelves/:id - Remover uma Estante
shelfRouter.delete('/:id', ShelfController.deleteShelf);


export default shelfRouter;