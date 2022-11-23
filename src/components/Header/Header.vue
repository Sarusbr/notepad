<template>
    <div class="Header">
        <div class="SvgContainer" @click="this.$store.commit('ToggleLeftBar')">
            <MenuSvg></MenuSvg>
        </div>
        <div class="SvgContainer" @click="goUp" :style="(folderId==-1?'width:0px':'')">
            <GoBackSvg />
        </div>
        <h1>{{Title}}<div :style="'opacity:'+(changing?'0%':'100%')" class="ChangingBox"></div></h1>
    </div>
</template>

<script>
import MenuSvg from "../../assets/MenuSvg.vue";
import GoBackSvg from "../../assets/GoBackSvg.vue";
export default {
    props:['changing'],
    components:{
        MenuSvg,
        GoBackSvg
    },
    methods:{
        goUp(){
            this.$store.commit("goUp");
        }
    },
    computed:{
        folderId(){
            return this.$store.state.folderId;
        },
        Title(){
            let sl = this.$store.state.selected;
            let nt = this.$store.state.Notes;
            if(!sl) return ""
            if(sl.parent != -1){
                if(nt[sl.parent]){
                    if(sl.type == "Folder") return sl.name
                    return nt[sl.parent]?.name+" | "+sl.name;
                }
                return ""
            }
            return sl.name
        }
    }
}
</script>

<style lang="scss" scoped src="./header.scss">
</style>
