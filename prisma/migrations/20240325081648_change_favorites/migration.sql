/*
  Warnings:

  - You are about to drop the `UserFavoriteAlbum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFavoriteArtist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFavoriteTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavoriteAlbum" DROP CONSTRAINT "UserFavoriteAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteAlbum" DROP CONSTRAINT "UserFavoriteAlbum_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteArtist" DROP CONSTRAINT "UserFavoriteArtist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteArtist" DROP CONSTRAINT "UserFavoriteArtist_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteTrack" DROP CONSTRAINT "UserFavoriteTrack_trackId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteTrack" DROP CONSTRAINT "UserFavoriteTrack_userId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "UserFavoriteAlbum";

-- DropTable
DROP TABLE "UserFavoriteArtist";

-- DropTable
DROP TABLE "UserFavoriteTrack";
