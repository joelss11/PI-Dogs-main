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

export function getNameDogs(payload){
    return async function(dispatch){
        try {
            var json=await axios.get("http://localhost:3001/dogs?nombre="+payload)
            return dispatch({
                type:"GET_NAME_DOGS",
                payload:json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: "GET_TEMPERAMENTOS",
            payload: json.data,
        });
      }  
  };

  export function postDogs(payload){
    return async function(dispatch){
        const response= await axios.post("http://localhost:3001/dogs",payload)
        console.log(response)
        return response;
    }
  }


export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

export function filterDogsByPeso(payload){
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