import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ArtistsController } from './artists.controller';

@Module({
    imports: [],
    controllers: [ArtistsController],
    providers: [DatabaseService],
})
export class ArtistsModule { }
