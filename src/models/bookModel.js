import prisma from "../../prisma/prisma.js";

class BookModel {
    // Obter todos os livros
    async findAll() {
        const books = await prisma.book.findMany({
           
        });
        return books;
    }


    // Obter um livro pelo ID
    async findById(id) {
        const book = await prisma.book.findUnique({
            where: {
                id: Number(id),
            },
        });
        return book;
    }

    //criar um novo livro
    async create(title, releaseYear, author) {
        const newBook = await prisma.book.create({
            data: {
                title,
                releaseYear,
                author,
            },
        });
        return newBook;
    }

    //Atualizar um livro
    async update(id, title, releaseYear, author) {
        const book = await this.findById(id);

        if (!book) {
            return null;
        }

        // Atualize o livro existente com os novos dados
        if (title !== undefined) {
            title = title;
        }
        if (releaseYear !== undefined) {
            releaseYear = releaseYear;
        }
        if (author !== undefined) {
            author = author;
        }

        const bookUpdate = await prisma.book.update({
            where: { 
                id: Number(id) 
            },
            data: {
                title,
                releaseYear,
                author,
            },
        });
        return bookUpdate;
    }

    //Remover um livro
    async delete(id) {
        const book = await this.findById(id);

        if (!book) {
            return null;
        }

        await prisma.book.delete({
            where: {
                id: Number(id),
            },
        });
        return true;
    }
}
export default new BookModel();