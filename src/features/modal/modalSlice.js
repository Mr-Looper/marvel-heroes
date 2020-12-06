import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    content: {}
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: {
            reducer(state, action) {
                state.status = action.payload.status
                state.content = action.payload.content
            },
            prepare(status, content = {}) {
                return {
                    payload: { status, content },
                }
            }
        }
    },
})

export const {
    setModal,
} = modalSlice.actions


export default modalSlice.reducer
