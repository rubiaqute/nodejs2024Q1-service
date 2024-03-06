import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundEntityError, NotValidBodyError, NotValidIdError } from 'src/utils/exceptions';
import { isValidCreateArtistPayload, isValidUpdateArtistPayload } from 'src/utils/validation';
import { CreateArtistDto, UpdateArtistDto } from './artists.interfaces';

@Controller('artist')
export class ArtistsController {
    constructor(private readonly database: DatabaseService) { }

    @Get()
    getArtists() {
        return this.database.getArtists()
    }

    @Get(':id')
    getArtist(@Param() params: any) {
        const artistId = params.id
        const isValidUuid = uuidValidate(artistId)

        if (isValidUuid) {
            const artist = this.database.getArtist(artistId);

            if (artist) {
                return artist
            } else {
                throw new NotFoundEntityError('artist')
            }

        } else {
            throw new NotValidIdError()
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createArtist(@Body() createArtistPayload: CreateArtistDto) {
        if (isValidCreateArtistPayload(createArtistPayload)) {
            return this.database.createArtist(createArtistPayload);
        } else {
            throw new NotValidBodyError()
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delteArtist(@Param() params: any) {
        const artistId = params.id
        const isValidUuid = uuidValidate(artistId)

        if (isValidUuid) {
            const artist = this.database.getArtist(artistId);

            if (artist) {
                this.database.deleteArtist(artistId)
            } else {
                throw new NotFoundEntityError('artist')
            }

        } else {
            throw new NotValidIdError()
        }
    }

    @Put(':id')
    updateArtist(@Param() params: any, @Body() updateArtistPayload: UpdateArtistDto) {
        const artistId = params.id
        const isValidUuid = uuidValidate(artistId)

        if (isValidUuid) {

            if (isValidUpdateArtistPayload(updateArtistPayload)) {
                const artist = this.database.getArtist(artistId);

                if (artist) {
                    return this.database.updateArtist(artistId, updateArtistPayload);
                } else {
                    throw new NotFoundEntityError('artist')
                }
            } else {
                throw new NotValidBodyError()
            }

        } else {
            throw new NotValidIdError()
        }
    }
}
