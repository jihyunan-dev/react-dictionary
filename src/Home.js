import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WordCard from "./WordCard";

const Home = () => {
  const words = useSelector((state) => state.words.word_list);
  return (
    <div>
      <Cards>
        {words.map((word) => (
          <WordCard key={word.id} word_obj={word} />
        ))}
      </Cards>
      <Link to="/word/add">+</Link>
    </div>
  );
};

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 50px 0;
`;

export default Home;
