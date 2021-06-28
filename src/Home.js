import React, { useState } from "react";
import WordCard from "./WordCard";

const Home = () => {
  const initialWords = [
    {
      word: "航海",
      pinyin: "hánghǎi",
      definition: "항해(하다)",
      example_cn: "他爷爷是一位有经验的航海家。",
      example_ko: "그의 할아버지는 경험이 많은 항해사이시다.",
      id: 0,
    },
  ];
  const [words, setWords] = useState(initialWords);

  return (
    <div>
      <h1>My Dictionary</h1>
      <div>
        {words.map((word) => (
          <WordCard key={word.id} word_obj={word} />
        ))}
      </div>
      <button type="button">+</button>
    </div>
  );
};

export default Home;
