<template>
  <form @submit.prevent="getImageURL">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control"  v-model="person.username" placeholder="Username">
      </div>
      <div class="form-group">
        <label>Regular Name</label>
        <input type="text" class="form-control" v-model="person.regularname" placeholder="Optinal">
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" v-model="person.email" aria-describedby="emailHelp" placeholder="somethingsomething@somethingoranother.com">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="person.password" placeholder="I.e. password">
      </div>
      <div class="form-group">
        <label>Bio</label>
        <textarea class="form-control" rows="2" placeholder="Tell me about you" v-model="person.bio"></textarea>
      </div>
      <div class="d-flex flex-row align-items-center justify-content-between">
        <div class="form-group">
          <label for="exampleInputFile">Photo</label>
          <input type="file" class="form-control-file" @change="onFileChanged">
        </div>
      </div>
      <div class="justify-content-center d-flex">

        <input type="submit" name="submit" value="Create" class="btn btn-primary">
      </div>
    </form>
</template>

<script>
export default {
  name: 'Mkprofile',
  data() {
    return {
      person:{
      },
      selectedImage: null,
      unsignedUploadPreset: 'efj6uaru',
      failure: false,
    };
  },
  props: ['changeUser'],
  methods: {
    submit (newUser){
      let getBody = {
        username:newUser.username,
        regularname:newUser.regularname,
        email:newUser.email,
        password:newUser.password,
        bio:newUser.bio,
        image:newUser.image,

      }
      self = this
      fetch("http://localhost:3000/users/", {
        method: "POST",
        body: JSON.stringify(getBody),
        headers: {
                "Content-Type": "application/json"
            },
      })
      .then(response => {return response.json()})

      .then(function(data){
        self.changeUser(data.users.username)
        self.sendHome()
      })
        .catch(console.error)
    },
    onFileChanged (event) {
      this.selectedImage = event.target.files[0]
    },
    activateLogin () {
      const newUser = {}
      newUser.username = this.person.username
      newUser.regularname = this.person.regularname
      newUser.email = this.person.email
      newUser.password =this.person.password
      newUser.bio = this.person.bio
      newUser.image = this.person.image

      this.submit(newUser)

    },
    getImageURL () {
      let url = `https://api.cloudinary.com/v1_1/dypztrtsq/upload`
      let self = this
      let fD = new FormData()
      fD.append('file', self.selectedImage)
      fD.append('upload_preset', "efj6uaru")

      fetch(url, {
        method: "POST",
        headers: new Headers({

        }),
            body: fD

        }).then(response => {
          return response.json()
        })
        .then(function(data){
          self.person.image = data.secure_url
          self.activateLogin()
        })
        .catch(console.error)

    },
    sendHome () {
      this.$router.push({ name: 'Home', params: {} })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
