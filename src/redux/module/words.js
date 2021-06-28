// 액션
// const CHANGE_MODE = "words/CHANGE_MODE";
const LOAD = "words/LOAD";
const ADD = "word/ADD";
const MODIFY = "word/MODIFY";
// const COMPLETE = "word/COMPLETE";
const DELETE = "word/DELETE";

// 초기값

const initialState = {
  word_list: [
    {
      word: "航海",
      pinyin: "hánghǎi",
      definition: "항해(하다)",
      example_cn: "他爷爷是一位有经验的航海家。",
      example_ko: "그의 할아버지는 경험이 많은 항해사이시다.",
      id: 0,
    },
  ],
};

// 액션함수

export const loadWords = () => ({ type: LOAD });
export const addWord = (word) => ({ type: ADD, word });
export const modifyWord = (word) => ({ type: MODIFY, word });
export const deleteWord = (id) => ({ type: DELETE, id });

// 리듀서

function words(state = initialState, action) {
  switch (action.type) {
    case "words/LOAD":
      return;
    case "word/ADD":
      let added_words = [...state.word_list, action.word];
      return {
        ...state,
        word_list: added_words,
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
