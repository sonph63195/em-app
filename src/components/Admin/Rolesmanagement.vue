<template>
  <b-card header-tag="header" header-bg-variant="primary" header-text-variant="white">
    <h4 slot="header">Roles</h4>
    <b-card-body>
      <b-container fluid>
        <b-table
          thead-class="header_table"
          :items="roleItems"
          :fields="roleFields"
          striped
          bordered
          hover
        >
        <template slot="roles_add">
            <b-form-group>
              <b-form-select v-model="selected" :options="roles" >
              </b-form-select>
            </b-form-group>
        </template>
        <template slot="submit">
            <b-button variant="secondary" type="submit">Submit</b-button>
        </template>
        </b-table>
      </b-container>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  data(){
    return {
      roleFields: [
        "#",
        "username",
        "first_name",
        "last_name",
        "current_roles",
        "roles_add",
        "submit"
      ],
      roleItems: [
        {
          "#": 1,
          username: "Trinnguyen@gmail.com",
          first_name: "Trin",
          last_name: "Nguyen",
          current_roles: "Event manager"
        },
        {
          "#": 2,
          username: "Quockhanh@gmail.com",
          first_name: "Khanh",
          last_name: "Bui",
          current_roles: "Event manager"
        },
      ],
      selected:null,
      roles:[
        {value:null, text:"Select roles"},
        {value:"Event manager", text:"Event manager"},
        {value:"Candidate manager", text:"Candidate manager"},
        {value:"Reporter", text:"Reporter"},
        ]
    }
  },
  methods:{
    // getAllAccount(){
    //   this.$store.dispatch("account/getAllAccount")
    // }
  },
  mounted() {},
  computed:{
    getAccountLoading() {
      let storeAccount = this.$store.state.account;
      let load = {
        loading: storeAccount.getAllAccount.loading,
        loaded: storeAccount.getAllAccount.loaded
      };
      return load;
    },
    accounts(){
      return this.$store.state.account.getAllAccount;
    },
  },
  watch:{
    accounts: {
      immediate: false,
      handler() {
        const accounts = this.accounts;
        if (accounts) {
          this.account = accounts.flatMap(account => {
            return {
              username: account.username,
              first_name: account.firstName,
              last_name:account.lastName
            };
          });
        }
      }
    },
  }
};
</script>