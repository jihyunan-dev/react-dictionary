/**
 * words.js : ducks 패턴을 사용한 words 모듈 파일
 * 기능 : 단어 불러오기(무한스크롤), 등록, 암기/미암기 토글, 수정, 삭제
 */

import { firestore } from "../../firebase";

const words_db = firestore.collection("words");

// 액션
const LOAD = "words/LOAD";
const LOAD_MORE = "words/LOAD_MORE";
const ADD = "word/ADD";
const MODIFY = "word/MODIFY";
const COMPLETE = "word/COMPLETE";
const DELETE = "word/DELETE";

// 초기값
const initialState = {
  word_list: [],
  lastValue: 0,
};

// 액션함수
export const loadWords = (words, lastValue) => ({
  type: LOAD,
  words,
  lastValue,
});

export const loadMoreWords = (words, lastValue) => ({
  type: LOAD_MORE,
  words,
  lastValue,
});
export const addWord = (word) => ({ type: ADD, word });
export const updateComplete = (id) => ({ type: COMPLETE, id });
export const modifyWord = (word) => ({ type: MODIFY, word });
export const deleteWord = (id) => ({ type: DELETE, id });

// thunk

// firebase에서 단어들을 처음 불러오는 함수 (특이사항: 무한스크롤 적용을 위해 10개만 끊어서 가져옴)
export const loadWordsFB = () => {
  return function (dispatch) {
    let words = [];
    let lastValue;
    words_db
      .orderBy("date", "desc") // date라는 key를 기준으로 내림차순 정렬
      .limit(10) // 10개만
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          words = [...words, { id: doc.id, ...doc.data() }];
          lastValue = doc.data().date; // 마지막으로 가져온 date값(다음 값을 가져오기 위해 저장)
        });
      })
      .then((res) => dispatch(loadWords(words, lastValue)));
  };
};

// firebase에서 다음 단어들을 불러오는 함수
export const loadMoreWordsFB = (value) => {
  return function (dispatch) {
    let words = [];
    let beforeNum = parseInt(value); // 가장 마지막으로 가져온 date값을 의미
    let lastValue;
    words_db
      .orderBy("date", "desc")
      .startAfter(beforeNum) // 가장 마지막으로 가져온 값 다음부터 시작
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          if (doc.exists) {
            words = [...words, { id: doc.id, ...doc.data() }];
            lastValue = doc.data().date;
          }
        });
      })
      .then((res) => dispatch(loadMoreWords(words, lastValue)));
  };
};

// 새로운 단어 등록 함수
export const addWordFB = (word) => {
  return function (dispatch) {
    let new_word;
    words_db
      .add(word)
      .then((doc) => {
        new_word = { ...word, id: doc.id };
      })
      .then((res) => dispatch(addWord(new_word)));
  };
};

// 암기/미암기 토글 함수
export const updateCompleteFB = (word) => {
  return function (dispatch) {
    words_db.doc(word.id).update({ completed: !word.completed });
    dispatch(updateComplete(word.id));
  };
};

// 단어 내용 변경 함수
export const modifyWordFB = (word, id) => {
  return function (dispatch) {
    words_db.doc(id).update(word);
    const new_word = { ...word, id };
    dispatch(modifyWord(new_word));
  };
};

// 단어 삭제 함수
export const deleteWordFB = (id) => {
  return function (dispatch) {
    words_db.doc(id).delete();
    dispatch(deleteWord(id));
  };
};

// 리듀서
function words(state = initialState, action) {
  switch (action.type) {
    case "words/LOAD":
      return {
        ...state,
        word_list: action.words,
        lastValue: action.lastValue,
      };
    case "words/LOAD_MORE":
      return {
        ...state,
        word_list: [...state.word_list, ...action.words],
        lastValue: action.lastValue,
      };
    case "word/ADD":
      let added_words = [...state.word_list, action.word];
      return {
        ...state,
        word_list: added_words,
      };
    case "word/COMPLETE":
      const new_word_list = state.word_list.map((word) =>
        word.id === action.id ? { ...word, completed: !word.completed } : word
      );
      return {
        ...state,
        word_list: new_word_list,
      };
    case "word/MODIFY":
      let modified_words = state.word_list.map((word) =>
        word.id === action.word.id ? { ...word, ...action.word } : word
      );
      return {
        ...state,
        word_list: modified_words,
      };
    case "word/DELETE":
      let left_words = state.word_list.filter((word) => word.id !== action.id);
      return {
        ...state,
        word_list: left_words,
      };
    default:
      return state;
  }
}

export default words;
