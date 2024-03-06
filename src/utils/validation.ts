import { CreateArtistDto, UpdateArtistDto } from "src/artists/artists.interfaces";
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
    const {name, artistId, albumId, duration } = createTrackPayload

    const isOnlyKnownKeys = isOnlyKnownTrackProps(createTrackPayload)
    const isValidName = typeof name === 'string' && name.trim()
    const isValidDuration = typeof duration === 'number' && duration >= 0
    const isValidArtistId = !artistId || uuidValidate(artistId)
    const isValidAlbumId = !albumId || uuidValidate(albumId)

    return isOnlyKnownKeys && isValidName && isValidDuration && isValidArtistId && isValidAlbumId
}

export const isValidUpdateTrackPayload = (updateTrackPayload: UpdateTrackDto) => {
    const { name, artistId, albumId, duration } = updateTrackPayload

    const isOnlyKnownKeys = isOnlyKnownTrackProps(updateTrackPayload)
    const isValidName = name === undefined || typeof name === 'string'
    const isValidDuration = duration === undefined || (typeof duration === 'number' && duration >= 0)
    const isValidArtistId = !artistId || uuidValidate(artistId)
    const isValidAlbumId = !albumId || uuidValidate(albumId)

    return isOnlyKnownKeys && isValidName && isValidDuration && isValidArtistId && isValidAlbumId
}

const isOnlyKnownTrackProps = (payload: UpdateTrackDto | CreateTrackDto)=> {
    const props = ['name', 'artistId', 'albumId', 'duration']

    return Object.keys(payload).every((key) => props.includes(key))
}

export const isValidCreateArtistPayload = (createArtistPayload: CreateArtistDto) => {
    const isOnlyKnownKeys = Object.keys(createArtistPayload).every((key) => key === 'name' || key === 'grammy')
    const isValidName = typeof createArtistPayload.name === 'string' && createArtistPayload.name.trim()
    const isValidGrammy = typeof createArtistPayload.grammy === 'boolean'

    return isOnlyKnownKeys && isValidName && isValidGrammy
}

export const isValidUpdateArtistPayload = (updateArtistPayload: UpdateArtistDto) => {
    const isOnlyKnownKeys = Object.keys(updateArtistPayload).every((key) => key === 'name' || key === 'grammy')
    const isValidName = updateArtistPayload.name === undefined || (typeof updateArtistPayload.name === 'string' && updateArtistPayload.name.trim())
    const isValidGrammy = updateArtistPayload.grammy === undefined || typeof updateArtistPayload.grammy === 'boolean'

    return isOnlyKnownKeys && isValidName && isValidGrammy
}