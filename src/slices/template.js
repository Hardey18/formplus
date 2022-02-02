import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TemplateDataService from "../services/TemplateService";

const initialState = [];

export const retrieveTemplate = createAsyncThunk("/", async () => {
  const res = await TemplateDataService.getAll();
  return res.data;
});

const templateSlice = createSlice({
  name: "template",
  initialState,
  extraReducers: {
    [retrieveTemplate.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = templateSlice;
export default reducer;
