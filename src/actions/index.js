import {FETCH_CHAMPIONS,FETCH_CHAMPION_DETAILS,FETCH_CHAMPION_TAGS} from './actionTypes';
import {GeneralApi,DetailsApi} from './../apis/riotAPI';


export const fetchChampions = () =>{

    return async (dispatch,getState)=> {
        
        const {data} = await GeneralApi.get('/champion.json');
        
        const champions = Object.values(data.data);

        dispatch({type:FETCH_CHAMPIONS,payload:champions});
    }
}


export const fetchChampionTags = (Tag) =>{
    return async (dispatch,getState)=> {
        
        const champions = getState().champions;
        const championTags = champions.filter((champion)=>{
            return champion.tags.includes(Tag)
        });
      
        dispatch({type:FETCH_CHAMPION_TAGS,payload:championTags});
    }
    
}

export const fetchChampionDetails = (name) =>{


    return async (dispatch,getState)=> {
        const {data} = await DetailsApi.get(`/${name}.json`);
        
        const champion = (data.data);

        dispatch({type:FETCH_CHAMPION_DETAILS,payload:champion});
    }
}

