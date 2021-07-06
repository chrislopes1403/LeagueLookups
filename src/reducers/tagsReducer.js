import { FETCH_CHAMPION_TAGS} from '../actions/actionTypes';



const tagsReducer =(state=[],action)=>{

    switch(action.type){
        case FETCH_CHAMPION_TAGS:
            return action.payload;
        default:
            return state;

    }
}

export default tagsReducer;