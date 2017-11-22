<template lang='jade'>
  .loading-container
    Spin.loading(fix)
      Icon(type="load-c" size=40 class="spin-icon-load")
      div Loading
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
  directives: {
  },
  computed: {
  },
  filters: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .loading-container{
    .ivu-spin-fix{
      position: static;
    }
  }
</style>
