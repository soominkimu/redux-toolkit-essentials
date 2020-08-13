# Redux Toolkit Tutorial - Essentials

- Original tutorial codes (https://redux.js.org/tutorials/essentials/part-3-data-flow) converted to TypeScript.
- CSS file converted to SASS

## Basic template
`npx create-react-app rtkt --template typescript`

## Redux Toolkit APIs used
- createSlice
- createAsyncThunk
- createEntityAdapter
- createSelector

## TypeScript for the Redux Toolkit
`export type RootState = ReturnType<typeof store.getState>`

`type AppDispatch = typeof store.dispatch`

`export const useAppDispatch = () => useDispatch<AppDispatch>`
