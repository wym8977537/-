<template>
   <div>
        <app-header></app-header>
        <app-main></app-main>
        <app-list></app-list>
   </div>

</template>

<script>
import appHeader from './AppHeader.vue/header';
import appMain from './APPMain.vue/main';
import appList from './AppList.vue/list';
export default {
 components: {
     appHeader,
     appMain,
     appList
 }
}
</script>

<style scoped>
    .header{
        line-height: 50px;
        position: absolute;
        background-color:rgb(62, 5, 62);
        top:0;
        left:0;
        right: 0;
    }
    .list{
        position: absolute;
        top:49px;
        width: 230px;
        left: 0px;
        bottom: 0px;
        overflow-y: auto;
        background-color:rgb(37, 3, 34);
    }
    .main{
        position: absolute;
        top: 49px;
        left: 230px;
        right: 0px;
        bottom: 0px;
        padding: 10px;
        overflow-y: auto;
        
    }
</style>