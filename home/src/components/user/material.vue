<script>
  import material from "../../components/user/materialPerson.vue"
  import materialCompany from "../../components/user/materialCompany.vue"
  export default {
    functional:true,
    render(h,c){
      let isCompany = c.parent.session.get("userType")==="202";
      return isCompany?h(material,c.data):h(materialCompany);
    }
  }
</script>
