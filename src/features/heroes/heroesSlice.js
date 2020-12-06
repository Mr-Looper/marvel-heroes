import { createSlice, createSelector } from '@reduxjs/toolkit'
import { marvel } from '../../services/marvel.service'

const totalResults = 20
const initialState = {
  status: 'idle',
  entities: {},
  total: 0,
  offset: 0,
  search: {type: 'name', text: ''}
}

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroAdded(state, action) {
      const hero = action.payload
      state.entities[hero.id] = hero
    },
    heroesLoading(state, action) {
      state.status = 'loading'
    },
    heroesLoaded(state, action) {
      const newEntities = {}
      let i = state.offset
      action.payload.results.forEach((hero) => {
        newEntities[i] = {...hero, show: false, index: i}
        i++
      })
      state.entities = newEntities
      state.total = action.payload.total
      state.status = 'idle'
    },
    heroesLoadedExtra(state, action){
      const newEntities = {}
      let i = state.offset
      action.payload.results.forEach((hero) => {
        newEntities[i] = {...hero, show: false, index: i}
        i++
      })
      state.entities = { ...state.entities, ...newEntities}
      state.total = action.payload.total
      state.status = 'idle'
    },
    offsetAdded(state, action) {
      state.offset = (action.payload || 0)
    },
    resetOffset(state, action) {
      state.offset = 0
    },
  },
})

export const {
  heroAdded,
  heroesLoaded,
  heroesLoadedExtra,
  heroesLoading,
  offsetAdded,
  resetOffset
} = heroesSlice.actions

export default heroesSlice.reducer

// Thunk function

export const searchHero = (typeSearch = 'name', search = '') => async (dispatch, getState) => {
  dispatch(heroesLoading())
  let body= {
    ...marvel.params(),
    offset: 0
  }
  body[`${typeSearch}`] = search
  let endpoint = 'characters'
  const response = await marvel.get(endpoint, body)
  dispatch(heroesLoaded(response))
  dispatch(offsetAdded(response.total))
}

export const fetchHeroes = () => async (dispatch, getState) => {
  if(getState().heroes.total > getState().heroes.offset || getState().heroes.total + getState().heroes.offset === 0){
    dispatch(heroesLoading())
    let body= {
      ...marvel.params(),
      offset: getState().heroes.offset
    }
    let endpoint = 'characters'
    const response = await marvel.get(endpoint, body)
    if(body.offset === 0){
      dispatch(heroesLoaded(response))
    }else{
      dispatch(heroesLoadedExtra(response))
    }
    dispatch(offsetAdded(response.offset + totalResults))
  }
}

const selectHeroEntities = (state) => state.heroes.entities

export const selectHeroes = createSelector(selectHeroEntities, (entities) =>
  Object.values(entities)
)
