import { createSlice, createSelector } from '@reduxjs/toolkit'
import { marvel } from '../../services/marvel.service'

const totalResults = 20
const initialState = {
  status: 'idle',
  entities: {},
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
      action.payload.forEach((hero) => {
        newEntities[i] = {...hero, show: false, index: i}
        i++
      })
      state.entities = newEntities
      state.status = 'idle'
    },
    heroesLoadedExtra(state, action){
      const newEntities = {}
      let i = state.offset
      action.payload.forEach((hero) => {
        newEntities[i] = {...hero, show: false, index: i}
        i++
      })
      state.entities = { ...state.entities, ...newEntities}
      state.status = 'idle'
    },
    paramsAdded(state, action) {
      state.offset = (action.payload.offset || 0) + totalResults
      state.search = {
        type: action.payload.typeSearch,
        text: action.payload.search
      }
    },
    showHero: {
      reducer(state, action) {
        if(action.payload !== -1){
          if(state.entities[action.payload]) state.entities[action.payload].show = true
        }
      },
      prepare(id) {
        return {
          payload: id,
        }
      }
    }
  },
})

export const {
  heroAdded,
  heroesLoaded,
  heroesLoadedExtra,
  heroesLoading,
  paramsAdded,
  showHero
} = heroesSlice.actions

export default heroesSlice.reducer

// Thunk function

export const fetchHeroes = (typeSearch = 'name', search = '') => async (dispatch, getState) => {
  dispatch(heroesLoading())
  let body= {
    ...marvel.params(),
    offset: getState().heroes.offset
  }
  body[`${typeSearch}`] = search

  if(getState().heroes.search.type !== typeSearch || getState().heroes.search.text !== search){
    body.offset = 0
  }
  let endpoint = 'characters'
  const response = await marvel.get(endpoint, body)
  if(body.offset === 0){
    dispatch(heroesLoaded(response.results))
  }else{
    dispatch(heroesLoadedExtra(response.results))
  }
  dispatch(paramsAdded({offset: body.offset, typeSearch, search}))
}

const selectHeroEntities = (state) => state.heroes.entities

export const selectHeroes = createSelector(selectHeroEntities, (entities) =>
  Object.values(entities)
)
