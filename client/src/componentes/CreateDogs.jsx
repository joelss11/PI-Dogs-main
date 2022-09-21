import React,{useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../actions";
import styles from'../styles/CreateDogs.module.css'


function validate(input){
    let errors={};
    if(!input.nombre){
        errors.nombre = "Se requiere un nombre";
    }
    else if(!input.altura){
        errors.altura="Se requiere una altura";
    }
    else if(!input.peso){
        errors.peso="Se requiere un peso";
    }
    else if(!input.añosDeVida){
        errors.añosDeVida="Se requiere Años de vida";
    }
    else if(!input.imagen){
        errors.imagen="Se requiere una imagen";
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
        alturaMin:"",
        alturaMax:"",
        pesoMin:"",
        pesoMax:"",
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
            ...input, [e.target.name]:e.target.value
        }));
        console.log(input)    
    }


    function handleSelect(e){
        setInput({
            ...input,
            Temperamentos:[...input.Temperamentos, e.target.value]
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            Temperamentos:input.Temperamentos.filter(temp=>temp!==e)
        })
    }

    function handleSubmit(e){
     e.preventDefault();
     console.log(input)
     dispatch(postDogs(input))
     alert("Dog Creado!")
     setInput({
        nombre:"",
        alturaMin:"",
        alturaMax:"",
        pesoMin:"",
        pesoMax:"",
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
                    <input type="text" value={input.nombre} name="nombre" onChange={(e)=>handleChange(e)} placeholder="Nombre"/>
                    {errors.nombre &&(
                        <p className="error">{errors.nombre}</p>
                    )}
                </div>
             <div>
                <label>Altura Minima:</label>
                <input type="text" value={input.alturaMin} name="alturaMin" onChange={handleChange} placeholder="Altura Minima"/>
                {errors.alturaMin &&(
                        <p className="error">{errors.alturaMin}</p>
                    )}
             </div>
             <div>
                <label>Altura Maxima:</label>
                <input type="text" value={input.alturaMax} name="alturaMax" onChange={handleChange} placeholder="Altura Maxima"/>
                {errors.alturaMax &&(
                        <p className="error">{errors.alturaMax}</p>
                    )}
             </div>

             <div>
                <label>Peso Minimo</label>
                <input type="text" value={input.pesoMin} name="pesoMin" onChange={handleChange} placeholder="Peso Minimo"/>
                {errors.pesoMin &&(
                        <p className="error">{errors.pesoMin}</p>
                    )}
             </div>
             <div>
                <label>Peso Maximo</label>
                <input type="text" value={input.pesoMax} name="pesoMax" onChange={handleChange} placeholder="Peso Maximo"/>
                {errors.pesoMax &&(
                        <p className="error">{errors.pesoMax}</p>
                    )}
             </div>

             <div>
                <label>Años de vida: </label>
                <input type="text" value={input.añosDeVida} name="añosDeVida" onChange={handleChange}placeholder="Años de vida"/>
                {errors.añosDeVida &&(
                        <p className="error">{errors.añosDeVida}</p>
                    )}
             </div>

             <div>
                <label>Imagen: </label>
                <input type="text" value={input.imagen} name="imagen" onChange={handleChange} placeholder="http://www.imagenDogs.png"/>
                {errors.imagen &&(
                        <p className="error">{errors.imagen}</p>
                    )}
             </div>

             <select onChange={(e)=>handleSelect(e)}>
                {temperamentos.map((temp)=>(
                    <option value={temp}>{temp}</option>
                    ))}
             </select>
               
               <ul><li>{input.Temperamentos.map(temp=> temp +" , ")} </li></ul>

              <button type="submit">Crear Dog</button>
            </form>

          <div className={styles.delete}>
            {input.Temperamentos.map(tem=>
            <div className={styles.divTemp}>
                <p>{tem}</p>
                <button className="botonX" onClick={()=>handleDelete(tem)}>X</button>
                  </div>
                )}
                </div>
        </div>
    )



 }