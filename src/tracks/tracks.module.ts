import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TracksController } from './tracks.controller';

@Module({
    imports: [],
    controllers: [TracksController],
    providers: [DatabaseService],
})
export class TracksModule { }
