import React,{useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../actions";
import styles from'../styles/CreateDogs.module.css'


export function validate (input) {
    let errors = {};
    if (!input.nombre) errors.nombre = "Nombre is required";
    else if (input.nombre.search(/^[a-zA-Z\s]*$/)) {
      errors.nombre = "El nombre no puede tener numeros ni simbolos";
    }
 //Altura hay un tema con las \, pero si no la pongo deja poner puntos
    if (!input.alturaMin) {
       errors.alturaMin = "Campo requerido"
    }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.alturaMin)) {
       errors.alturaMin = "Solo numeros enteros"
    }else if (input.alturaMin < 1) {
       errors.alturaMin = "No es un insecto ;)"
    }else if (input.alturaMin > 99) {
       errors.alturaMin = "No es jirafa ;)"
    }
 
    if (!input.alturaMax) {
       errors.alturaMax = "Campo requerido"
    }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.alturaMax)) {
       errors.alturaMax = "Ingrese solo números enteros"   ///lee el primer numero no el numero entero
    }else if (parseInt(input.alturaMax) <= parseInt(input.alturaMin)) {
       errors.alturaMax = "Debe ser mayor a la altura miníma"
    }else if (input.alturaMax > 149) {
       errors.alturaMax = "No es jirafa ;)"
    }
 
 //Peso
    if (!input.pesoMin) {
       errors.pesoMin= "Campo requerido"
    }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.pesoMin)) {
       errors.pesoMin = "Ingrese solo números enteros"
    }else if (input.pesoMin < 1) {
    errors.pesoMin = "No es pluma ;)"
    }else if (input.pesoMin > 100) {
    errors.pesoMin = "Ni que fuese elefante ;)"
    }
 
    if (!input.pesoMax) {
       errors.pesoMax = "Campo requerido"
    }else if (!/^[0-9]\d*(\.\d+)?$/.test(input.pesoMax)) {
       errors.pesoMax = "Ingrese solo números enteros"
    }else if (parseInt(input.pesoMax)  <=  parseInt(input.pesoMin)) {
    errors.pesoMax = "Debe ser mayor al peso minímo"
    }else if (input.pesoMax > 130) {
    errors.pesoMax= "Ni que fuese elefante ;)"
    } 
 
 //Vida acá solo un numero, después veo si hago otra validación...
 
   
    if (!input.Temperamentos.length) errors.temperament = "Debe seleccionar al menos un temperamento"

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
            Temperamentos:Array.from(new Set([...input.Temperamentos, e.target.value])),
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
     if (Object.values(errors).length > 0) {
      alert("Por favor complete la información requerida"); }
      else if (
       input.nombre === '' || 
       input.alturaMin === '' || 
       input.alturaMax === '' ||
       input.pesoMin === '' ||
       input.pesoMax === '' ||
       input.imagen===''||
       input.añosDeVida === '' ||
       !input.Temperamentos.length) {
       alert("Por favor complete el formulario");}
       else{

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
    }


    return(

        <div>
            <div className={styles.contHome}>
            <Link to="/home"><button className={styles.botonHome}  ><img className={styles.imagenHome} src="https://cdn-icons-png.flaticon.com/512/553/553416.png" alt="" /></button></Link>
            </div>
        <div className={styles.contenedortotal}>
            <h1 className={styles.titulo}>Crear Dog</h1>

            <form className={styles.contenidofor} onSubmit={(e)=>handleSubmit(e)}>
                <div className={styles.contenedorNombre}>
                    <label className={styles.LabelNombre}>𝓝𝓸𝓶𝓫𝓻𝓮</label>
                    <input className={styles.contenedorInputNombre} type="text" value={input.nombre} name="nombre" onChange={(e)=>handleChange(e)} placeholder="Nombre"/>
                    {errors.nombre &&(
                        <p className={styles.errors}>{errors.nombre}</p>
                    )}
                </div>
              <div className={styles.contenedorAlturas}>
             <div className={styles.contenedorAlturaMinima}>
                <label className={styles.labelAlturaMin}>𝓐𝓵𝓽𝓾𝓻𝓪 𝓜𝓲𝓷 </label>
                <input className={styles.contenedorInputAltMin} type="text" value={input.alturaMin} name="alturaMin" onChange={(e)=>handleChange(e)} placeholder="Altura Minima"/>
                {errors.alturaMin &&(
                        <p className="error">{errors.alturaMin}</p>
                    )}
             </div>

             <div>
                <label className={styles.labelAlturaMax}>𝓐𝓵𝓽𝓾𝓻𝓪 𝓜𝓪𝔁</label>
                <input className={styles.inputAltMax} type="text" value={input.alturaMax} name="alturaMax" onChange={handleChange} placeholder="Altura Maxima"/>
                {errors.alturaMax &&(
                        <p className="error">{errors.alturaMax}</p>
                    )}
             </div>
             </div>
             <div className={styles.contenedorAlturas}>
                
                <div className={styles.contenedorPesos}>
             <div className={styles.contenedorPesoMin}>
                <label className={styles.labelPesoMin}>𝓟𝓮𝓼𝓸 𝓜𝓲𝓷𝓲𝓶𝓸</label>
                <input className={styles.inputPesoMin} type="text" value={input.pesoMin} name="pesoMin" onChange={handleChange} placeholder="Peso Minimo"/>
                {errors.pesoMin &&(
                        <p className="error">{errors.pesoMin}</p>
                    )}
             </div>
             <div>
                <label className={styles.labelPesoMax}>𝓟𝓮𝓼𝓸 𝓜𝓪𝔁𝓲𝓶𝓸</label>
                <input className={styles.inputPesoMax} type="text" value={input.pesoMax} name="pesoMax" onChange={handleChange} placeholder="Peso Maximo"/>
                {errors.pesoMax &&(
                        <p className="error">{errors.pesoMax}</p>
                    )}
             </div>
             </div>
             </div>

             <div>
                <label className={styles.labelAñosDeVida}>𝓐𝓷̃𝓸𝓼 𝓓𝓮 𝓥𝓲𝓭𝓪 </label>
                <input className={styles.inputAñosDeVida} type="text" value={input.añosDeVida} name="añosDeVida" onChange={handleChange}placeholder="Años de vida"/>
                {errors.añosDeVida &&(
                        <p className="error">{errors.añosDeVida}</p>
                    )}
             </div>

             <div>
                <label className={styles.labelImagen}>𝓘𝓶𝓪𝓰𝓮𝓷</label>
                <input className={styles.inputImagen} type="text" value={input.imagen} name="imagen" onChange={handleChange} placeholder="http://www.imagenDogs.png"/>
                {errors.imagen &&(
                        <p className="error">{errors.imagen}</p>
                    )}
             </div>

             <select className={styles.selectTemp} onChange={(e)=>handleSelect(e)}>
                <option hidden>Temperamentos</option>
                {temperamentos.map((temp)=>(
                    <option value={temp}>{temp}</option>
                    ))}
             </select>
             <div className={styles.delete}>

          {input.Temperamentos.map((e) => (
                <div key={e} className={styles.delete}>
                  <div key={e}>{e}</div>

                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDelete(e)}
                  >
                    <img className={styles.imagenEliminar} src="https://cdn-icons-png.flaticon.com/512/6932/6932392.png" alt="" />
                  </button>
                </div>
              ))}


                </div>

              <button className={styles.botonCrearDog} type="submit"><img className={styles.imagenGuardar} src="https://cdn-icons-png.flaticon.com/512/4013/4013882.png" alt="" /></button>
            </form>

         
        </div>
        </div>
    )



 }