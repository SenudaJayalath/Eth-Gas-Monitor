import { FetchClient } from "../util/fetch-client.js";

export const GetGasPrice = async(module,action, apikey)=>{
    return FetchClient(`/?${`module=${module}&`}${`action=${action}&`}${`apikey=${apikey}&`}`).GET({})
}
