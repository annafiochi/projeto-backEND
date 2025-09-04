import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ShelfController {
  // GET /shelves
  async getAllShelves(req, res) {
    try {
      const shelves = await prisma.shelf.findMany({
        include: {
          books: true // inclui os livros da prateleira
        }
      });
      res.json(shelves);
    } catch (error) {
      console.error("Erro ao buscar as prateleiras:", error);
      res.status(500).json({ error: "Erro ao buscar as prateleiras" });
    }
  }

  // GET /shelves/:id
  async getShelfById(req, res) {
    try {
      const { id } = req.params;

      const shelf = await prisma.shelf.findUnique({
        where: { id: parseInt(id) },
        include: {
          books: true
        }
      });

      if (!shelf) {
        return res.status(404).json({ error: "Prateleira não encontrada!" });
      }

      res.json(shelf);
    } catch (error) {
      console.error("Erro ao buscar prateleira:", error);
      res.status(500).json({ error: "Erro ao buscar prateleira!" });
    }
  }

  // POST /shelves
  async createShelf(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          error: "O campo nome é obrigatório",
        });
      }

      const newShelf = await prisma.shelf.create({
        data: {
          name,
          description
        }
      });

      res.status(201).json({
        message: "Prateleira criada com sucesso",
        shelf: newShelf,
      });
    } catch (error) {
      console.error("Erro ao criar prateleira:", error);
      res.status(500).json({ error: "Erro ao criar prateleira" });
    }
  }

  // PUT /shelves/:id
  async updateShelf(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updatedShelf = await prisma.shelf.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description
        }
      });

      res.json(updatedShelf);
    } catch (error) {
      console.error("Erro ao atualizar prateleira:", error);
      res.status(500).json({ error: "Erro ao atualizar prateleira!" });
    }
  }

  // DELETE /shelves/:id
  async deleteShelf(req, res) {
    try {
      const { id } = req.params;

      await prisma.shelf.delete({
        where: { id: parseInt(id) }
      });

      res.status(200).json({
        message: "Prateleira removida com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover prateleira:", error);
      res.status(500).json({ error: "Erro ao remover prateleira!" });
    }
  }
}

export default new ShelfController();