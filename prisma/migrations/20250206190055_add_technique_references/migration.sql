-- CreateTable
CREATE TABLE "TechniqueReference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "techniqueId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TechniqueReference_techniqueId_fkey" FOREIGN KEY ("techniqueId") REFERENCES "Technique" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
