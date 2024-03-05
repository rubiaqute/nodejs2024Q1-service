import { HttpException, HttpStatus } from "@nestjs/common";

export class NotValidIdError extends HttpException {
    constructor() {
        super('The id is not valid', HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundEntityError extends HttpException {
    constructor(entityName: string) {
        super(`The ${entityName} is not found`, HttpStatus.NOT_FOUND);
    }
}

export class NotValidBodyError extends HttpException {
    constructor() {
        super('The body is not valid', HttpStatus.BAD_REQUEST);
    }
}

export class WrongPasswordError extends HttpException {
    constructor() {
        super('Your old password is incorrect or new password is invalid', HttpStatus.FORBIDDEN);
    }
}