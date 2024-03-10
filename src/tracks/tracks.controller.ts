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
import { CreateTrackDto, UpdateTrackDto } from './tracks.interfaces';
import {
  isValidCreateTrackPayload,
  isValidUpdateTrackPayload,
} from 'src/utils/validation';

@Controller('track')
export class TracksController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  getTracks() {
    return this.database.getTracks();
  }

  @Get(':id')
  getTrack(@Param() params: any) {
    const trackId = params.id;
    const isValidUuid = uuidValidate(trackId);

    if (isValidUuid) {
      const track = this.database.getTrack(trackId);

      if (track) {
        return track;
      } else {
        throw new NotFoundEntityError('track');
      }
    } else {
      throw new NotValidIdError();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Body() createTrackPayload: CreateTrackDto) {
    if (isValidCreateTrackPayload(createTrackPayload)) {
      return this.database.createTrack(createTrackPayload);
    } else {
      throw new NotValidBodyError();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delteTrack(@Param() params: any) {
    const trackId = params.id;
    const isValidUuid = uuidValidate(trackId);

    if (isValidUuid) {
      const track = this.database.getTrack(trackId);

      if (track) {
        this.database.deleteTrack(trackId);
      } else {
        throw new NotFoundEntityError('track');
      }
    } else {
      throw new NotValidIdError();
    }
  }

  @Put(':id')
  updateTrack(
    @Param() params: any,
    @Body() updateTrackPayload: UpdateTrackDto,
  ) {
    const trackId = params.id;
    const isValidUuid = uuidValidate(trackId);

    if (isValidUuid) {
      if (isValidUpdateTrackPayload(updateTrackPayload)) {
        const track = this.database.getTrack(trackId);

        if (track) {
          return this.database.updateTrack(trackId, updateTrackPayload);
        } else {
          throw new NotFoundEntityError('track');
        }
      } else {
        throw new NotValidBodyError();
      }
    } else {
      throw new NotValidIdError();
    }
  }
}
