export function GetDataSearch(value){
    return {
        type : 'getDataSearch',
        value
    }
    
};

export function MEMORIZED(){
    return{
        type : 'MEMORIZED',
        
    };
}

export function ISSearch(){
    return{
        type : 'isSearch',
    }
}

export function ChangeIDViewMap(){
    return{
        type : 'change'
    }
}
export function ChangeIDViewMap2(){
    return{
        type : 'change2'
    }
}

export function chageHeightMap(){
    return{
        type : 'chageHeightMap'
    }
}

export function chageHeightMap1(){
    return{
        type : 'chageHeightMap1'
    }
}

export function PushLocationFromDistance(value,t){
    return{
        type : 'push',
        value,t
    }
}

export function DeleteLocationFromDistance(){
    return{
        type : 'delete'
    }
}

export function ChangeBK(value){
    return{
        type : 'chageBK',
        value
    }
}

export function DangNhap(usn,pw){
    return{
        type : 'login',
        usn,
        pw
    }
}

export function DangKi(usn,pw){
    return{
        type : 'dangki',
        usn,
        pw
    }
}

export function GetProduces(value){
    return{
        type : 'getProduce',
        value
    }
}