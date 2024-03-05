import { Album } from "src/albums/albums.interfaces";
import { Artist } from "src/artists/artists.interfaces";
import { Favorites } from "src/favourites/favourites.interfaces";
import { Track } from "src/tracks/tracks.interfaces";

export class DatabaseService {
    tracks: Track[] = [];
    artists: Artist[] = [];
    albums: Album[] = [];
    favourites: Favorites = {
        artists: [],
        tracks: [],
        albums: [],
    };
}