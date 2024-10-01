-- CreateTable
CREATE TABLE "Technique" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "videoLink" TEXT,
    "lastIntroduced" DATETIME NOT NULL
);
