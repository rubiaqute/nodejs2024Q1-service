import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import {
  NotFoundEntityError,
  NotValidBodyError,
  NotValidIdError,
} from 'src/utils/exceptions';
import {
  isValidCreateAlbumPayload,
  isValidUpdateAlbumPayload,
} from 'src/utils/validation';
import { CreateAlbumDto, UpdateAlbumDto } from './albums.interfaces';

@Controller('album')
export class AlbumsController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  getAlbums() {
    return this.database.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param() params: any) {
    const albumId = params.id;
    const isValidUuid = uuidValidate(albumId);

    if (isValidUuid) {
      const album = this.database.getAlbum(albumId);

      if (album) {
        return album;
      } else {
        throw new NotFoundEntityError('album');
      }
    } else {
      throw new NotValidIdError();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() createAlbumPayload: CreateAlbumDto) {
    if (isValidCreateAlbumPayload(createAlbumPayload)) {
      return this.database.createAlbum(createAlbumPayload);
    } else {
      throw new NotValidBodyError();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delteAlbum(@Param() params: any) {
    const albumId = params.id;
    const isValidUuid = uuidValidate(albumId);

    if (isValidUuid) {
      const album = this.database.getAlbum(albumId);

      if (album) {
        this.database.deleteAlbum(albumId);
      } else {
        throw new NotFoundEntityError('album');
      }
    } else {
      throw new NotValidIdError();
    }
  }

  @Put(':id')
  updateAlbum(
    @Param() params: any,
    @Body() updateAlbumPayload: UpdateAlbumDto,
  ) {
    const albumId = params.id;
    const isValidUuid = uuidValidate(albumId);

    if (isValidUuid) {
      if (isValidUpdateAlbumPayload(updateAlbumPayload)) {
        const album = this.database.getAlbum(albumId);

        if (album) {
          return this.database.updateAlbum(albumId, updateAlbumPayload);
        } else {
          throw new NotFoundEntityError('album');
        }
      } else {
        throw new NotValidBodyError();
      }
    } else {
      throw new NotValidIdError();
    }
  }
}
