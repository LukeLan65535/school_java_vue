<template>
  <div class="body">
    <!-- <button @click="getInfo">获取信息</button> -->
    <el-row>
    <el-col
      v-for="(o, index) in info"
      :key="index"
      :span="8"
      :offset="index > 0 ? 2 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img
          :src="o.src"
          class="image"
        />
        <div style="padding: 14px">
          <span>{{o.title}}</span>
          <div class="bottom">
            <time class="time">{{o.time}}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import {reactive} from 'vue'
export default {
  
  setup(){
    const info = reactive([])
    function getInfo(){
    // console.log(amountOne.value)
    axios({
      method:"get",
      url:"http://192.168.137.1:8088/api/school/page",
      params:{
        CurrentPage:1,
        PageSize:5
      }
    }).then((res)=>{
     const data = res.data.data.records
     data.forEach(array => {
       info.push(array)
     });
      console.log(data)
    })
  }
  return{
    getInfo,
    info
  }
  },
  mounted(){
    this.getInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.time {
  font-size: 12px;
  color: #999;
}
</style>
