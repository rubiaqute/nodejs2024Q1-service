import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { DatabaseModule } from './database/database.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, TracksModule, ArtistsModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
