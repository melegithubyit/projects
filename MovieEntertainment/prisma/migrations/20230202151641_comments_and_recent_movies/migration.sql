-- CreateTable
CREATE TABLE "recentlyAdded" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "imdbPoster" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imdbRating" DECIMAL(65,30) NOT NULL,
    "filePath" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,

    CONSTRAINT "recentlyAdded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);
