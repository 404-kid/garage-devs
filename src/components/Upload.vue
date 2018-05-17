<template>
  <div>
  <form @submit.prevent="upload">
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" id="exampleInputPassword1" v-model="creation.name" placeholder="give me a name">
    </div>
    <div class="form-group">
      <label>Bio</label>
      <textarea class="form-control" rows="2" placeholder="Tell me about the thing" v-model="creation.bio"></textarea>
    </div>
    <p>file</p>
    <input type="file" class="form-control-file" @change="onFileChanged">
    <p>image</p>
    <input type="file" class="form-control-file" @change="onFileImage">

    <div class="justify-content-center d-flex">

      <input type="submit" name="submit" value="Upload" class="btn btn-primary">
    </div>
  </form>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      creation : {
        file:"",
        image:"",
        name:"",
        creator:this.user,
        bio:"",
      },
      selectedImage: ""
    };
  },
  methods: {
    onFileImage(e){
    this.selectedImage = event.target.files[0]
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
        self.creation.image = data.secure_url
        self.upload()
      })
      .catch(console.error)

  },
    onFileChanged(e){
      let file = e.target.files[0]
      let self = this
      var storageRef = firebase.storage().ref('creations/'+file.name)

      var task = storageRef.put(file)

      task.on('state_changed',

      function progress(snapshot) {

      },
      function error(err){

      },
      function (){
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          self.creation.file = downloadURL
        })
      })
    },
    upload(){
      let self = this

      let getBody = {
        creator:this.creation.creator,
        bio:this.creation.bio,
        name:this.creation.name,
        image:this.creation.image,
        file:this.creation.file,
      }
      self = this
      fetch("http://localhost:3000/users/creations/", {
        method: "POST",
        body: JSON.stringify(getBody),
        headers: {
                "Content-Type": "application/json"
            },
      })
      .then(response => {return response.json()})

      .then(function(data){
        self.sendHome()
      })
        .catch(console.error)

    },
    sendHome () {
      this.$router.push({ name: 'Home', params: {} })
    },
  },
  props: ['user'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
