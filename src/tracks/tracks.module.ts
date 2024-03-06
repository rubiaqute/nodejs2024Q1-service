import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';

@Module({
    imports: [],
    controllers: [TracksController],
})
export class TracksModule { }
