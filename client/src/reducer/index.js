
const initialState = {
    dogs: [],   
    allDogs:[],
    temperaments:[],
    details:[],
    dogsByTemperament:[],
    loading:true,
    error:false
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
                    if (b.nombre > a.nombre) {
                        return 1;
                      }
                    return 0;
                })
                return{
                    ...state,
                    dogs:sortedArr
                }

           case "GET_FILTER_TEMPERAMENTS":
            const tempfilter = state.allDogs.filter((e) => {
              if(typeof(e.temperament) === "string"){
                return e.temperament.includes(action.payload)
              }
              if(Array.isArray(e.Temperamentos)){
                let temp = e.Temperamentos.map(e => e.nombre)
                return temp.includes(action.payload)
              }
            }) 
            return {
              ...state,
              dogs: tempfilter
            }
            case 'FILTER_BY_PESO':
              const sortedWeight =
        action.payload === "pesomin"
          ? state.dogs.sort((a, b) => {
              if (parseInt(a.pesoMin) < parseInt(b.pesoMin)) {
                return -1;
              }
              if (parseInt(b.pesoMax) > parseInt(a.pesoMax)) {
                return 1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (parseInt(a.pesoMin) > parseInt(b.pesoMin)) {
                return -1;
              }
              if (parseInt(b.pesoMax) < parseInt(a.pesoMax)) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
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
                  case 'GET_DETAILS':
                    return{
                      ...state,
                      details:action.payload
                    }
                    case 'GET_CLEAN':
                      return{
                        ...state,
                        details:action.payload
                      }
                      case "SET_LOADING":
                        return {
                            ...state,
                            loading: true,
                        };
            
                    case "ERROR":
                        return {
                            ...state,
                            loading: false,
                            error: !state.error,
                        };
            default:
                return{...state};
    }

}





export default rootReducer;