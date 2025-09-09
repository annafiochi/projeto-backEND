import prisma from "../../prisma/prisma.js";

class ShelfModel {
    // Obter todas as estantes
    async findAll() {
        const shelves = await prisma.shelf.findMany({
            include: {
                books: true // inclui os livros da estante
            }
        });
        return shelves;
    }

    // Obter uma estante pelo ID
    async findById(id) {
        const shelf = await prisma.shelf.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                books: true // inclui os livros da estante
            }
        });
        return shelf;
    }

    // Criar uma nova estante
    async create(name, description) {
        const newShelf = await prisma.shelf.create({
            data: {
                name,
                description,
            },
        });
        return newShelf;
    }

    // Atualizar uma estante
    async update(updateData) {
        const { id, name, description } = updateData;
        
        const shelf = await this.findById(id);

        if (!shelf) {
            return null;
        }

        const shelfUpdate = await prisma.shelf.update({
            where: { 
                id: Number(id) 
            },
            data: {
                name,
                description,
            },
        });
        return shelfUpdate;
    }

    // Remover uma estante
    async delete(id) {
        const shelf = await this.findById(id);

        if (!shelf) {
            return null;
        }

        await prisma.shelf.delete({
            where: {
                id: Number(id),
            },
        });
        return true;
    }

    // Buscar livros de uma estante específica
    async getBooksFromShelf(shelfId) {
        const shelf = await prisma.shelf.findUnique({
            where: {
                id: Number(shelfId),
            },
            include: {
                books: true
            }
        });
        
        return shelf ? shelf.books : null;
    }
}

export default new ShelfModel();