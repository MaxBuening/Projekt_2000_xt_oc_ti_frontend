<template>

  <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#delete" style="font-size: x-large">
    Kontogang Löschen
  </button>


  <div class="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="kgangdelete" aria-hidden="true">
    <div class="modal-dialog" role="dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Transaktion Löschen</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="alert alert-danger" role="alert" v-if="showAlert">
          Id ist nicht bekannt guck nochmal genau
        </div>
        <div class="modal-body">
          <div class="form-floating">
            <input v-model="id" class="form-control"  placeholder="TransaktionsId">
            <label>TransaktionsId</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="deleteTransaktion" data-dismiss="modal">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {store} from "@/assets/store";

export default {
  name: "kontogangLoeschen",

  data(){
    return {
      id : 0,
      gibts : false,
      showAlert : false
    }
  },

  methods: {
    deleteTransaktion(){
      this.gibts = false
      this.showAlert = false

      for (let i = 0; i < store.kontostandId.kontostandIDs.length; i++){
        if(store.kontostandId.kontostandIDs[i]== this.id){
          this.gibts = true
        }
      }
      if (this.gibts){
        axios.delete(`http://localhost:8080/api/user/zugang/${this.id}`).then(async function (){
          const {data} = await axios.get('http://localhost:8080/api/user');
          store.kontostandId = data
          store.newAmount = 0
          for (let i = 0; i < data.kontostandIDs.length; i++) {
            await axios.get(`http://localhost:8080/api/user/zugang/${data.kontostandIDs[i]}`).then(function(response){
              store.newAmount += response.data.amount;
            })
          }
          store.table_reload++;
        })
      } else {
        this.gibts = false
        this.showAlert = true
      }
    }
  }


}
</script>

<style scoped>
p{
  background-color: dimgrey;
}

</style>
