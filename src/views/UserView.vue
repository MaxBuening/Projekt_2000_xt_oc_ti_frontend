<template>
<div>
  <div v-if="auth"><h3><user></user></h3></div>
  <div v-if="!auth"><h3>Not logged in</h3></div>
</div>
</template>

<script>
import axios from "axios";
import {onMounted, ref} from "vue";
import User from "@/components/User";



export default {
  name: "UserView",
  components: {User },

  setup() {
    const auth = ref(false);

    onMounted(async () => {
      try{
        const resp = await axios.get('http://localhost:8080/api/user');
        if(resp.message !== "Request failed with status code 401"){
          auth.value = true;
        }
      } catch (e) {
        auth.value =false;
      }
    });
    return{
      auth
    }

}}
</script>

<style>

</style>
