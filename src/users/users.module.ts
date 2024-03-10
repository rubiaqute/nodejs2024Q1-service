import { Module } from '@nestjs/common';
import { UserController } from './users.controller';

@Module({
  imports: [],
  controllers: [UserController],
})
export class UsersModule {}
