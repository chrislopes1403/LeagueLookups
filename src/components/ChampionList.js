
import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import ChampionCard from './ChampionCard';
import {Tags} from './Tags';


const ChampionList =({champions,championTags,searchTerm})=>{

    useEffect(()=>{

    },[searchTerm]);

    const renderAllList =()=>{

        return  champions.map((champion,index)=>{
            return <ChampionCard key={index} champion={champion}/>
        })
    }
    const renderTagsList =()=>{
        return  championTags.map((champion,index)=>{
            return <ChampionCard key={index} champion={champion}/>
        })

    }

    const renderSelectedList =()=>{

        const selected = champions.find(champion=>champion.id===searchTerm);
        return <ChampionCard champion={selected}/>
    }

    const title =  searchTerm==='All' ? 'All Champions' : ( Tags.includes(searchTerm) ? `${searchTerm}s` : searchTerm )
    const count =  searchTerm==='All' ? champions.length : ( Tags.includes(searchTerm) ? championTags.length : 1 )

    return (   
    <div className="wrapper">
        <h2 className="top-h2"><strong className="results-description">{title}<span className="card-count">{`( ${count} )`}</span></strong></h2>
        <div className="cards" id="cards">

        {Tags.includes(searchTerm) ? renderTagsList() : ( searchTerm ==='All'? renderAllList() : renderSelectedList() )}

        </div>      
    </div>);
}


const mapStateToProps = (state) =>{
    return {
        champions:state.champions,
        championTags:state.championTags
    }
} 

export default connect(mapStateToProps)(ChampionList);


