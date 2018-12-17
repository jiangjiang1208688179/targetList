<template>
  <div class="card">
      <div class="cardHead"></div>
      <div class="cardbody"></div> 
  </div>
</template>

<script>
export default {
  name: 'cardBox',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
    border: 1px solid #ccc;
    width: 500px;
    border-radius: 5px;
    box-shadow: 5 5 5 3 #ccc
}
.cardHead {
 padding: 5px;
 border-bottom: 1x solid #ccc;
}
.cardBody {
    padding: 5px;
}
</style>
