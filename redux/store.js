import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './features/authSlice';
import hostnameSlice from './features/hostnameSlice';
import retailproductSlice from './features/retailproductSlice'
import languageSlice from './features/languageSlice';

//config data for persistent data
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["auth", "retailproduct", "language","hostname"],

};

//combining all reducers where data needs to be persisted
const rootReducer = combineReducers({
    hostname: hostnameSlice,
    auth: authSlice,
    retailproduct: retailproductSlice,
    language: languageSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

//creating persistent storage
// export const store = configureStore({
//     reducer: persistedReducer,


//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// })
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
});

//export persistor
export const persistor = persistStore(store)
