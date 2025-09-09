import ShelfModel from "../models/shelfModel.js";

class ShelfController {
  // GET /shelves
  async getAllShelves(req, res) {
    try {
      const shelves = await ShelfModel.findAll();
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

      const shelf = await ShelfModel.findById(id);

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

      const newShelf = await ShelfModel.create(name, description);

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

      const updatedShelf = await ShelfModel.update({
        id,
        name,
        description
      });

      if (!updatedShelf) {
        return res.status(404).json({ error: "Prateleira não encontrada para atualização" });
      }

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

      const result = await ShelfModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Prateleira não encontrada" });
      }

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