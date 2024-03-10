import {
  Album,
  CreateAlbumDto,
  UpdateAlbumDto,
} from 'src/albums/albums.interfaces';
import {
  Artist,
  CreateArtistDto,
  UpdateArtistDto,
} from 'src/artists/artists.interfaces';
import { Favorites } from 'src/favourites/favourites.interfaces';
import {
  CreateTrackDto,
  Track,
  UpdateTrackDto,
} from 'src/tracks/tracks.interfaces';
import { CreateUserDto, User } from 'src/users/users.interfaces';
import { v4 as uuid } from 'uuid';

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
    return this.users;
  }

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }

  deleteUser(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  createUser(createUserPayload: CreateUserDto) {
    const timestamp = Date.now();
    const newUser: User = {
      ...createUserPayload,
      id: uuid(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);

    return newUser;
  }

  updatePassword(userId: string, newPassword: string) {
    const user = this.getUser(userId);
    user.version = user.version + 1;
    user.password = newPassword;
    user.updatedAt = Date.now();

    return user;
  }

  getTracks() {
    return this.tracks;
  }

  getTrack(trackId: string) {
    return this.tracks.find((track) => track.id === trackId);
  }

  createTrack(createTrackPayload: CreateTrackDto) {
    const newTrack: Track = {
      ...createTrackPayload,
      id: uuid(),
      artistId: createTrackPayload.artistId ?? null,
      albumId: createTrackPayload.albumId ?? null,
    };
    this.tracks.push(newTrack);

    return newTrack;
  }

  deleteTrack(trackId: string) {
    this.tracks = this.tracks.filter((track) => track.id !== trackId);
    this.favourites.tracks = this.favourites.tracks.filter(
      (id) => id !== trackId,
    );
  }

  updateTrack(trackId: string, updateTrackPayload: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === trackId);
    this.tracks[trackIndex] = {
      ...this.tracks[trackIndex],
      ...updateTrackPayload,
    };

    return this.tracks[trackIndex];
  }

  getArtists() {
    return this.artists;
  }

  getArtist(artistId: string) {
    return this.artists.find((artist) => artist.id === artistId);
  }

  createArtist(createArtistPayload: CreateArtistDto) {
    const newArtist: Artist = {
      ...createArtistPayload,
      id: uuid(),
    };
    this.artists.push(newArtist);

    return newArtist;
  }

  deleteArtist(artistId: string) {
    this.artists = this.artists.filter((artist) => artist.id !== artistId);
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
    this.favourites.artists = this.favourites.artists.filter(
      (id) => id !== artistId,
    );
  }

  updateArtist(artistId: string, updateArtistPayload: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    this.artists[artistIndex] = {
      ...this.artists[artistIndex],
      ...updateArtistPayload,
    };

    return this.artists[artistIndex];
  }

  getAlbums() {
    return this.albums;
  }

  getAlbum(albumId: string) {
    return this.albums.find((album) => album.id === albumId);
  }

  createAlbum(createAlbumPayload: CreateAlbumDto) {
    const newAlbum: Album = {
      ...createAlbumPayload,
      id: uuid(),
    };
    this.albums.push(newAlbum);

    return newAlbum;
  }

  deleteAlbum(albumId: string) {
    this.albums = this.albums.filter((album) => album.id !== albumId);
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
    this.favourites.albums = this.favourites.albums.filter(
      (id) => id !== albumId,
    );
  }

  updateAlbum(albumId: string, updateAlbumPayload: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === albumId);
    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      ...updateAlbumPayload,
    };

    return this.albums[albumIndex];
  }

  getFavourites() {
    return {
      artists: this.favourites.artists.map((artistId) =>
        this.getArtist(artistId),
      ),
      albums: this.favourites.albums.map((albumId) => this.getAlbum(albumId)),
      tracks: this.favourites.tracks.map((trackId) => this.getTrack(trackId)),
    };
  }

  addToFav(entityType: keyof Favorites, entityId: string) {
    const isEntityExists = this.getIsEntityExists(entityType, entityId);

    if (isEntityExists) {
      this.favourites[entityType].push(entityId);
    }

    return isEntityExists;
  }

  deleteFromFav(entityType: keyof Favorites, entityId: string) {
    const isEntityExists = this.getIsEntityExists(entityType, entityId);

    if (isEntityExists) {
      this.favourites[entityType] = this.favourites[entityType].filter(
        (id) => id !== entityId,
      );
    }

    return isEntityExists;
  }

  private getIsEntityExists(entityType: keyof Favorites, entityId: string) {
    switch (entityType) {
      case 'albums':
        return Boolean(this.getAlbum(entityId));
      case 'artists':
        return Boolean(this.getArtist(entityId));
      case 'tracks':
        return Boolean(this.getTrack(entityId));
      default:
        return false;
    }
  }
}
