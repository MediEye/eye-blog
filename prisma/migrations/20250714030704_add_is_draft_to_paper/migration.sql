-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Paper" ("author", "category", "content", "createdAt", "id", "tags", "title", "updatedAt") SELECT "author", "category", "content", "createdAt", "id", "tags", "title", "updatedAt" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
