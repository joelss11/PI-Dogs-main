import React from "react";
import styles from "../styles/Card.module.css"

export default function Card({nombre, peso, imagen,temperament}){
  
    return(
        <div className={styles.contenedorCartica}>
            <h3 className={styles.textoh3} >
            {nombre}
            </h3>
              <img className={styles.imagenCard} src={imagen} alt="no encontra" width="230px" height="210px"/>   
            <h4>  
          {temperament}  
          </h4>
          
        <h5>
            
            {peso} kg
        </h5> 

        </div>
    )
}