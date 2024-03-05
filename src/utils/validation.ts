import { CreateUserDto, UpdatePasswordDto } from "src/users/users.interfaces"

export const isValidCreateUserPayload = (createUserPayload: CreateUserDto) => {
    const isOnlyKnownKeys = Object.keys(createUserPayload).every((key) => key === 'login' || key === 'password')
    const isValidValues = Object.values(createUserPayload).every((value) => typeof value === 'string' && value.trim().length > 0)

    return createUserPayload.login && createUserPayload.password && isOnlyKnownKeys && isValidValues
}

export const isValidUpdatePasswordPayload = (updatePasswordPayload: UpdatePasswordDto) => {
    const isOnlyKnownKeys = Object.keys(updatePasswordPayload).every((key) => key === 'oldPassword' || key === 'newPassword')
    const isValidValues = Object.values(updatePasswordPayload).every((value) => typeof value === 'string' && value.trim().length > 0)

    return updatePasswordPayload.newPassword && updatePasswordPayload.oldPassword && isOnlyKnownKeys && isValidValues
}