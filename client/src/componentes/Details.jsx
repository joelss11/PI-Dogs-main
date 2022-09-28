import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail,getClean,setLoading,setError } from "../actions";
import { lazy, Suspense, useEffect, useState } from "react";
import styles from'../styles/Details.module.css'
import Card from "./Card";



export default function Details(props){
    console.log(props)

    const dispatch=useDispatch();
   

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
        dispatch(setLoading(getDetail()))
        return()=>{
          dispatch(getClean())
        }
    },[dispatch])

    const  { loading, error} = useSelector((state)=>state)
    const  myDog = useSelector((state)=>state.details)
    console.log(myDog);
    
    
    return (
        
      <div className={styles.contenedorAll}>
         <div className={styles.containerDetail}>
        
            <div className={styles.cardDetails}>
              <div className={styles.divImgDetail}>
                <img src={myDog.imagen} alt="" className={styles.pictureDetalle}  />
              </div>
              <div className="content-detail">
                
                <h1 className={styles.nameDetail}>{myDog.nombre} </h1>
                <div className={styles.contenedorconte}>
                 
                    <p className={styles.altura}> Altura </p>
                    <div className={styles.wapperBody}>
                    <p className={styles.altu}>{`${myDog.alturaMin} - `}</p>
                    
                    <p className={styles.altumax}>{` ${myDog.alturaMax} cm`}</p>
                  </div>
                 
                    <p className={styles.peso}>Peso</p>
                    <div className={styles.peson}>
                    <p className={styles.altupesomin}>{`${myDog.pesoMin} -`}</p>
                    <p className={styles.altupeso}>{`${myDog.pesoMax} kg`}</p>
                  
                  </div>
                  <div className={styles.contenedorVida}>
                    <p className={styles.espe}>Esperanza de vida </p>
                    <p className="container-body">
                     <h4 className={styles.esperanza}>{myDog.createdInDb ? `${myDog.añosDeVida}  years` : myDog.añosDeVida}</h4>
                    </p>
                  </div>
                  <div className={styles.conteTempera}>
                <p className={styles.tempe}>Temperamentos </p>
                <div className={styles.temperamentico}>
                {myDog.temperament||myDog.Temperamentos?.map(e=>", "+e.nombre )}
                </div>
              </div>

                </div>
                <div className={styles.botonBack}>
                <Link to="/home"><button className={styles.botoncito}><img className={styles.imagen} src="https://cdn-icons-png.flaticon.com/512/8482/8482632.png" alt="" /></button></Link>
                </div>
              </div>
            </div>
            
          </div>
          </div>     

    )     
}
