import {FETCH_CHAMPIONS} from './../actions/actionTypes';


const generalReducer=(state=[],action)=>{

    switch(action.type){
        case FETCH_CHAMPIONS:
            return action.payload;
        // more cases...
        default:
            return state;
    }

}


export default generalReducer;