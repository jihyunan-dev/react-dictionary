import React from "react";
import { useSelector } from "react-redux";
import WordCard from "./WordCard";

const Home = () => {
  const words = useSelector((state) => state.words.word_list);

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
