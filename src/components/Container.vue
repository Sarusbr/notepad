<template>
<div class="Container">
    <Header :changing="changing"></Header >
    <div class="Content">
        <LeftBar></LeftBar>
        <Text @changing="changing=$event"></Text>
    </div>
</div>
</template>

<script>
import Header from "./Header/Header.vue"
import LeftBar from "./LeftBar/LeftBar.vue"
import Text from "./Text/Text.vue"
export default {
    data(){
        return{
            changing:true
        }
    },
    components:{
        Text,
        Header,
        LeftBar
    },
    computed:{
        gridSize(){
            return this.$store.state.leftbar&&'grid-template-columns: 0px auto;';
        }
    }
}
</script>

<style lang="scss" scoped src="./container.scss">
</style>