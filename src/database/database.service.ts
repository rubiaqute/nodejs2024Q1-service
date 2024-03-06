import { Album } from "src/albums/albums.interfaces";
import { Artist } from "src/artists/artists.interfaces";
import { Favorites } from "src/favourites/favourites.interfaces";
import { CreateTrackDto, Track, UpdateTrackDto } from "src/tracks/tracks.interfaces";
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

    getTrack(trackId: string) {
        return this.tracks.find((track) => track.id === trackId)
    }

    createTrack(createTrackPayload: CreateTrackDto) {
        const newTrack: Track = {
            ...createTrackPayload,
            id: uuid(),
            artistId: createTrackPayload.artistId ?? null,
            albumId: createTrackPayload.albumId ?? null
        }
        this.tracks.push(newTrack)

        return newTrack
    }

    deleteTrack(trackId: string) {
        this.tracks = this.tracks.filter((track) => track.id !== trackId)
    }

    updateTrack(trackId:string, updateTrackPayload: UpdateTrackDto) {
        const trackIndex = this.tracks.findIndex((track) => track.id === trackId)
        this.tracks[trackIndex] = {
            ...this.tracks[trackIndex],
            ...updateTrackPayload
        }

        return this.tracks[trackIndex]
    }

    getArtists() {
        return this.artists
    }

    getAlbums() {
        return this.albums
    }


}