import BookModel from "../models/bookModel.js";
import ShelfModel from "../models/shelfModel.js";

class BookController {
  // GET /livros
  async getAllBooks(req, res) {
    try {
      const books = await BookModel.findAll();
      res.json(books);
    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
      res.status(500).json({ error: "Erro ao buscar os livros" });
    }
  }

  // GET /livros/status/:status
  async getBooksByStatus(req, res) {
    try {
      const { status } = req.params;
      const books = await BookModel.findByStatus(status);
      res.json(books);
    } catch (error) {
      console.error("Erro ao buscar livros por status:", error);
      res.status(500).json({ error: "Erro ao buscar livros por status" });
    }
  }

  // GET /livros/:id
  async getBookById(req, res) {
    try {
      const { id } = req.params;

      const book = await BookModel.findById(id);


      if (!book) {
        return res.status(404).json({ error: "Livro não encontrado!" });
      }

      res.json(book);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      res.status(500).json({ error: "Erro ao buscar livro!" });
    }
  }

  // POST /livros
  async createBook(req, res) {
    try {
          //validação básica
      const { title, synposee, releaseYear, genres, imageUrl, author, shelfId, status } = req.body;
    
//verfica se todos os campos obrigatórios do livro foram fornecidos
        if (!title || !author || !releaseYear || !genres || !imageUrl || !status) {
            return res.status(400).json({
                error: "Os campos title, author, releaseYear, genres, imageUrl e status são obrigatórios",
            });
    }

    
    if (shelfId) {
        const shelf = await ShelfModel.findById(shelfId);
        if (!shelf) {
            return res.status(400).json({
                error: "A estante especificada não existe",
            });
        }
    }

    //criar o novo livro
    const newBook = await BookModel.create(
        title,
        synposee,
        releaseYear,
        genres,
        imageUrl,
        author,
        shelfId,
        status
    );

    if (!newBook) {
        return res.status(400).json({ error: "Erro ao criar livro" });
    }
    res.status(201).json({
        message: "Livro criado com sucesso",
        newBook,
    });
    } catch (error) {
        console.error("Erro ao criar livro:", error);
        res.status(500).json({ error: "Erro ao criar livro" });
    }
    }


  // PUT / livros/id
  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, synposee, releaseYear, genres, imageUrl, author, shelfId, status } = req.body;

      // Validar se a estante existe (se shelfId foi fornecido)
      if (shelfId) {
          const shelf = await ShelfModel.findById(shelfId);
          if (!shelf) {
              return res.status(400).json({
                  error: "A estante especificada não existe",
              });
          }
      }

      //atualizar os livros

      const updatedBook = await BookModel.update({
        id,
        title,
        synposee,
        releaseYear,
        genres,
        imageUrl,
        author,
        shelfId,
        status
      });

      if (!updatedBook) {
        return res.status(404).json({ error: "Livro não encontrado para atualização" });
      }

      res.json(updatedBook);
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      res.status(500).json({ error: "Erro ao atualizar livro!" });
    }
  }

  // DELETE /livros/:id
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
        // Remover o livro
      const result = await BookModel.delete(id);

        if (!result) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        res.status(200).send({
            message: "Livro removido com sucesso",
        });
    } catch (error) {
        console.error("Erro ao remover livro:", error);
        res.status(500).json({ error: "Erro ao remover livro!" });
        }
     
    }

  // PATCH /livros/:id/status - Atualizar apenas status/estante do livro
  async updateBookStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, shelfId } = req.body;

      if (!status) {
        return res.status(400).json({
          error: "O campo status é obrigatório",
        });
      }

      // Verificar se a estante existe (se shelfId foi fornecido)
      if (shelfId) {
          const shelf = await ShelfModel.findById(shelfId);
          if (!shelf) {
              return res.status(400).json({
                  error: "A estante especificada não existe",
              });
          }
      }

      const updatedBook = await BookModel.updateStatus(id, status, shelfId);

      if (!updatedBook) {
        return res.status(404).json({ error: "Livro não encontrado para atualização" });
      }

      res.json({
        message: "Status do livro atualizado com sucesso",
        book: updatedBook,
      });
    } catch (error) {
      console.error("Erro ao atualizar status do livro:", error);
      res.status(500).json({ error: "Erro ao atualizar status do livro!" });
    }
  }
  }


export default new BookController();