import React from "react";
import {useState, useEffect} from  'react';
import{useDispatch, useSelector} from 'react-redux';
import { getDogs,filterDogsByPeso,filterCreated, orderByName, getTemperaments,FilterByTemperament } from "../actions"; 
import{Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../styles/Home.css"

export default function Home (){
    const dispatch = useDispatch();
    const allDogs= useSelector((state)=>state.dogs)
    const allTemperamentos=useSelector((state)=>state.temperaments)

    const[orden, setOrden]=useState('')
    const [currentPage, setCurrentPage] = useState(1)//estado local -- pagina donde estoy y cual va hacer la pagna actual 
    const [dogsPerPage,setdogsPerPage] = useState(9)//cantida de cararter por paginana
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    

    useEffect(()=>{
        dispatch(getDogs())
    }, [dispatch])
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch])



    function handleClick(e){
      e.preventDefault();
      dispatch(getDogs());
    }
 
   function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
   }

   function handleFilterTemperamento(e){
    e.preventDefault();    
    dispatch(FilterByTemperament(e.target.value));
    
   }

   function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value} `)
   }

   function handleOrderByPeso(e) {
    e.preventDefault();
    dispatch(filterDogsByPeso(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value} `)
  }

 


    return(
        <div className="container">
            <h1 className="tituloPrincipal">𝓓𝓸𝓰𝓼𝓟𝓻𝓸</h1>
            <Link to="/">
            <img className="imagenLogo"src="https://media.istockphoto.com/vectors/cute-dog-vector-logo-illustration-vector-id1006358538?k=20&m=1006358538&s=170667a&w=0&h=ycbWpHpr6nx3x7euQP-eP9jL2RYD17TpLOM6UpdZIjI=" alt="" />
            </Link>
            <div>
             <Link to="/dogs">
            <button className="botonimagen"><img className="imagenAdd"src="https://cdn-icons-png.flaticon.com/512/6569/6569784.png" alt="" /></button>
                </Link>
                </div>

                <div className="BotonRefresh">
                <button className="botonRefres" onClick={e=>{handleClick(e)}}><img className="imagenRefres"src="https://cdn-icons-png.flaticon.com/512/724/724863.png" alt="" /></button>
                </div>
            
                <SearchBar/>
            <div>
                <div className="filtros">
                <select className="selector" onChange={e=>{handleSort(e)}}>
                <option hidden>Orden Alfabetico</option>
                    <option value="asc">A-Z ↓</option>
                    <option value="des">Z-A ↑</option>
                </select>

                <select className="selector" onChange={e=>{handleOrderByPeso(e)}}>
                <option hidden>Peso</option>
                    <option value="pesomin">Peso Min</option>
                    <option value="pesomax">Peso MaX</option>
                </select>

                <select className="selector" onChange={e=>handleFilterCreated(e)}>
                <option hidden>Datos Creados en...</option>
                    <option value="All">All</option>
                    <option value="created">Base de datos</option>
                    <option value="api">Api</option>
                </select>

                <select className="selector" onChange={handleFilterTemperamento}>
                 <option hidden>Temperaments</option>                 
                
                {allTemperamentos?.map(temp => (
                        <option value={temp.nombre}  key={temp.id}>{temp}</option>
                    ))}
                </select>
                </div>
                <div className="paginator">
                <Paginado 
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                </div>
              
                <div className="perritos">
                    {
                 currentDogs.map((c)=>{
                    return(
                    <li className="cartarende" >
                   <div className="">
                   <Link style={{ textDecoration: 'none', color: 'black' }} to={"/details/" + c.id}>
                    <Card  key={c.id} nombre={c.nombre} temperament={c.temperament||c.Temperamentos?.map(e=>e.nombre +", ")} peso={`${c.pesoMin} - ${c.pesoMax}`} imagen={c.imagen['url']||c.imagen} />
                    </Link>
                    
                    </div>  
                    </li>    
                    );
                })  
            }

            </div>
            </div>
        </div>
    )
   
}