import React,{useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {getNameDogs} from '../actions'
import styles from "../styles/SearchBar.module.css"

export default function SearchBar(){

    const dispatch=useDispatch()
    const [name,setName]=useState("")

    function handleInputChange(e){
     e.preventDefault()
     setName(e.target.value)
     console.log(name)
     
    }
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(name))
        
    }

    return(
        <div className={styles.contenedorSearch}>
            <input className={styles.inputBuscar} type="text" placeholder="Buscar..." onChange={(e)=>handleInputChange(e)} />
            <button className={styles.botonBuscar} type="submit" onClick={(e)=>handleSubmit(e)}> <img className={styles.imagenBuscar} src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="" /> </button>
        </div>
    )
}

