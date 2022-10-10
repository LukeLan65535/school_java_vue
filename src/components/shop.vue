<script setup>
import { ref, onMounted } from 'vue'
import { request, paramRequest, dataRequest } from '../api/index'
import { ElMessageBox } from 'element-plus'

let products = ref([])
const product = ref({ id: '', name: '', status: '', descd: '', })
onMounted(() => {
    getAllInfo()
})
function del(index) {
    // this.products.splice(index, 1)
    console.log(products.value[index])
    paramRequest("/api/shop", "delete", { 'id': products.value[index].id }).then(() => {
        getAllInfo()
    })

    console.log(products.value)
    // console.log(products)
}
function add() {
    if (product.value.name.trim() == "") {
        alert("产品名称不可位空，请输入")
    } else if (product.value.status.trim() == "") {
        alert("产品型号不可为空，请输入")
    } else {
        // console.log(product)
        dataRequest("/api/shop", "post", product.value).then((res) => {
            console.log(res.data.data)
            clearProduct()
            getAllInfo()
        })

    }
}
async function getAllInfo() {
    request("/api/shop", "get").then((res) => {
        // console.log(res.data)
        products.value = res.data.data

    })
}
const clearProduct = () => {
    product.value = {}
}

const dialogVisible = ref(false)

function openFirm(index) {
    dialogVisible.value = true

    product.value.id = products.value[index].id
    product.value.name = products.value[index].name
    product.value.status = products.value[index].status
    product.value.descd = products.value[index].descd
    console.log(product)
}

function update() {
    dataRequest("/api/shop", "put", product.value).then((res) => {
        // console.log(res.data.data)
        dialogVisible.value = false
        clearProduct()
        getAllInfo()
    })
}

const handleClose = (() => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {

            clearProduct()
            getAllInfo()
            done()

        })
        .catch(() => {
            // catch error
        })
})


</script>
        
<template>
    <div id="app">
        <h1>产品信息列表</h1>
        <div class="counter">共有<strong>{{ counter }}</strong>件产品</div>
        <div>

            <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign"
                    style="max-width: 460px">
                    <el-form-item label="名称">
                        <el-input v-model="product.name" />
                    </el-form-item>
                    <el-form-item label="型号">
                        <el-input v-model="product.status" />
                    </el-form-item>
                    <el-form-item label="规格">
                        <el-input v-model="product.descd" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="update">Confirm</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>名称</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>操作</th>
                </tr>
            </thead>
            <template v-for="(product, index) in products" :key="product.id">
                <tr>
                    <td>
                        {{ index + 1 }}
                    </td>
                    <td>
                        {{ product.name }}
                    </td>
                    <td>
                        {{ product.status }}
                    </td>
                    <td>
                        <span v-if="product.descd == ''">
                            未填写规格
                        </span>
                        <span v-else>
                            {{ product.descd }}
                        </span>
                    </td>
                    <td>
                        <button class="del" @click='del(index)'>删除</button>
                        <el-button text @click="openFirm(index)">更新</el-button>
                    </td>
                </tr>
            </template>
        </table>
        <div class="add">
            <h1>新增产品信息</h1>
            <div style="margin-left:10px">
                名称：<input name="name" type="text" v-model="product.name" placeholder="请输入产品名称" /><br>
                型号：<input name="type" type="text" v-model="product.status" placeholder="请输入产品型号" /><br>
                规格：<input name="desc" type="text" v-model="product.descd" placeholder="请输入产品规格" /><br />
            </div>
            <br>
            <button class="addBtn" type="submit" @click="add">提交</button>
        </div>
    </div>
</template>
        
<style scoped>
h1 {
    text-align: center;
    color: darkorange;
    margin-top: 30px;
}

.counter {
    text-align: center;
    margin-bottom: 5px;
}


table {
    width: 800px;
    margin: 0 auto;
    text-align: center;
}

td,
th {
    border: 1px solid #bcbcbc;
    padding: 5px 10px;
}

th {
    background: #42b983;
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
}

tr:nth-of-type(odd) {
    background: #fff;
}

tr:nth-of-type(even) {
    background: #eee;
}

.del {
    color: red;
}

input {
    border: 1px solid darkcyan;
    line-height: 25px;
    width: 200px;
    color: #000;
    font-weight: bold;
    margin-top: 5px;
    margin-left: 10px;
}

.add {
    width: 800px;
    margin: 0 auto;
    text-align: center;
}

.addBtn {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 8px 32px;
    font-size: 16px;
    margin-right: 10px;
}
</style>
        