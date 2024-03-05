import { Album } from "src/albums/albums.interfaces";
import { Artist } from "src/artists/artists.interfaces";
import { Favorites } from "src/favourites/favourites.interfaces";
import { Track } from "src/tracks/tracks.interfaces";
import { CreateUserDto, User } from "src/users/users.interfaces";
import { v4 as uuid } from "uuid";

export class DatabaseService {
    users: User[] = [];
    tracks: Track[] = [];
    artists: Artist[] = [];
    albums: Album[] = [];
    favourites: Favorites = {
        artists: [],
        tracks: [],
        albums: [],
    };

    getUsers() {
        return this.users
    }

    getUser(userId: string) {
        return this.users.find((user) => user.id === userId)
    }

    deleteUser(userId: string) {
        this.users = this.users.filter((user) => user.id !== userId)
    }

    createUser(createUserPayload: CreateUserDto) {
        const timestamp = Date.now();
        const newUser: User = {
            ...createUserPayload,
            id: uuid(),
            version: 1,
            createdAt: timestamp,
            updatedAt: timestamp
        }
        this.users.push(newUser)

        return newUser
    }

    updatePassword(userId: string, newPassword: string) {
        const user = this.getUser(userId)
        user.version = user.version + 1
        user.password = newPassword
        user.updatedAt = Date.now();

        return user
    }

    getTracks() {
        return this.tracks
    }

    getArtists() {
        return this.artists
    }

    getAlbums() {
        return this.albums
    }


}