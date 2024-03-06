import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AlbumsController } from './albums.controller';

@Module({
    imports: [],
    controllers: [AlbumsController],
})
export class AlbumsModule { }
