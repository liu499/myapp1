<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    import axios from "axios"
export default {
  name: 'App',
    mounted(){
      axios.get("/token",{
          headers:{
              authorization:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZUlkIjoiMTIxMjEyIiwiaWQiOiIxMjEyMTIiLCJleHAiOjE1NDM1ODA1NDY0NTR9.Dwpb79TEL-_NdyggaN009Xz7SgbY1nBACsDowGBK4eI"
          }
        }).then(({data})=>{
            console.log(data)
        })
    }
}
</script>

<style>
    *{
        padding:0;
        margin:0;
    }
    html{
        font-size: 15.625vw;
        color: black;
    }
    a{
        text-decoration: none;
        color: black;
    }
</style>
