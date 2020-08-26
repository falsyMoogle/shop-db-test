import React, { useReducer, useContext } from 'react';
import firebase from '../../services/firebase';

import itemsReducer from './ItemsReducer';
import { ItemsContext } from './ItemsContext';
import { AuthContext } from '../AuthContext/Auth';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../typeConsts';

export const ItemsState = ({ children }) => {
  const initialState = {
    items: [],
  };
  const { userInfo } = useContext(AuthContext)

  const [state, dispatch] = useReducer(itemsReducer, initialState)

  const { items } = state;

  const db = firebase.firestore();

  const getItems = async (data) => {
    const recievedData = await data;

    dispatch({
      type: GET_ITEMS,
      payload: [...recievedData]
    })
  }

  const addItem = async (item) => {
    await db.collection('shopItems').doc(userInfo.shop).collection('items').doc(item.id).set(item);

    dispatch({
      type: ADD_ITEM,
      payload: [...items, item]
    })
  };

  const deleteItem = (id) => {
    db.collection('shopItems').doc(userInfo.shop).collection('items').doc(id).delete();

    const newArr = items.filter(item => item.id !== id);

    dispatch({
      type: DELETE_ITEM,
      payload: [...newArr]
    })
  }

  return (
    <ItemsContext.Provider value={ {
      items,
      getItems,
      addItem,
      deleteItem,
    } }>
      { children }
    </ItemsContext.Provider>
  )
}