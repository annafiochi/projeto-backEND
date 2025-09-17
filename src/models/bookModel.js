import prisma from "../../prisma/prisma.js";

class BookModel {
    // Obter todos os livros
    async findAll() {
        const books = await prisma.book.findMany({
            include: {
                shelf: true,
            },
        });
        return books;
    }

    // Obter livros por status
    async findByStatus(status) {
        const books = await prisma.book.findMany({
            where: {
                status: status,
            },
            include: {
                shelf: true,
            },
        });
        return books;
    }

    // Obter livros de um usuário específico
    async findByUserId(userId) {
        const books = await prisma.book.findMany({
            where: {
                userId: Number(userId),
            },
            include: {
                shelf: true,
            },
        });
        return books;
    }

    // Obter livros de um usuário por status
    async findByUserIdAndStatus(userId, status) {
        const books = await prisma.book.findMany({
            where: {
                userId: Number(userId),
                status: status,
            },
            include: {
                shelf: true,
            },
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
    async create(title, synposee, releaseYear, genres, imageUrl, author, shelfId, status) {
        const newBook = await prisma.book.create({
            data: {
                title,
                synposee,
                releaseYear,
                genres,
                imageUrl,
                author,
                shelfId,
                status,
            },
        });
        return newBook;
    }

    //Atualizar um livro
    async update(updateData) {
        const { id, title, synposee, releaseYear, genres, imageUrl, author, shelfId, status } = updateData;
        
        const book = await this.findById(id);

        if (!book) {
            return null;
        }

        const bookUpdate = await prisma.book.update({
            where: { 
                id: Number(id) 
            },
            data: {
                title,
                synposee,
                releaseYear,
                genres,
                imageUrl,
                author,
                shelfId,
                status,
            },
        });
        return bookUpdate;
    }

    // Atualizar apenas o status e estante de um livro
    async updateStatus(id, status, shelfId) {
        const book = await this.findById(id);

        if (!book) {
            return null;
        }

        const bookUpdate = await prisma.book.update({
            where: { 
                id: Number(id) 
            },
            data: {
                status,
                shelfId: shelfId ? Number(shelfId) : null,
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