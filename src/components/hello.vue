<template>
    <div>
        <button @click="getInfo">get</button><br>
        <button @click="postInfo">post</button><br>
        <span>i am : {{msg}}</span>
    </div>
</template>
<script setup>
    import {ref,onMounted} from 'vue'
    // import axios from 'axios'
    import {request} from '../api/index'
    onMounted(()=>{
        getInfo()
    })
    const msg = ref("")
    async function getInfo(){
        request("/api/hello/gettest","get").then((res)=>{
            // console.log(res)
            msg.value = res.data
        })}
    async function postInfo(){
        request("/api/hello","post").then((res)=>{
            // console.log(res)
            msg.value = res.data
        })}
    //     axios({
    //     url: "/hello",
    //     method: "get"
    // }).then((res)=>{
    //     msg.value = res.data
    //     console.log(res)
    // })

    // async function postInfo(){
    //     axios({
    //     url: "/hello",
    //     method: "post"
    // }).then((res)=>{
    //     msg.value = res.data
    //     console.log(res)
    // })
</script>
