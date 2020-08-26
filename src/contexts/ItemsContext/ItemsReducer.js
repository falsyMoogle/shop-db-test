import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../typeConsts'

export default function itemsReducer(state, action) {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload, isLoading: false }
    case ADD_ITEM:
      return { ...state, items: action.payload }
    case DELETE_ITEM:
      return { ...state, items: action.payload }
    default:
      return state
  }
}
