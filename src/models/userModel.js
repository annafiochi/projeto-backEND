import prisma from "../../prisma/prisma.js";

class UserModel {
  // GET /usuarios
  async findAll() {
    try {
      const users = await prisma.user.findMany({
        include: {
          books: true,
          shelves: true,
        },
      });
      return users;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  // GET /usuarios/:id
  async findById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          books: {
            include: {
              shelf: true,
            },
          },
          shelves: {
            include: {
              books: true,
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  }

  // POST /usuarios
  async create(name, email, password) {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password, // Em produção, deveria ser hash da senha
        },
      });
      return user;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }

  // PUT /usuarios/:id
  async update({ id, name, email, password }) {
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(password && { password }),
        },
      });
      return user;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  // DELETE /usuarios/:id
  async delete(id) {
    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      return { message: "Usuário removido com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  }

  // GET /usuarios/:id/livros/:status
  async findBooksByStatus(userId, status) {
    try {
      const books = await prisma.book.findMany({
        where: { 
          userId: parseInt(userId),
          status: status 
        },
        include: {
          shelf: true,
        },
      });
      return books;
    } catch (error) {
      console.error("Erro ao buscar livros por status:", error);
      throw error;
    }
  }

  // GET /usuarios/:id/estantes
  async findUserShelves(userId) {
    try {
      const shelves = await prisma.shelf.findMany({
        where: { userId: parseInt(userId) },
        include: {
          books: true,
        },
      });
      return shelves;
    } catch (error) {
      console.error("Erro ao buscar estantes do usuário:", error);
      throw error;
    }
  }
}

export default new UserModel();
