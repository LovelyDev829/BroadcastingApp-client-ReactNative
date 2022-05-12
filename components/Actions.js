export const nextSong = () => {
    return {
        type: 'NEXT_SONG',
    }
}
export const firstLoad = (newState) => {
    return {
        type: 'FIRST_LOAD',
        state: newState,
    }
}
export const setModeAndAuthorById = (modeId, authorId) => {
    return {
        type: 'SET_MODE_AND_AUTHOR_BY_ID',
        modeId: modeId,
        authorId: authorId
    }
}
export const setModeAndAuthorByPosition = (modePosition, authorPosition) => {
    
    return {
        type: 'SET_MODE_AND_AUTHOR_BY_POSITION',
        modePosition: modePosition,
        authorPosition: authorPosition
    }
}
export const nextAuthor = () => {
    return {
        type: 'NEXT_AUTHOR'
    }
}
export const prevAuthor = () => {
    return {
        type: 'PREV_AUTHOR'
    }
}