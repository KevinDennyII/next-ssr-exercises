'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(
    reducer,
    null
  );

  // const [savedCart, setSavedCart] = React.useState([]);
  React.useEffect(() => {
    const savedCart = window.localStorage.getItem('saved-cart');
    dispatch({
      type: 'initialize',
      items: savedCart === null ? [] : JSON.parse(savedCart)
    })
  }, [])

  React.useEffect(() => {
    if(items !== null){
      window.localStorage.setItem('saved-cart', JSON.stringify(items));
    }
  })

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                // setSavedCart([...savedCart, item]);
                // window.localStorage.setItem('saved-cart', JSON.stringify(savedCart));
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
