import {combineReducers} from 'redux';
import generalReducer from './generalReducer';
import tagsReducer from './tagsReducer';
import detailsReducer from './detailsReducer';

export default combineReducers({
   champions:generalReducer,
   championTags:tagsReducer,
   championDetails:detailsReducer
});