import { CreateTrackDto, UpdateTrackDto } from "src/tracks/tracks.interfaces"
import { CreateUserDto, UpdatePasswordDto } from "src/users/users.interfaces"
import { validate as uuidValidate } from 'uuid';

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

export const isValidCreateTrackPayload = (createTrackPayload: CreateTrackDto) => {
    const props = ['name', 'artistId', 'albumId', 'duration']
    const {name, artistId, albumId, duration } = createTrackPayload

    const isOnlyKnownKeys = Object.keys(createTrackPayload).every((key) => props.includes(key))
    const isValidName = typeof name === 'string' && name.trim()
    const isValidDuration = typeof duration === 'number' && duration >= 0
    const isValidArtistId = !artistId || uuidValidate(artistId)
    const isValidAlbumId = !albumId || uuidValidate(albumId)

    return isOnlyKnownKeys && isValidName && isValidDuration && isValidArtistId && isValidAlbumId
}

export const isValidUpdateTrackPayload = (updateTrackPayload: UpdateTrackDto) => {
    const props = ['name', 'artistId', 'albumId', 'duration', 'id']
    const { name, artistId, albumId, duration } = updateTrackPayload

    const isOnlyKnownKeys = Object.keys(updateTrackPayload).every((key) => props.includes(key))
    const isValidName = name === undefined || typeof name === 'string'
    const isValidDuration = duration === undefined || (typeof duration === 'number' && duration >= 0)
    const isValidArtistId = !artistId || uuidValidate(artistId)
    const isValidAlbumId = !albumId || uuidValidate(albumId)

    return isOnlyKnownKeys && isValidName && isValidDuration && isValidArtistId && isValidAlbumId
}
