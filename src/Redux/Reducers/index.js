import { combineReducers } from "redux";
import DocumentaryReducer from "./DocumentaryReducer";


const rootReducer = combineReducers({
    // counter : CounterReducer,
    documentary : DocumentaryReducer
})



export default rootReducer;