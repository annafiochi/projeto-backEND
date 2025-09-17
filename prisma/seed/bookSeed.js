import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedBooksAndShelves() {
  console.log("🌱 Iniciando seed para Books e Shelves...");

  try {
    // Limpar dados existentes (opcional)
    await prisma.book.deleteMany({});
    await prisma.shelf.deleteMany({});

    // Criar estantes
    const shelf1 = await prisma.shelf.create({
      data: {
        name: "Lidos",
        description: "Livros que já terminei de ler",
      },
    });

    const shelf2 = await prisma.shelf.create({
      data: {
        name: "Lendo",
        description: "Livros que estou lendo atualmente",
      },
    });

    const shelf3 = await prisma.shelf.create({
      data: {
        name: "Quero Ler",
        description: "Lista de livros que pretendo ler",
      },
    });

    const shelf4 = await prisma.shelf.create({
      data: {
        name: "Abandonei",
        description: "Livros que comecei mas não terminei",
      },
    });

    const shelf5 = await prisma.shelf.create({
      data: {
        name: "Relendo",
        description: "Livros que estou relendo",
      },
    });

    const shelf6 = await prisma.shelf.create({
      data: {
        name: "Não Lidos",
        description: "Livros que ainda não comecei a ler",
      },
    });

    // Criar livros
    const book1 = await prisma.book.create({
      data: {
        title: "Binding 13",
        synposee: "Uma história de amor épica e inesquecível começa em Binding 13A épica e inesquecível história de amor de Johnny e Shannon continua em Keeping 13",
        releaseYear: 2025,
        genres: "romance",
        imageUrl: "https://m.media-amazon.com/images/I/81JAJcXAAYL._SY522_.jpg",
        author: "Chloe Walsh",
        status: "lidos",
        shelfId: shelf1.id,
      },
    });

    const book2 = await prisma.book.create({
      data: {
        title: "Keeping 13",
        synposee: "Uma história de amor épica e inesquecível começa em Binding 13",
        releaseYear: 2025,
        genres: "romance",
        imageUrl: "https://m.media-amazon.com/images/I/81HsivUvF9L._SY522_.jpg",
        author: "Chloe Walsh",
        status: "lendo",
        shelfId: shelf2.id,
      },
    });

    const book3 = await prisma.book.create({
      data: {
        title: "Powerless",
        synposee: "Uma jornada sobre descobrir forças interiores quando tudo parece perdido",
        releaseYear: 2022,
        genres: "Ficção Científica, Drama",
        imageUrl: "https://example.com/powerless.jpg",
        author: "Lauren Roberts",
        status: "quero ler",
        shelfId: shelf3.id,
      },
    });

    const book4 = await prisma.book.create({
      data: {
        title: "Aliada do vilão",
        synposee: "A história de Bentinho e CapituO terceiro volume da série Assistente do Vilão, a fantasia divertida fenômeno do TikTok",
        releaseYear: 2025,
        genres: "Romance, Ficção",
        imageUrl: "https://m.media-amazon.com/images/I/81SKr7i3EHL._SY522_.jpg",
        author: "Hannah Nicole MaehrerHannah Nicole Maehrer",
        status: "abandonei",
        shelfId: shelf4.id,
      },
    });

    const book5 = await prisma.book.create({
      data: {
        title: "Livro Sem Estante",
        synposee: "Este livro não está em nenhuma estante",
        releaseYear: 2023,
        genres: "Teste",
        imageUrl: "https://example.com/test.jpg",
        author: "Autor Teste",
        status: "lendo",
        shelfId: null, // Sem estante
      },
    });

    const book6 = await prisma.book.create({
      data: {
        title: "Dom Casmurro",
        synposee: "A história de Bentinho e Capitu",
        releaseYear: 1899,
        genres: "Clássico, Romance",
        imageUrl: "https://m.media-amazon.com/images/I/71-q+8nO+vL._SY522_.jpg",
        author: "Machado de Assis",
        status: "relendo",
        shelfId: shelf5.id,
      },
    });

    const book7 = await prisma.book.create({
      data: {
        title: "O Pequeno Príncipe",
        synposee: "Uma fábula sobre amizade e humanidade",
        releaseYear: 1943,
        genres: "Ficção, Infantil",
        imageUrl: "https://m.media-amazon.com/images/I/71bWuf6vWZL._SY522_.jpg",
        author: "Antoine de Saint-Exupéry",
        status: "nao-lidos",
        shelfId: shelf6.id,
      },
    });

    const book8 = await prisma.book.create({
      data: {
        title: "1984",
        synposee: "Uma distopia sobre controle totalitário",
        releaseYear: 1949,
        genres: "Ficção Científica, Distopia",
        imageUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL._SY522_.jpg",
        author: "George Orwell",
        status: "nao-lidos",
        shelfId: shelf6.id,
      },
    });

    console.log("✅ Seed concluído com sucesso!");
    console.log(`📚 Criadas ${await prisma.shelf.count()} estantes`);
    console.log(`📖 Criados ${await prisma.book.count()} livros`);

    // Mostrar as estantes criadas
    const shelves = await prisma.shelf.findMany({
      include: {
        books: true,
      },
    });

    console.log("\n📋 Estantes criadas:");
    shelves.forEach((shelf) => {
      console.log(`- ${shelf.name} (${shelf.books.length} livros)`);
    });

  } catch (error) {
    console.error("❌ Erro no seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedBooksAndShelves();
