<template>
  <div class="">
    <div class="d-flex flex-row justify-content-around">

      <div class=" flex-column align-items-center">
        <h1 class="display-1">Garage Devs</h1>
        <h3 class="lead">A place to come together and "suck".</h3>

      </div>
      <img src="../assets/Garage-devs-icon.png" class="img-fluid icon" alt="">
    </div>
    <div class="progress">
      <div class="progress-bar bg-danger"></div>
    </div>
    <div class="d-flex flex-row justify-content-around">

      <h1 class="display-3">Uploads</h1>
    </div>

    <div>
    <div class="d-flex justify-content-center">
    <ul>
      <div class="row">
      <li v-for="creation in creations1">
        <router-link :to="{ name: 'Creation', params: {num: creation.id} }">
        <div class="card border-primary mb-4" style="max-width: 20rem;">
          <div class="card-header"><h4>{{creation.name}}</h4></div>
          <div class="card-body">
            <img class="img-fluid " :src="creation.image">
            <p>{{creation.bio}}</p>
            <router-link :to="{ name: 'User', params: {name: creation.creator} }">
              <small>{{creation.creator}}</small>
            </router-link>
          </div>
        </div>
      </router-link>
      </li>
    </div>
    </ul>
  </div>
  <div class="progress">
    <div class="progress-bar bg-danger"></div>
  </div>
  <div class="d-flex justify-content-center">
    <h1>Newest thing</h1>
  </div>
  <div class="d-flex justify-content-center">
    <router-link :to="{ name: 'Creation', params: {num: creations1[0].id} }">
      <div class="jumbotron d-flex justify-content-center flex-column">
        <h1 class="display-3">{{creations1[0].name}}</h1>
        <div class="jumbotron bg-primary text-center" id="top">
          <img :src="this.creations1[0].image" class="img-fluid lead-img">
        </div>
        <p class="lead">{{creations1[0].bio}}</p>
        <hr class="my-4">
        <router-link :to="{ name: 'User', params: {name: creations1[0].creator} }">
          <p>{{creations1[0].creator}}</p>
        </router-link>
      </div>
    </router-link>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      creations1: [],
    };
  },
  mounted() {
    this.getCreations()
  },
  props: ['user'],
  methods: {
    getCreations() {
      fetch("http://localhost:3000/users/creations")
      .then(response => response.json())
      .then(result => {
        let creation = this.creations1

        for (var i = 0; i < result.creations.length; i++) {
          creation.unshift(result.creations[i])


        }

      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress {
  height: .25rem !important;
  margin: 1.25rem auto;
  border-radius: 300%;
  width: 100%;
  margin-left: 4.5;
  margin-right: 4.5;
}
.icon{
  max-height: 30vh;
}
.img-fluid{
   max-width: 100%;
   max-height: auto;
}
.lead{
  margin-top: 3rem;
}
.lead-img{
  min-width: 50vw;
}


</style>
