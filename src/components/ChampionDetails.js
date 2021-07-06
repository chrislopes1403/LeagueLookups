import React, { useCallback, useEffect, useState } from "react";
import {connect} from 'react-redux';
import { fetchChampionDetails } from "./../actions";
import './carousel.css';
import './details.css';


 


const ChampionDetails = ({match, fetchChampionDetails,champion,history})=>{

    const [description,setDescription]=useState('');
    const [slideInfo,setSlideInfo]=useState(false);
    const [slides,setSlides]=useState(false);
    const [currentSlide,setCurrentSlide]=useState(0);
    
    
    const details = champion[`${match.params.champion}`];
    const descriptions=[];
   
  

    useEffect(()=>{
      fetchChampionDetails(match.params.champion);

       
       

    },[]);

    const slideRef =  useCallback((slideRefNode)=>{
        
        if(history.location.pathname !== '/')
        {
        setSlideInfo(slideRefNode.getBoundingClientRect());
        setSlides(slideRefNode);
        }
    },[]);
    /*https://medium.com/welldone-software/usecallback-might-be-what-you-meant-by-useref-useeffect-773bc0278ae */


    if(details)
    {

        let regex = new RegExp('<.*?>','g');
        let filteredPassive =details.passive.description.replace(regex,'');

        descriptions.push(filteredPassive);

        details.spells.forEach((ability,i)=>{ 

           
            let filteredDescription = ability.description.replace(regex,'');
            descriptions.push(filteredDescription);
        });
    }


    const handleDescription = (order)=>{

        setDescription(descriptions[order])  
    }

    const moveToSlide=(targetNode)=>{
        
        const amountToMove = targetNode.style.left;
       
        slides.style.transform=`translateX(-${amountToMove})`;
    }


   
    const handleNext=()=>{

        const currentNode = slides.querySelector('.current-slide');
        const nextNode = currentNode.nextElementSibling;
        
        moveToSlide(nextNode);

        setCurrentSlide(currentSlide+1);
    }

    const handlePrev=()=>{

        const currentNode = slides.querySelector('.current-slide');
        const previousNode = currentNode.previousElementSibling;
       
        moveToSlide(previousNode);
        setCurrentSlide(currentSlide-1);
    }

    


    const handleDots = (index)=>{

        var Slides = slides.getElementsByTagName('li');
        const targetNode = Slides[index];
        setCurrentSlide(index);
        moveToSlide(targetNode);
    }


    
    const renderAbilities = ()=>{

           return( 
            <div className="skills">
                    <div className="skill-card" onClick={()=>handleDescription(0)}>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/passive/${details.passive.image.full}`} alt=""/>
                    </div>

                {
                    details.spells.map((ability,i)=>{
                        return (<div key={i} className="skill-card" onClick={()=>handleDescription(i+1)}>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/spell/${ability.image.full}`} alt=""/>
                                </div>);
                    })
                }
           </div>);

    }



    const renderSkins = () =>{


        const correctOrder = details.skins;

        return <ul className="carousel_list" id="carousel_list" ref={slideRef}>


                    {correctOrder.map((skin,i)=>{

                        return  <li style={{left:`${slideInfo.width*i}px`}}  key={i} className={`carousel_slide ${i===currentSlide ? 'current-slide':''}`}>
                                    <img   className="carousel_image" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${details.id}_${skin.num}.jpg`} alt={`${skin.name}}`}/>
                                </li>
                    })

                    }
                </ul>    
    }

    const renderIndicators=()=>{


        return <div className="carousel_nav">

                    {
                        details.skins.map((skin,i)=>{
                            return <button
                                        onClick={()=>handleDots(i)}
                                        key={i} 
                                        className={`carousel_indicator ${i===currentSlide ? 'current-slide': ''}`}
                                    />
            
                        })
                    }
                  
                </div>
    }



    return   details ? (
    <div>
        
        <h2 className="top-h2"><strong id="results-description">{details.id}</strong></h2>
        <div className="details">
            <div>
                <h3 className={`skins-header ${currentSlide===0 ? 'hideText' : ''}`}>{details.skins[currentSlide].name}</h3>
                <div className="carousel">
                    <button className={`carousel_button carousel_button--right ${currentSlide===details.skins.length-1 ? 'current-slide': ' '} ${currentSlide===details.skins.length-1 ? 'isHidden': ' '}`} onClick={handleNext}>
                        <i className="fas fa-chevron-right fa-3x"></i>
                    </button>
            
                    <div className="carousel_list_container">

                            
                        {renderSkins()}


                    </div>
            
                    <button className={`carousel_button carousel_button--left ${currentSlide===0 ? 'isHidden': ' '}`} onClick={handlePrev}>
                        <i className="fas fa-chevron-left fa-3x"></i>
                    </button>
            
                    
                    {renderIndicators()}

                </div>
            </div>
            <div className="skill-container">
                <h2 className="bot-h2"><strong id="results-description">Skills</strong></h2>
               
                    
                    {renderAbilities()}

                

                <div className="skill-details">

                    <p>{description}</p>

                </div>

            </div>
        </div>
    </div>
    ) : '';

}


const mapStateToProps = (state) =>{
    
    return {
        champion:state.championDetails,
    }
} 

export default connect(mapStateToProps,{fetchChampionDetails})(ChampionDetails);
