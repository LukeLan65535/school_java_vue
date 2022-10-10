import axios from "axios"

const base = "http://localhost:8088"
// const base = ""
export async function dataRequest(url,method,data){
    return axios({
        url:base+url,
        method:method,
        data:data
    })
}
export async function paramRequest(url,method,param){
    return axios({
        url:base+url,
        method:method,
        params:param
    })
}
export async function request(url,method){
    return axios({
        url:base+url,
        method:method
    })
}