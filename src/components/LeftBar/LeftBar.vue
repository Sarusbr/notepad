<template>
    <div class="LeftBar" :style="this.$store.state.leftbar&&'opacity:0%;width:0px;'">
        <div class="item" v-for="item in Notes" @click="SelectedChange(item)" @click.right="rename(item)" :key="item">
            <div class="icon">
                <FolderSvg v-if="item.type === 'Folder'"></FolderSvg>
                <NoteSvg v-else></NoteSvg>
            </div>
            <div class="name">
                {{item.name}}
            </div>
        </div>
        <div class="FileAdd">
            <div @click="CraeteFile('Folder')">
                <CreateFolder/>
            </div>
            <div @click="CraeteFile('Note')">
                <CreateNotePad/>
            </div>
        </div>
    </div>
</template>

<script>
import FolderSvg from "../../assets/FolderSvg.vue"
import NoteSvg from "../../assets/NoteSvg.vue"
import CreateFolder from "../../assets/CreateFolder.vue"
import CreateNotePad from "../../assets/CreateNotePad.vue"

export default {
    data(){
        return{
            
        }
    },
    components:{
        FolderSvg,
        NoteSvg,
        CreateFolder,
        CreateNotePad
    },
    methods:{
        test(){
            console.log(this.$store.state.Notes);
        },
        SelectedChange(e){
            if(e.type == "Folder"){ // klasöre tıklandığı zaman çalışan yer
                this.$store.commit("setSelectedFolder",e)
            }
            else{ // nota tıklandığı zamana çalışan yer
                this.$store.commit("setSelectedNote",e)
            }
        },
        CraeteFile(e){
            this.$store.commit("addFile",e);
        },
        rename(e){
            this.$store.commit("changeFileName",e);
        }
    },
    computed:{
        Notes(){
            return this.$store.state.Notes.filter(e=>e.parent == this.$store.state.folderId);
        }
    }
}
</script>

<style lang="scss" scoped src="./leftBar.scss">
</style>