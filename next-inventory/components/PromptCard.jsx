import React from "react";
import Image from "next/image";

const PromptCard = ({ item, imagePath }) => {
  return (
    <section className="feed_card">
      <h2 className="feed_sm_head_text">{item.title}</h2>
      <Image
        className="object-contain h-[150px] w-[300px] rounded-lg"
        src={`/assets/images/${imagePath}`}
        alt="Feed image"
        width={300}
        height={200}
      />
      <p className="prod_desc">{item.subtitle}</p>
    </section>
  );
};

export default PromptCard;
