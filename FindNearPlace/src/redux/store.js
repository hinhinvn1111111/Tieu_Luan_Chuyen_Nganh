import {createStore,combineReducers} from 'redux';
import responsive from '../components/responsive';

const defaultArrLocations = [];
const isSearch = false;
const idViewMap = 1;
const heightMap = "93%";


const arrLocationsReducer= (state=defaultArrLocations,action)=>{
    
    if(action.type==='getDataSearch'){
        arrLocations=[];
        fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/getPlaceFromProduce.php',{
            method:'POST',
            body:JSON.stringify({
                keySearch : action.value,
                
            })
        })
        .then((response)=>response.json())
        .then((responsiveJSON)=>{
            for(let i of responsiveJSON){
                arrLocations.push(i);
            }
        })
        .catch((e)=>{
            alert(e);
        })
        return arrLocations;
        
    }
    if(action.type==='MEMORIZED'){}
        
    return state;
}

const isSearchReducer = (state=isSearch,action)=>{
    if(action.type==='isSearch')  return state = !state;
    return state;
}

const idViewMapReducer = (state=idViewMap,action)=>{
    if(action.type==='change') return state=state+1;
    return state;
}

const chageHeightMap = (state=heightMap,action)=>{
    if(action.type==='chageHeightMap') return state="50%";
    if(action.type==='chageHeightMap1') return state="93%";
    return state;
}

const reducer = combineReducers({
    arrLocations : arrLocationsReducer,
    isSearch : isSearchReducer,
    changIDViewMap :idViewMapReducer,
    heightMap : chageHeightMap
})

export default store  = createStore(reducer);

