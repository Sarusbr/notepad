import { createStore } from "vuex"
import fs from "fs";
// -1 parent id'si Ana dizinde olduğu anlamına gelmektedir

const store = createStore({
  state() {
    return {
      leftbar: true,
      Notes: [],
      selected: {},
      folderId:-1,
      popupStatus:false,
      addingInfo:{}
    }
  },
  getters: {
    note: state => state.Notes[state.selected?.id]?.note
  },
  mutations: {
    ToggleLeftBar(state) {
      state.leftbar = !state.leftbar;
    },
    setSelectedNote(state, data) {
      state.selected = data;
    },
    setSelectedFolder(state, data) {
      state.selected = data;
      state.folderId = data.id;
    },
    setData(state, data) {
      state.Notes = data;
    },
    goUp(state){
      if(state.folderId != -1){
        state.folderId = state.Notes[state.folderId].parent;
        state.selected = state.Notes[state.folderId];
      }
    },
    addFile(state,data){
      state.popupStatus = true;
      state.addingInfo = {
        type:"add",
        fileType:data,
        parent:state.folderId
      }
    },
    changeFileName(state,data){
      state.popupStatus = true;
      state.addingInfo = {
        type:"change",
        id:data
      }
    }
  },
  actions: {
    getData(context,selected) {
      fs.readFile("src/DataBase/Notes.json", "utf-8", (err, data) => {
        context.commit('setData', JSON.parse(data))
        if(selected && selected.type == "Note")context.commit("setSelectedNote",selected)
      })
    },
    setData(context, info) {
      console.log("first")
      fs.readFile("src/DataBase/Notes.json", "utf-8", (err, data) => {
        data = JSON.parse(data);
        data[info[0]].note = info[1];
        fs.writeFile("src/DataBase/Notes.json", JSON.stringify(data), (err) => {
          context.dispatch("getData")
        })
      })
    },
    addData(context,newFileInfo){
      fs.readFile("src/DataBase/Notes.json", "utf-8", (err, data) => {
        data = JSON.parse(data);
        newFileInfo.id = context.state.Notes.length;
        data.push(newFileInfo);
        fs.writeFile("src/DataBase/Notes.json", JSON.stringify(data), (err) => {
          context.dispatch("getData",newFileInfo)
        })
      })
    },
    renameData(context,Info){
      fs.readFile("src/DataBase/Notes.json", "utf-8", (err, data) => {
        data = JSON.parse(data);
        data = data.map(e=>{
          if(e.id == Info.id){
            e.name = Info.name;
            return {...e,name:Info.name}
          }
          else return e;
        })
        fs.writeFile("src/DataBase/Notes.json", JSON.stringify(data), (err) => {
          context.dispatch("getData")
        })
      })
    }
  }
})

export default store;