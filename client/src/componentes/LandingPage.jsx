import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage(){
    
return(

    <div>
        <h1>Welcome To My Page</h1>
        <Link to='/home'>
            <button>Go Home!</button>
        </Link>

    </div>
)
}