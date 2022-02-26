-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userUpdated" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "changedFirstName" TEXT,
    "changedLastName" TEXT,
    "changedEmail" TEXT,
    "changedTelephoneNumber" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "userUpdated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_userUpdated" ("changedEmail", "changedFirstName", "changedLastName", "changedTelephoneNumber", "id", "userId") SELECT "changedEmail", "changedFirstName", "changedLastName", "changedTelephoneNumber", "id", "userId" FROM "userUpdated";
DROP TABLE "userUpdated";
ALTER TABLE "new_userUpdated" RENAME TO "userUpdated";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
