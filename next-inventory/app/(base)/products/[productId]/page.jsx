"use client"

import React from 'react'
import { rtdb } from '@firebase/config'
import { get, ref } from 'firebase/database';
import Link from 'next/link';
import Map from '@components/Map';

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

const sortTree = (tree) => {
  const sortedTree = {};

  // Sort keys of the tree in descending order
  const sortedKeys = Object.keys(tree).sort().reverse();

  // Iterate over each key in sorted order
  sortedKeys.forEach((key) => {
    // Retrieve children of the current key
    const children = tree[key];

    // Sort keys of children in descending order
    const sortedChildrenKeys = Object.keys(children).sort().reverse();

    // Initialize object to hold reversed children
    const reversedChildren = {};

    // Iterate over sorted children keys and reverse their order
    sortedChildrenKeys.forEach((childKey) => {
      // Assign children to the reversed object in reverse order
      reversedChildren[childKey] = children[childKey];
    });

    // Assign reversed children to the sortedTree under the current key
    sortedTree[key] = reversedChildren;
  });

  return sortedTree;
};

const reverseChildren = (children) => {
  if (typeof children !== 'object' || Array.isArray(children)) {
    // If children is not an object, or if it's an array, return it as is
    return children;
  }

  // If children is an object, reverse its keys and return the reversed object
  const reversedObject = {};
  const keys = Object.keys(children).reverse();
  keys.forEach((key) => {
    reversedObject[key] = children[key];
  });
  return reversedObject;
};

const renderTree = (tree) => {
  return Object.entries(tree).map(([key, value]) => {
    if (typeof value === 'object') {
      return (
        <div key={key} className='ml-5'>
          {key.length == 10 ? (
            <p className='font-bold text-green-600'>{key}</p>  
          ) : (
            <p>{key}</p>
          )}
          
          <div style={{ marginLeft: 20 }}>
            {renderTree(value)}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key}>
          <p>{key}: {value}</p>
        </div>
      );
    }
  });
}

const getLatestAddress = (tree) => {
  const dates = Object.keys(tree)
  const necessary_date = dates[0]
  const needed_branch = tree[necessary_date]
  const times = Object.keys(needed_branch)
  const len = times.length
  const final_branch = needed_branch[times[len - 1]]
  let coord_id = ""
  Object.entries(final_branch).map(([key, value]) => {
    coord_id = value
  })
  const arr = coord_id.split(" ")
  //console.log(arr)
  let lat = arr[0]
  let lng = arr[1]
  const res_arr = [lat, lng]
  //console.log(res_arr)
  return res_arr
}

const ProductDetails = ({ params }) => {
  const [tree, setTree] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [latestAddress, setLatestAddress] = useState([])

  useEffect(() => {
    const rfidRef = ref(rtdb, `RFID/${params.productId}`);

    get(rfidRef)
    .then((snapshot) => {
      //console.log(typeof snapshot)
      //console.log(snapshot)
      const treeData = constructTree(snapshot);
      const srtdtr = sortTree(treeData)
      console.log(sortTree(treeData))
      const latestAddr = getLatestAddress(srtdtr)
      setLatestAddress(latestAddr)
      //console.log(latestAddress)
      setTree(srtdtr);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setErrorMessage("Error fetching data")
    })
  }, []);
  
  return (
    <div>
      
      {tree ? (
        <div className='feed'>
          <h1 className='green_head_text'>{params.productId}</h1>
          <div className='map_layout'>
          <div className='map_card'>
            {renderTree(tree)}
          </div>
          <div>
            <Map coords={latestAddress} />
          </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProductDetails
