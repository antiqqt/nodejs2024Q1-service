import type { UUID } from 'src/common/interfaces';

export class FavoritesRepository {
  artists: Set<UUID> = new Set(); // favorite artists ids
  albums: Set<UUID> = new Set(); // favorite albums ids
  tracks: Set<UUID> = new Set(); // favorite tracks ids
}
