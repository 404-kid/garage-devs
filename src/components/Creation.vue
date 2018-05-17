<template>
  <div class="container">
    <div class="d-flex align-items-center justify-content-around">
      <h1 class="display-1">{{this.creation.name}}</h1>
      <router-link :to="{ name: 'User', params: {name: this.creation.creator} }">
        <h3>{{this.creation.creator}}</h3>
      </router-link>

    </div>
    <div class="jumbotron bg-primary text-center" id="top">
      <img :src="this.creation.image" class="img-fluid">
    </div>
    <h1>{{this.creation.bio}}</h1>
    <button class="btn-primary" @click="download()"><h1>Download</h1></button>
  </div>
</template>

<script>
export default {
  name: 'Creation',
  data() {
    return {
      creation : [],


    };
  },
  mounted() {
    this.getCreation()
  },
  methods: {
    getCreation() {
      fetch("http://localhost:3000/users/creations/"+ this.$route.params.num)
      .then(response => response.json())
      .then(result => {
        this.creation = result.creations
      })
    },
    download(){
      fetch(this.creation.file)
      .then(response => {
      return response.blob()
      }).then(function(blob) {
      download(blob);
      })
    },
  },
  props: ['user'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  margin: 1rem;
}

.img-fluid {
    min-width: 50vw;
    height: auto;
}
button{
  margin: 3rem;
}
</style>
