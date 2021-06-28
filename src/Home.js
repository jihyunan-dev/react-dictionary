import React from "react";
import { useSelector } from "react-redux";
import WordCard from "./WordCard";
import { Link } from "react-router-dom";

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
      <Link to="/word/add">+</Link>
    </div>
  );
};

export default Home;
