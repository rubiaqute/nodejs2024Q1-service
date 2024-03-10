import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { NotExistEntityError, NotFoundEntityError, NotValidIdError } from 'src/utils/exceptions';

@Controller('favs')
export class FavouritesController {
    constructor(private readonly database: DatabaseService) { }

    @Get()
    getFavourites() {
        return this.database.getFavourites()
    }

    @Post('/track/:id')
    @HttpCode(HttpStatus.CREATED)
    addTrackToFavs(@Param() params: any) {
        const trackId = params.id
        const isValidUuid = uuidValidate(trackId)

        if (isValidUuid) {
            const isSucess = this.database.addToFav('tracks', trackId)

            if (!isSucess) {
                throw new NotExistEntityError('track')
            }
        } else {
            throw new NotValidIdError()
        }
    }

    @Post('/album/:id')
    @HttpCode(HttpStatus.CREATED)
    addAlbumToFavs(@Param() params: any) {
        const albumId = params.id
        const isValidUuid = uuidValidate(albumId)

        if (isValidUuid) {
            const isSucess = this.database.addToFav('albums', albumId)

            if (!isSucess) {
                throw new NotExistEntityError('album')
            }
        } else {
            throw new NotValidIdError()
        }
    }

    @Post('/artist/:id')
    @HttpCode(HttpStatus.CREATED)
    addArtistToFavs(@Param() params: any) {
        const artistId = params.id
        const isValidUuid = uuidValidate(artistId)

        if (isValidUuid) {
            const isSucess = this.database.addToFav('artists', artistId)

            if (!isSucess) {
                throw new NotExistEntityError('artist')
            }
        } else {
            throw new NotValidIdError()
        }
    }

    @Delete('/artist/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteArtistFromFavs(@Param() params: any) {
        const artistId = params.id
        const isValidUuid = uuidValidate(artistId)

        if (isValidUuid) {
            const isSucess = this.database.deleteFromFav('artists', artistId)

            if (!isSucess) {
                throw new NotFoundEntityError('artist')
            }
        } else {
            throw new NotValidIdError()
        }
    }

    @Delete('/track/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTrackFromFavs(@Param() params: any) {
        const trackId = params.id
        const isValidUuid = uuidValidate(trackId)

        if (isValidUuid) {
            const isSucess = this.database.deleteFromFav('tracks', trackId)

            if (!isSucess) {
                throw new NotFoundEntityError('track')
            }
        } else {
            throw new NotValidIdError()
        }
    }

    @Delete('/album/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAlbumFromFavs(@Param() params: any) {
        const albumId = params.id
        const isValidUuid = uuidValidate(albumId)

        if (isValidUuid) {
            const isSucess = this.database.deleteFromFav('albums', albumId)

            if (!isSucess) {
                throw new NotFoundEntityError('album')
            }
        } else {
            throw new NotValidIdError()
        }
    }
}
