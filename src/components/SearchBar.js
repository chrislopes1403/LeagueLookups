import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';




const SearchBar =({onSearch,champions,history})=>{


const [term,setTerm]=useState('');
const [recommendation,setRecommendation]=useState([]);
const [show,setShow]=useState(false);

const onSubmit =(event)=>{

    event.preventDefault();
    setShow(false);

    const regex = new RegExp(`^${escapeRegExp(term)}`,'i');
    const selected = champions.find((champion)=>champion.id.match(regex));

    selected ?  onSearch(selected.id) : onSearch('Not Found');
    
    setTerm('');
    if(history.location.pathname !== '/')
        history.push('/');
}
   
const onInputChange = (event) =>
{
    setTerm(event.target.value);
        const regex = new RegExp(`^${escapeRegExp(event.target.value)}`,'gi');
        setRecommendation([...champions.filter((champion)=>champion.id.match(regex)).slice(0,5)]);
    setShow(true);
};

const handleResultSumbit = (id)=>{
    setShow(false); 
    onSearch(id);
    if(history.location.pathname !== '/')
        history.push('/');
}

/*https://stackoverflow.com/questions/35543445/regex-gives-error-for-certain-chars */
const  escapeRegExp =(string)=>{
    return string.replace(/([.*+?^${}()|[\]\\])/g, "\\$1");
  }



const renderRecommendations = () =>{

    return recommendation.map((item,i)=>{
        return <li onMouseDown={()=>handleResultSumbit(item.id)} key={i}>{item.name}</li>
    });
}


    
return(
    <form className={`search__container  ${show ? "show": ""}`} onSubmit={onSubmit}  onBlur={()=>setShow(false)} >
        <input className="search__input" value={term} onChange={onInputChange} type="text" placeholder="Search"/>
        <div className="results">
            <ul>
                {show  ? renderRecommendations(): ''}
            </ul>
        </div>
    </form>
       );

}

const mapStateToProps = (state)=>{
    return{champions:state.champions}
}

//onclick has a lower priority than blur so change to mousedown
//const regex = new RegExp(`^${searchName}`,'gi');
/*
/^[DrMundo ]$/
gim
^ asserts position at start of a line
Match a single character present in the list below [DrMundo ]
+ matches the previous token between one and unlimited times, as many times as possible, giving back as needed (greedy)
DrMundo  matches a single character in the list DrMundo  (case insensitive)
$ asserts position at the end of a line
Global pattern flags
g modifier: global. All matches (don't return after first match)
i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
m modifier: multi line. Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
*/
//onFocus={()=>setShow(true)} onBlur={()=>setShow(false)}


export default withRouter(connect(mapStateToProps)(SearchBar));