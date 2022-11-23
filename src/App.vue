<template>
  <Container></Container>
  <GetName v-if="$store.state.popupStatus" />
</template>

<script>
import Container from "./components/Container.vue"
import GetName from "./Popups/GetName.vue"
export default {
  name: 'App',
  components:{
    Container,
    GetName
  },
  created(){
    this.$store.dispatch("getData")
  }
}
</script>

