<template>
  <div class="container">
    <ul>
      <h1 class="display-1">{{this.$route.params.band}}</h1>
      <li v-for="member in band">
        <router-link :to="{ name: 'User', params: {name: member.username} }">
          <div class="memebers d-flex flex-row align-items-center justify-content-between">

          <h3>{{member.username}}</h3>
          <img class="card img-fluid float-right" :src="member.image" >
        </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Band',
  data() {
    return {
      band : [],


    };
  },
  mounted() {
    this.getMembers()
  },
  methods: {
    getMembers() {
      fetch("http://localhost:3000/users/"+ this.$route.params.band + "/band")
      .then(response => response.json())
      .then(result => {
        this.band = result.users
      })
    }
  },
  props: ['user'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.memebers{
  margin-bottom: 2vh;
}
.img-fluid{
   max-width: 100%;
   max-height: 20vh;
}
</style>
