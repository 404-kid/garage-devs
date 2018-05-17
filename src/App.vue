<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark nav">
    <a class="navbar-brand" href="#">Garage Devs</a>
      <ul class=" d-flex flex-row navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'Home', params: {} }">Home</router-link>
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Upload', params: {} }">Upload Creation</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="loggedIn" :to="{ name: 'User', params: {name: this.user} }">{{this.user}}</router-link>
          <router-link class="nav-link" v-else :to="{ name: 'Mkprofile', params: {} }">Make account</router-link>
        </li>
      </ul>
      <router-link class="nav-link" v-if="loggedIn" :to="{ name: 'User', params: {name: this.user} }">{{this.user}}</router-link>
      <form v-else class="form-inline my-2 my-lg-0" @submit.prevent="login">
        <input class="form-control mr-sm-2" type="text" id="exampleInputPassword1" v-model="username" placeholder="Username">
        <input class="form-control mr-sm-2" type="password"  id="exampleInputPassword1" v-model="password" placeholder="I.e. password">
        <input class="btn btn-secondary my-2 my-sm-0" type="submit" name="submit" value="Login">
      </form>
  </nav>









    <router-view :user="user" :changeUser="changeUser"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
  return {
    loggedIn: false,
    user: "",
    username: "",
    password: "",
  };
},
methods: {
  changeUser(chosenUser) {
    this.user = chosenUser
    this.loggedIn = true
  },
  login() {
    fetch("http://localhost:3000/users/"+ this.username)
    .then(response => response.json())
    .then(result => {
      this.changeUser(result.users.username)
    })
  },
}

};
</script>

<style>
ul{
 list-style-type: none;
 }
.nav{
  margin-right: 10vh;
  margin-left: .5vh;
  margin-top: .5vh;
  margin-bottom: .5vh
}
.nav-item{
  margin-right: 1rem;
}
li{
  margin: 1rem;
}


</style>
