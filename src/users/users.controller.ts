import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { NotFoundEntityError, NotValidBodyError, NotValidIdError, WrongPasswordError } from 'src/utils/exceptions';
import { CreateUserDto, UpdatePasswordDto } from './users.interfaces';
import { isValidCreateUserPayload, isValidUpdatePasswordPayload } from 'src/utils/validation';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from './users.serializer';

@Controller('user')
export class UserController {
  constructor(private readonly database: DatabaseService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.database.getUsers().map((user) => new UserEntity(user))
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getUser(@Param() params: any) {
    const userId = params.id
    const isValidUuid = uuidValidate(userId)

    if (isValidUuid) {
      const user = this.database.getUser(params.id);

      if (user) {
        return new UserEntity(user)
      } else {
        throw new NotFoundEntityError('user')
      }

    } else {
      throw new NotValidIdError()
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createUser(@Body() createUserPayload: CreateUserDto) {
    if (isValidCreateUserPayload(createUserPayload)) {
      const newUser = this.database.createUser(createUserPayload);

      return new UserEntity(newUser)
    } else {
      throw new NotValidBodyError()
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delteUser(@Param() params: any) {
    const userId = params.id
    const isValidUuid = uuidValidate(userId)

    if (isValidUuid) {
      const user = this.database.getUser(userId);

      if (user) {
        this.database.deleteUser(userId)
      } else {
        throw new NotFoundEntityError('user')
      }

    } else {
      throw new NotValidIdError()
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  updatePassword(@Param() params: any, @Body() updatePasswordPayload: UpdatePasswordDto) {
    const userId = params.id
    const isValidUuid = uuidValidate(userId)

    if (isValidUuid) {

      if (isValidUpdatePasswordPayload(updatePasswordPayload)) {
        const user = this.database.getUser(userId);

        if (user) {

          if (user.password === updatePasswordPayload.oldPassword && updatePasswordPayload.newPassword) {
            const updatedUser = this.database.updatePassword(userId, updatePasswordPayload.newPassword)
            return new UserEntity(updatedUser)
          } else {
            throw new WrongPasswordError()
          }
        } else {
          throw new NotFoundEntityError('user')
        }
      } else {
          throw new NotValidBodyError()
      }

    } else {
      throw new NotValidIdError()
    }
  }
}
