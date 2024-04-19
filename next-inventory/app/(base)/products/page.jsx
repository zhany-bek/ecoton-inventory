"use client"

import React from 'react'
import { rtdb } from '@firebase/config'
import { get, ref } from 'firebase/database';
import Link from 'next/link';

import { useState, useEffect } from 'react';

const constructTree = (snapshot) => {
  const tree = {};
  snapshot.forEach(childSnapshot => {
    const key = childSnapshot.key;
    const value = childSnapshot.val();

    // If the value is an object, recursively construct the subtree
    if (typeof value === 'object') {
      tree[key] = constructTree(childSnapshot);
    } else {
      // Otherwise, store the value directly
      tree[key] = value;
    }
  });
  return tree;
}

const Products = () => {
  const [tree, setTree] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    /*
    const rfidRef = ref(rtdb, 'RFID');

    get(rfidRef)
    .then((snapshot) => {
      const treeData = constructTree(snapshot);
      setTree(treeData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setErrorMessage("Error fetching data")
    })
    */
    const itemsRef = ref(rtdb, 'RFID');
    get(itemsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const itemsKeys = Object.keys(snapshot.val());
          setItems(itemsKeys);
          setIsLoading(false);
        } else {
          console.log("No data available...");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="head_text text-center">Products</h1>
          <div className="feed">
              <div className='mt-4 prod_layout'>
          {items.map(itemId => (
              <div className="feed_card">
                <h2 className="green_smst_head_text text-center">{itemId}</h2>
                <Link href={`/products/${itemId}`} className='outline_btn mt-5'>
                  View Details
                </Link>
              </div>
              
        ))}
        </div>
            </div>
        </div>
      )}
      {/* 
      <h1>Tree Display</h1>
      {tree ? (
        Object.entries(tree).map(([key, value]) => {
          return <ProductCard key={key} itemKey={key} value={value} renderTree={renderTree} />
        })
      ) : (
        <p>Loading...</p>
      )}
      */}
      {errorMessage}
    </div>
  );
}

export default Products
