
const initialState = {
    dogs: [],   
    allDogs:[],
    temperaments:[]
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state, dogs:action.payload,
                allDogs:action.payload
            }
         case 'GET_NAME_DOGS':
          return{
            ...state,
            dogs:action.payload
          }


        case 'GET_TEMPERAMENTOS':
          return {
            ...state,
            temperaments: action.payload,
          };

            case 'ORDER_BY_NAME':
                let sortedArr=action.payload==='asc'?
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
                    if (b.name > a.name) {
                        return 1;
                      }
                    return 0;
                })
                return{
                    ...state,
                    dogs:sortedArr
                }
                

            case 'FILTER_BY_PESO':
              const sortedArray =
              action.payload === "pesomin"
                ? state.dogs.sort(function (a, b) {
                    if (parseInt(a.peso) > parseInt(b.peso)) {
                      return 1;
                    }
                    if (parseInt(a.peso) < parseInt(b.peso)) {
                      return -1;
                    }
                    return 0;
                  })
                : state.dogs.sort(function (a, b) {
                    if (parseInt(a.peso) > parseInt(b.peso)) {
                      return -1;
                    }
                    if (parseInt(a.peso) < parseInt(b.peso)) {
                      return 1;
                    }
                    return 0;
                  });
      
            return {
              ...state,
              dogs: sortedArray,
              allDogs2: sortedArray,
            };
            
             case 'POST_DOGS':
              return{
                ...state,
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