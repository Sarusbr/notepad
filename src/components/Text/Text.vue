<template>
    <div class="Text" ref="note" @keyup="keyup"  @keydown="keydown" v-html="text" contenteditable="true" spellcheck="false">
    </div>
</template>

<script>
import fs from "fs";
export default {
    methods:{
        keydown(e){
            var evtobj = window.event ? event : e;
            if (evtobj.keyCode == 83 && evtobj.ctrlKey){
                this.$emit("changing",true)
                this.$store.dispatch("setData",[
                    this.$store.state.selected.id,
                    this.$refs.note.innerHTML
                ])
            }
        },
        keyup(){
            if(this.$refs.note.innerHTML != this.text) this.$emit("changing",false)
        }
    },
    computed:{
        text(){
            return this.$store.getters.note;
        }
    }
}  
</script>

<style lang="scss" scoped src="./text.scss">
</style>