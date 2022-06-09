import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dataAdapter, { AdaptedDataInterface, ArrayOfAdaptedDataInterface } from '../../app/dataAdapter';
import {  AppThunk } from '../../app/store';

export type AppStatus = 'loading' | 'idle'

export interface CounterState {
  data: AdaptedDataInterface[]
  status: AppStatus
  id: null | number
}

const initialState: CounterState = {
  data: [],
  status: 'idle',
  id: null,
};

export const counterSlice = createSlice({
  name: 'core',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setStatus: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload;
    },
    setData: (state, action: PayloadAction<ArrayOfAdaptedDataInterface>) => {
      state.data = action.payload || [];
    },
    setId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload 
    },
    removeElement: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(el => el.id !== action.payload) 
    },
  },
});

export const { setStatus, setData, setId, removeElement } = counterSlice.actions;

export const initData =
  (url: string): AppThunk =>
  async (dispatch, getState) => {
    try{
      dispatch(setStatus('loading'))
      let data = await dataAdapter(url)
      dispatch(setData(data))
    }catch(e){
      console.log("АхТУНГ")
      new Error("Что то пошло не так при загрузке данных с API")
    }finally{
      dispatch(setStatus('idle'))
    }
  };

export default counterSlice.reducer;
