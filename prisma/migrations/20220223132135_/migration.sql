/*
  Warnings:

  - You are about to drop the column `content` on the `userUpdated` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `userUpdated` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `userUpdated` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userUpdated" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "changedFirstName" TEXT,
    "changedLastName" TEXT,
    "changedEmail" TEXT,
    "changedTelephoneNumber" TEXT,
    "userId" INTEGER,
    CONSTRAINT "userUpdated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_userUpdated" ("id", "userId") SELECT "id", "userId" FROM "userUpdated";
DROP TABLE "userUpdated";
ALTER TABLE "new_userUpdated" RENAME TO "userUpdated";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
