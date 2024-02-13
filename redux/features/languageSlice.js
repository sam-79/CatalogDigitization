import { createSlice } from '@reduxjs/toolkit';
import { getLocales } from 'expo-localization';
import i18next from '../../services/i18next'
// import { initI18Next } from '../../App'
const deviceLanguage = getLocales()[0].languageCode;

const initialState = {
    language: deviceLanguage
};




// confirmSignup

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLng: (state, action) => {
            state.language = action.payload.lng
            i18next.changeLanguage(action.payload.lng);

        },
    },
});

export const { changeLng } = languageSlice.actions
export default languageSlice.reducer;