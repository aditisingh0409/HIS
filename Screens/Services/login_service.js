import { myAxios } from "./helper";

export const login=(user)=>{
    return myAxios
    .post('/login',user)
    .then((resonse)=>resonse.json());
}   