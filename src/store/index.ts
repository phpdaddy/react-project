import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./root.reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

//reducers produce the state of your application

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;