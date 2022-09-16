import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"

export default function LandingPage(){
    
return(

    <div className="paginaPrincipal">
        <h1 className="titulo">Welcome to The Dogs!</h1>
        <Link to='/home'>
            <button className="botonHome"><img className="imagenprincipal" src="https://cdn-icons-png.flaticon.com/128/1076/1076928.png" alt=""/></button>
      </Link>

    </div>
)
}