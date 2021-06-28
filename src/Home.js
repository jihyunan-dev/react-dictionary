import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WordCard from "./WordCard";
import { Link } from "react-router-dom";
import { loadWordsFB } from "./redux/module/words";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(loadWordsFB()), []);

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
