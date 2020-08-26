import React from 'react';

import AddItemForm from '../components/AddItemForm/AddItemForm';
import ItemList from '../components/ItemList/ItemList';


export default function AddItemPage() {
  return (
    <div className="page-wrapper">
      <AddItemForm />
      <ItemList />
    </div>
  );
}