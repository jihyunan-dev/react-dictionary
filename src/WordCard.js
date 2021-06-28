import React from "react";

const WordCard = ({ word_obj }) => {
  const { word, pinyin, definition, example_cn, example_ko } = word_obj;
  return (
    <article>
      <h4>{word}</h4>
      <span>[{pinyin}]</span>
      <p>{definition}</p>
      <hr />
      <div>{example_cn}</div>
      <div>{example_ko}</div>
    </article>
  );
};

export default WordCard;
