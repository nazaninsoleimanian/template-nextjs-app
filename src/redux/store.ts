import {combineReducers, configureStore} from '@reduxjs/toolkit';
import nameReducer from './nameSlice';
import slideOverReducer from './slideOverSlice';

export const combinedReducers = combineReducers({
	name: nameReducer,
	slideOver: slideOverReducer,
});

export const createStore = (preloadedState = {}) =>
	configureStore({
		reducer: combinedReducers,
		preloadedState,
		devTools: process.env.NODE_ENV === 'development',
	});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
