import { Controller, Get } from '@nestjs/common';
import {  UserService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }
}
