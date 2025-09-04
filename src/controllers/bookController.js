import BookModel from "../models/bookModel.js";

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
      const { title, releaseYear, author,  } = req.body;
    
//verfica se todos os campos do livro foram fornecidos
        if (!title || !author || !releaseYear) {
            return res.status(400).json({
                error: "Os campos título, autor e ano de lançamento são obrigatórios",
            });
    }

    //criar o novo livro
    const newBook = await BookModel.create(
        title,
        releaseYear,
        author,
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
      const { title, releaseYear, author } = req.body;


      //atualizar os livros

      const updatedBook = await BookModel.update({
        id,
        title,
        releaseYear,
        author
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
  }


export default new BookController();