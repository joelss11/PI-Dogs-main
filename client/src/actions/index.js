import axios from 'axios';


export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload:json.data
        })
    }
}
export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

export function filterDogsByPeso(payload){
    console.log(payload)
    return{
       
        type:'FILTER_BY_PESO',
        payload
    }
}

export function filterCreated(payload){
    return{
        type:"FILTER_CREATED",
        payload
    }
}