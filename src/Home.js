import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RoundBtn } from "./Btn";
import WordCard from "./WordCard";
import { TiPlus } from "react-icons/ti";
import { countWords, loadMoreWordsFB } from "./redux/module/words";

const Home = () => {
  const words = useSelector((state) => state.words.word_list);
  const count = useSelector((state) => state.words.count);

  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);

  console.log(target);

  useEffect(() => {
    let options = {
      threshold: "1",
    };

    let handleIntersection = async ([entries], observer) => {
      if (!entries.isIntersecting) {
        return;
      } else {
        console.log("ff");
        await dispatch(loadMoreWordsFB(count));
        await dispatch(countWords(10));
        observer.unobserve(entries.target);
      }
    };

    console.log(target);

    const io = new IntersectionObserver(handleIntersection, options);
    if (target) io.observe(target);

    return () => io && io.disconnect();
  }, [target]);

  return (
    <div>
      <Cards>
        {words.map((word, idx) => {
          const lastItem = idx === words.length - 1;
          return (
            <WordCard
              key={word.id}
              word_obj={word}
              ref={lastItem ? setTarget : null}
            />
          );
        })}
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
