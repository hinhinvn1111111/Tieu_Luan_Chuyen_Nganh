import {createStore,combineReducers} from 'redux';
import responsive from '../components/responsive';

const defaultArrLocations = [];
const isSearch = false;
const idViewMap = 0;
const heightMap = "93%";
const arrKhoangCach = [];
const bk = 0.0;


const arrLocationsReducer= (state=defaultArrLocations,action)=>{
    
    if(action.type==='getDataSearch'){
        arrLocations=[];
        try{
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
        }catch{

        }
        return arrLocations;
        
    }
    if(action.type==='MEMORIZED'){}
        
    return state;
}

const arrLoginReducer = (state=defaultArrLocations,action)=>{
    arrLogin=[];
    arrLogin1=[];
    if(action.type==='login'){
        
        try{
            fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/Login.php',{
            method:'POST',
            body:JSON.stringify({
                usn : action.usn,
                pw : action.pw
            })
            })
            .then((response)=>response.json())
            .then((responsiveJSON)=>{
                for(let i of responsiveJSON){
                    arrLogin.push(i);
                    //alert(i);
                }
            })
            .catch((e)=>{
                alert(e);
            })
            return arrLogin;
        }catch{

        }
        
    }
    if(action.type==='dangki'){
        
        try{
            fetch('http://192.168.40.2:8888/Tieu_Luan_Chuyen_Nganh/Server/Register.php',{
            method:'POST',
            body:JSON.stringify({
                usn : action.usn,
                pw : action.pw
            })
            })
            .then((response)=>response.json())
            .then((responsiveJSON)=>{
                for(let i of responsiveJSON){
                    arrLogin1.push(i);
                    //alert(i);
                }
            })
            .catch((e)=>{
                alert(e);
            })
            return arrLogin1;
        }catch{

        }
        
    }
    
   
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
    if(action.type==='chageHeightMap') return state="93%";
    if(action.type==='chageHeightMap1') return state="93%";
    return state;
}

const GetArrKhoangCach = (state=arrKhoangCach,action)=>{
    if(action.type==='push') {
        state.push({place:action.value,kc:action.t});
    }
    if(action.type==='delete') {
        return state = [];
    }  
    return state;
}

const chageBK = (state=bk,action)=>{
    if(action.type==='chageBK') return state=action.value;
    return state;
}

const reducer = combineReducers({
    arrLocations : arrLocationsReducer,
    isSearch : isSearchReducer,
    changIDViewMap :idViewMapReducer,
    heightMap : chageHeightMap,
    ListKC : GetArrKhoangCach,
    bk : chageBK,
    arrLogin : arrLoginReducer,
})

export default store  = createStore(reducer);

