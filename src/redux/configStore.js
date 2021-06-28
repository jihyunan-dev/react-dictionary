import { createBrowserHistory } from "history";
import { createStore, combineReducers } from "redux";
import words from "./module/words";

export const history = createBrowserHistory();

const rootReducer = combineReducers({ words });

const store = createStore(rootReducer);

export default store;
