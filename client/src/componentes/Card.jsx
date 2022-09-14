import React from "react";

export default function Card({nombre, peso, imagen,Temperamentos}){

    return(

        <div>
            <h3>
            
            {nombre}
            </h3>
            <h4>  

          {Temperamentos} 
          </h4>
        <h5>
            Peso: 
            {peso} kg
        </h5>
    
     
        <img src={imagen} alt="no encontra" width="200px" height="250px"/>
        </div>
    )
}