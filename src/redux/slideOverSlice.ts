import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	showSlideOver: false,
};

export const slideOverSlice = createSlice({
	name: 'slideOver',
	initialState,
	reducers: {
		setShowSlideOver: state => {
			state.showSlideOver = !state.showSlideOver;
		},
	},
});

export const {setShowSlideOver} = slideOverSlice.actions;

export default slideOverSlice.reducer;
