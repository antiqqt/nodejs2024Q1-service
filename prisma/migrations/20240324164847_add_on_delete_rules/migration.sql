-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_artistId_fkey";

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
ALTER TABLE "Album" ALTER COLUMN "artistId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "albumId" DROP NOT NULL,
ALTER COLUMN "artistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteAlbum" ADD CONSTRAINT "UserFavoriteAlbum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteAlbum" ADD CONSTRAINT "UserFavoriteAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteArtist" ADD CONSTRAINT "UserFavoriteArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteArtist" ADD CONSTRAINT "UserFavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteTrack" ADD CONSTRAINT "UserFavoriteTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteTrack" ADD CONSTRAINT "UserFavoriteTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
