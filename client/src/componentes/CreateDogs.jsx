import React,{useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../actions";
import '../styles/CreateDogs.css'


function validate(input){
    let errors={};
    if(!input.name){
        errors.name = "Se requiere un nombre";
    }
    else if(!input.peso){
        errors.peso="debe ser completado el peso";
    }
    return errors
}

 export default function CreateDogs(){
    const dispatch= useDispatch()
    const history=useHistory()
    const temperamentos=useSelector((state)=>state.temperaments)
    const [errors, setErrors]=useState({});

    const [input, setInput]=useState({
        nombre:"",
        altura:"",
        peso:"",
        añosDeVida:"",
        imagen:"",
        Temperamentos:[]
    })
     
    useEffect(()=>{
        dispatch(getTemperaments())
        return
    },[]);





    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input, [e.target.nombre]:e.target.value
        }));
        console.log(input)    
    }


    function handleSelect(e){
        setInput({
            ...input,
            Temperamentos:[...input.Temperamentos, e.target.value]
        })
    }

    function handleSubmit(e){
     e.preventDefault();
     console.log(input)
     dispatch(postDogs(input))
     alert("Dog Creado!")
     setInput({
        nombre:"",
        altura:"",
        peso:"",
        añosDeVida:"",
        imagen:"",
        Temperamentos:[]
     })
     history.push("/home")
    
    }


    return(

        <div>
            <Link to="/home"><button>Back</button></Link>
            <h1>Crear Dog</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.nombre} name="nombre" onChange={(e)=>handleChange(e)}/>
                 
                </div>
             <div>
                <label>Altura:</label>
                <input type="text" value={input.altura} name="altura" onChange={handleChange} />
             </div>

             <div>
                <label>Peso</label>
                <input type="text" value={input.peso} name="peso" onChange={handleChange}/>
             </div>

             <div>
                <label>Años de vida: </label>
                <input type="text" value={input.añosDeVida} name="añosDeVida" onChange={handleChange}/>
             </div>

             <div>
                <label>Imagen: </label>
                <input type="text" value={input.imagen} name="imagen" onChange={handleChange} />
             </div>

             <select onChange={(e)=>handleSelect(e)}>
                {temperamentos.map((temp)=>(
                    <option value={temp}>{temp}</option>
                    ))}
             </select>
               
               <ul><li>{input.Temperamentos.map(temp=> temp +" , ")} </li></ul>

              <button type="submit">Crear Dog</button>
            </form>
        </div>
    )



 }