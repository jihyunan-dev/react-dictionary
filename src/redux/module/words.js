import { firestore } from "../../firebase";

const words_db = firestore.collection("words");

// 액션
// const CHANGE_MODE = "words/CHANGE_MODE";
const LOAD = "words/LOAD";
const LOAD_MORE = "words/LOAD_MORE";
const COUNT = "words/COUNT";
const ADD = "word/ADD";
const MODIFY = "word/MODIFY";
// const COMPLETE = "word/COMPLETE";
const DELETE = "word/DELETE";

// 초기값

const initialState = {
  word_list: [],
  lastValue: 0,
  //mode 추가 예정
};

// 액션함수

export const loadWords = (words, lastValue) => ({
  type: LOAD,
  words,
  lastValue,
});
export const loadMoreWords = (words) => ({ type: LOAD_MORE, words });
export const addWord = (word) => ({ type: ADD, word });
export const modifyWord = (word) => ({ type: MODIFY, word });
export const deleteWord = (id) => ({ type: DELETE, id });

export const loadMoreWordsFB = (value) => {
  return function (dispatch) {
    let words = [];
    let beforeNum = parseInt(value);
    let lastValue;
    words_db
      .orderBy("date", "desc")
      .startAfter(beforeNum)
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
      .then((res) => dispatch(loadMoreWords(words), lastValue));
  };
};

export const loadWordsFB = () => {
  return function (dispatch) {
    let words = [];
    let lastValue;
    words_db
      .orderBy("date", "desc")
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          words = [...words, { id: doc.id, ...doc.data() }];
          lastValue = doc.data().date;
        });
      })
      .then((res) => dispatch(loadWords(words, lastValue)));
  };
};

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
    case "word/MODIFY":
      let modified_words = state.word_list.map((word) =>
        word.id === action.word.id ? action.word : word
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
