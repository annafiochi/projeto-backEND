import express from 'express';
import UserController from '../controllers/userController.js';

const userRouter = express.Router();

// Rotas de Usuários
// GET /usuarios - Listar todos os usuários
userRouter.get('/', UserController.getAllUsers);

// GET /usuarios/:id - Obter um usuário pelo ID
userRouter.get('/:id', UserController.getUserById);

// POST /usuarios - Criar um novo usuário
userRouter.post('/', UserController.createUser);

// PUT /usuarios/:id - Atualizar um usuário
userRouter.put('/:id', UserController.updateUser);

// DELETE /usuarios/:id - Remover um usuário
userRouter.delete('/:id', UserController.deleteUser);

// GET /usuarios/:id/livros/:status - Obter livros de um usuário por status
userRouter.get('/:id/livros/:status', UserController.getUserBooksByStatus);

// GET /usuarios/:id/estantes - Obter estantes de um usuário
userRouter.get('/:id/estantes', UserController.getUserShelves);

export default userRouter;
