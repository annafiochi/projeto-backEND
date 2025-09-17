import UserModel from "../models/userModel.js";

class UserController {
  // GET /usuarios
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  // GET /usuarios/:id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro ao buscar usuário!" });
    }
  }

  // POST /usuarios
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          error: "Os campos name, email e password são obrigatórios",
        });
      }

      const newUser = await UserModel.create(name, email, password);

      if (!newUser) {
        return res.status(400).json({ error: "Erro ao criar usuário" });
      }

      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: newUser,
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  // PUT /usuarios/:id
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updatedUser = await UserModel.update({
        id,
        name,
        email,
        password,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "Usuário não encontrado para atualização" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário!" });
    }
  }

  // DELETE /usuarios/:id
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await UserModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.status(200).json({
        message: "Usuário removido com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      res.status(500).json({ error: "Erro ao remover usuário!" });
    }
  }

  // GET /usuarios/:id/livros/:status
  async getUserBooksByStatus(req, res) {
    try {
      const { id, status } = req.params;
      
      const books = await UserModel.findBooksByStatus(id, status);
      res.json(books);
    } catch (error) {
      console.error("Erro ao buscar livros por status:", error);
      res.status(500).json({ error: "Erro ao buscar livros por status" });
    }
  }

  // GET /usuarios/:id/estantes
  async getUserShelves(req, res) {
    try {
      const { id } = req.params;
      
      const shelves = await UserModel.findUserShelves(id);
      res.json(shelves);
    } catch (error) {
      console.error("Erro ao buscar estantes:", error);
      res.status(500).json({ error: "Erro ao buscar estantes do usuário" });
    }
  }
}

export default new UserController();
