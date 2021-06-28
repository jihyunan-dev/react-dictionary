import React, { useRef } from "react";
import CustomInput from "./CustomInput";

const Add = () => {
  const wordRef = useRef(null);
  const pinyinRef = useRef(null);
  const defRef = useRef(null);
  const exCnRef = useRef(null);
  const exKoRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이후 dispatch를 사용하여 db 및 store에 저장(add)하는 기능으로 만들기
  };

  return (
    <div>
      <h1>단어 추가하기</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput title="단어" idText="input-word" ref={wordRef} />
        <CustomInput title="병음" idText="input-pinyin" ref={pinyinRef} />
        <CustomInput title="의미" idText="input-def" ref={defRef} />
        <CustomInput title="예문" idText="input-ex-cn" ref={exCnRef} />
        <CustomInput title="해석" idText="input-ex-ko" ref={exKoRef} />
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
};

export default Add;
