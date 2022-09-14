
const initialState = {
    dogs: [],   
    allDogs:[]
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state, dogs:action.payload,
                allDogs:action.payload
            }
            case 'ORDER_BY_NAME':
                let sortedArr=action.payload==='acs'?
                state.dogs.sort(function(a,b){
                    if(a.nombre>b.nombre){
                        return 1;
                    }
                    if(b.nombre>a.nombre){
                        return -1;
                    }
                    return 0;
                }):
                state.dogs.sort(function(a,b){
                    if(a.nombre>b.nombre){
                        return-1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    dogs:sortedArr
                }

            case 'FILTER_BY_PESO':
                const allDogs=state.allDogs
                const pesoFilter=action.payload === 'peso'? allDogs.filter(dog=>dog.peso):allDogs.filter(dog=>!dog.peso)
                return{
                  ...state,
                  dogs:pesoFilter
                }
                case 'FILTER_CREATED':
                 const allDogs2= state.allDogs
               const createdFilter=action.payload ==='created'? allDogs2.filter(dog=>dog.createdInDb):allDogs2.filter(dog=>!dog.createdInDb)
                  return{
                    ...state, 
                    dogs:action.payload==="All"? state.allDogs:createdFilter
                  }

            default:
                return{...state};
    }

}





export default rootReducer;