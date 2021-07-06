import React from "react";

import {Link} from "react-router-dom";

const ChampionCard = ({champion}) =>{
    
    if(champion)
    {
        return( 
        <Link to={`/details/${champion.id}`}>
        <figure className="card">
            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`} alt={champion.name}/>
            <figcaption>{champion.name}</figcaption>
        </figure>
        </Link>
        );
    }
    else
    {
        return( 
            <figure className="card">
                <img src='./img/NotFound3.jpg' alt="Not Found"/>
                <figcaption>Lol Who?</figcaption>
            </figure>
            );
    }
}

export default ChampionCard;