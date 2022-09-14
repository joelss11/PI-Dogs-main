import React from "react";
import {useState, useEffect} from  'react';
import{useDispatch, useSelector} from 'react-redux';
import { getDogs,filterDogsByPeso,filterCreated, orderByName } from "../actions"; 
import{Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home (){
    const dispatch = useDispatch();
    const allDogs= useSelector((state)=>state.dogs)
    const[orden, setOrden]=useState('')
    const [currentPage, setCurrentPage] = useState(1)//estado local -- pagina donde estoy y cual va hacer la pagna actual 
    const [dogsPerPage,setdogsPerPage] = useState(8)//cantida de cararter por paginana
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    

    useEffect(()=>{
        dispatch(getDogs())
    }, [])

    function handleClick(e){
      e.preventDefault();
      dispatch(getDogs());
    }
 
   function handleFilterStatus(e){
     dispatch(filterDogsByPeso(e.target.value))
   }


   function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
   }

   function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value} `)
   }

    return(
        <div>
            <Link to="/dog">Crear Dog</Link>
            <h1>App Dogs</h1>
            <button onClick={e=>{handleClick(e)}}> Volver A Cargar todos los Dogs!</button>

            <div>
                <select onChange={e=>{handleSort(e)}}>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>

                <select onChange={e=>{handleFilterStatus(e)}}>
                    <option value="alfab">Orden Alfabetico</option>
                    <option value="peso">Peso</option>
                    <option value="nombre">Razas</option>
                    <option value="Temperamento">Temperamento</option>
                </select>

                <select onChange={e=>handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="created">Creados DB</option>
                    <option value="api">Api</option>
                </select>
                <Paginado 
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                    {
                 currentDogs.map((c)=>{
                    return(
            
                    <Card nombre={c.nombre} Temperamentos={c.Temperamentos} peso={c.peso['imperial']||c.peso} imagen={c.imagen['url']||c.imagen}  key={c.id} />
                       
                    );
                })
               
            }      
            </div>
        </div>
    )
   
}