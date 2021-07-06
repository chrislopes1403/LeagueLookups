import {FETCH_CHAMPION_DETAILS} from './../actions/actionTypes';


const detailsReducer=(state={},action)=>{

    switch(action.type){
        case FETCH_CHAMPION_DETAILS:
            return action.payload;
        // more cases...
        default:
            return state;

    }

}

export default detailsReducer;