import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RoundBtn } from "./Btn";
import WordCard from "./WordCard";
import { TiPlus } from "react-icons/ti";

const Home = () => {
  const words = useSelector((state) => state.words.word_list);
  return (
    <div>
      <Cards>
        {words.map((word) => (
          <WordCard key={word.id} word_obj={word} />
        ))}
      </Cards>
      <AddBtn to="/word/add">
        <Plus />
      </AddBtn>
    </div>
  );
};

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  padding: 50px 0;
`;

const Plus = styled(TiPlus)`
  font-size: 28px;
`;

const AddBtn = styled(Link)`
  ${RoundBtn};
  position: fixed;
  bottom: 10px;
  right: 10px;

  ${({ theme }) => theme.device.tablet} {
    bottom: 20px;
    right: 20px;
  }

  ${Plus} {
    transition: transform 300ms ease-in-out;
  }

  &:hover {
    ${Plus} {
      transform: rotate(90deg);
    }
  }
`;

export default Home;
