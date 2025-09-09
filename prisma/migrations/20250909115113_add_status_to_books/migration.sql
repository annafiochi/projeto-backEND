/*
  Warnings:

  - Added the required column `status` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "synposee" TEXT,
    "releaseYear" INTEGER NOT NULL,
    "genres" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "shelfId" INTEGER,
    "status" TEXT NOT NULL,
    CONSTRAINT "books_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "shelves" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_books" ("author", "genres", "id", "imageUrl", "releaseYear", "shelfId", "synposee", "title") SELECT "author", "genres", "id", "imageUrl", "releaseYear", "shelfId", "synposee", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
