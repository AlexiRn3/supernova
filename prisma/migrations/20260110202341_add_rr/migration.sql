-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "contracts" REAL NOT NULL DEFAULT 1,
    "entryPrice" REAL NOT NULL,
    "exitPrice" REAL NOT NULL,
    "pnl" REAL NOT NULL,
    "rr" REAL NOT NULL DEFAULT 0,
    "date" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Trade" ("contracts", "createdAt", "date", "direction", "entryPrice", "exitPrice", "id", "pnl", "setup", "symbol", "updatedAt") SELECT "contracts", "createdAt", "date", "direction", "entryPrice", "exitPrice", "id", "pnl", "setup", "symbol", "updatedAt" FROM "Trade";
DROP TABLE "Trade";
ALTER TABLE "new_Trade" RENAME TO "Trade";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
