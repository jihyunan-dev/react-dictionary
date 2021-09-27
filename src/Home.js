/**
 * Home.js : 메인 페이지
 * 특이사항 : Intersection Observer를 이용한 무한 스크롤(참고만 해주세요✨)
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";

// components & elements
import WordCard from "./WordCard";
import { RoundBtn } from "./Btn";

// redux
import { loadMoreWordsFB } from "./redux/module/words";

const Home = () => {
  const words = useSelector((state) => state.words.word_list);
  const lastValue = useSelector((state) => state.words.lastValue);

  const dispatch = useDispatch();

  // Intersection Observer API를 이용하여 무한 스크롤 구현 : MDN (https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
  const [target, setTarget] = useState(null); // 구독할 대상 (target을 지켜보고 있다가 이 target이 정해진 threshold 비율만큼 보이면 지정한 행동을 합니다. )

  useEffect(() => {
    // 새롭게 생성할 observer에 전달될 설정값
    let options = {
      threshold: "1",
    };

    // 새롭게 생성할 observer가 수행할 행동 정의
    let handleIntersection = async ([entries], observer) => {
      if (!entries.isIntersecting) {
        return;
      } else {
        await dispatch(loadMoreWordsFB(lastValue));
        observer.unobserve(entries.target);
      }
    };

    // 새로운 observer 생성
    const io = new IntersectionObserver(handleIntersection, options);
    if (target) io.observe(target);

    return () => io && io.disconnect();
  }, [target]);

  return (
    <div>
      <Cards>
        {words.map((word, idx) => {
          // 새로 불어온 데이터 중 가장 마지막 값을 찾아 target으로 설정함 (마지막 데이터를 구독, 데이터를 새로 불러올 때마다 target이 바뀜)
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

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
