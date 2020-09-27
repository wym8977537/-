<template>
 <div>
 <el-breadcrumb separator="/" >
    <el-breadcrumb-item :to="{path:$route.path}" class="line">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
 </div>
</template>

<script>
export default {
 data () {
 return {
 }
 },

 components: {},

 methods: {}
}
</script>

<style scoped>
.el-breadcrumb{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height:10px;
    padding: 20px;
    border-radius: 4px;
}
.line{
    border-left: 3px solid black;
    padding: 5px;
}
</style>