// 2. Pass each into a PromptCard component. -> Display in Flex centered.
"use client";

import React from "react";
import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { rtdb } from "@firebase/config";

import PromptCard from "@components/PromptCard";

// Function to make image name:
const transformString = (str) => {
  return str.toLowerCase().replace(/\s+/g, '_') + ".jpg";
}

const Feed = () => {
  // Define the items state:
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load in the items from Firebase RTDB:
  useEffect(() => {
    const itemsRef = ref(rtdb, "feed_prompts");
    get(itemsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const itemsArr = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          setItems(itemsArr);
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
    <section className="feed">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4 feed_layout">
        {items.map((item) => (
            /* Pass the item and image path as props to PromptCard: */
            <PromptCard key={item.id} item={item} imagePath={transformString(item.title)} />
        ))}
        </div>
      )}
      
    </section>
  )
};

export default Feed;
