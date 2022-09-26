import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail,getClean,setLoading,setError } from "../actions";
import { lazy, Suspense, useEffect } from "react";
import Card from "./Card";



export default function Details(props){
    console.log(props)

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
        dispatch(setLoading(false))
        return()=>{
          dispatch(getClean())
        }
    },[dispatch])

    const  { loading, error} = useSelector((state)=>state)
    const  myDog = useSelector((state)=>state.details)
    console.log(myDog);
    
    
    return (
        
      
         <div className="container-detail">
        
      
           
            <div className="card-detail">
              <div className="divImgDetail">
                <img src={myDog.imagen} alt="" className="pictureDetalle" />
              </div>
              <div className="content-detail">
                <p>Nombre:</p>
                <h1 className="name-detail">{myDog.nombre} </h1>
                <div className="body-container">
                  <div className="wapper-body">
                    <p className="subtaitel-body"> Altura Minima:</p>
                    <p className="container-body">{`${myDog.alturaMin} cm`}</p>
                  </div>
                  <div className="wapper-body">
                    <p className="subtaitel-body"> Altura Maxima:</p>
                    <p className="container-body">{`${myDog.alturaMax} cm`}</p>
                  </div>
                  <div className="wapper-body">
                    <p className="subtaitel-body">Peso Minimo:</p>
                    <p className="container-body">{`${myDog.pesoMin} kg`}</p>
                  </div>
                  <div className="wapper-body">
                    <p className="subtaitel-body">Peso Maximo:</p>
                    <p className="container-body">{`${myDog.pesoMax} kg`}</p>
                  </div>
                  <div className="wapper-body">
                    <p className="subtaitel-body">Esperanza de vida: </p>
                    <p className="container-body">
                     <h4>{myDog.createdInDb ? `${myDog.añosDeVida}  years` : myDog.añosDeVida}</h4>
                    </p>
                  </div>
                  <div className="wapper-body">
                <p className="subtaitel-body">Temperamentos: </p>
                <div className="container-body-temperament">
                {myDog.temperament||myDog.Temperamentos?.map(e=>e.nombre +" ")}
                </div>
              </div>
                </div>
              
                <div>
                <Link to="/home"><button>Back</button></Link>
                </div>
              </div>
            </div>
           
          </div>
                

    )     
}
