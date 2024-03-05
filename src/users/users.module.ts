import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserController } from './users.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [DatabaseService],
})
export class UsersModule {}
