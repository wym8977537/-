<template>
<div class="main">
    <app-link v-show = "$route.path !== '/home'"></app-link>
    <router-view></router-view>
</div>
</template>
<script>
import appLink from './link'

export default {
 data () {
 return {
 }
 },

 components: {appLink},

 methods: {}
}
</script>

<style scoped>

</style>