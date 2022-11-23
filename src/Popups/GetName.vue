<template>
    <div class="Container" @mousedown="close">
        <div class="Box" @mousedown="$event.stopPropagation()">
            <input ref="createRenameInput" type="text" @keydown.enter="Save" v-model="name" placeholder="Dosyanın adını gir">
            <div class="button" @click="Save">Kaydet</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:""
        }
    },
    methods:{
        close(e){
            this.$store.state.popupStatus = false;
        },
        Save(){
            const dataInfo = this.$store.state.addingInfo;
            if(dataInfo.type == "add"){
                this.$store.dispatch('addData',{
                    name: this.name,
                    type:dataInfo.fileType,
                    note:"",
                    parent:dataInfo.parent
                })
            }
            else {
                this.$store.dispatch('renameData',{
                    name:this.name,
                    id:dataInfo.id.id
                })
            }
            this.$store.state.popupStatus=false;
        }
    },
    mounted(){
        this.$refs.createRenameInput.focus();
    },
    computed:{
        canMake(){

        }
    }
}
</script>

<style lang="scss" scoped src="./getName.scss">
</style>