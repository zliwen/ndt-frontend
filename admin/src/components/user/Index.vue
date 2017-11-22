<template lang='jade'>
</template>


<script>
export default {
	name: 'IndexCom',
  created:function () {
    var userid=this.session.get("userId");

    this.$router.push({ name: 'banking'});
  }
};
</script>

<style scoped lang='less'>
</style>
