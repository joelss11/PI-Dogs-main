import React from "react";
import styles from "../styles/Card.module.css"

export default function Card({nombre, peso, imagen,Temperamentos}){
  
    return(
        <div className={styles.contenedorCartica}>
            <h3>
            {nombre}
            </h3>
              <img className={styles.imagenCard} src={imagen} alt="no encontra" width="230px" height="210px"/>   
            <h4>  
          {Temperamentos}  
          </h4>
          
        <h5>
            Peso: 
            {peso} kg
        </h5> 

        </div>
    )
}