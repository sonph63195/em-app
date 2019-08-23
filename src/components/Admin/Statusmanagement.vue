<template>
  <b-card header-tag="header" header-bg-variant="primary" header-text-variant="white">
    <h4 slot="header">Status management</h4>
    <b-card-body>
      <b-container fluid>
        <b-table
          v-if="!accounts.loading"
          thead-class="header_table"
          :items="accounts.accounts"
          :fields="tableStatus.fields"
          striped
          bordered
          hover
        >
          <template slot="#" slot-scope="data">{{ data.index + 1 }}</template>
          <template slot="username" slot-scope="data">{{ data.item.username }}</template>
          <template slot="first_name" slot-scope="data">{{ data.item.firstName }}</template>
          <template slot="last_name" slot-scope="data">{{ data.item.lastName }}</template>
          <template
            slot="status"
            slot-scope="data"
          >{{ data.item.enabled == true? 'Enabled':'Disabled' }}</template>
          <template slot="handle" slot-scope="row">
            <!-- edit profile button -->
            <b-button size="sm" @click="info(row.item)" class="mr-1" variant="info">Edit profile</b-button>
            <!-- change Enabled button -->
            <b-button
              size="sm"
              @click="changeStatus(row.item)"
              :class="buttonStatusColor(row.item.enabled)"
            >{{row.item.enabled? "Disabled":"Enabled"}}</b-button>
          </template>
        </b-table>

        <!-- Edit info modal -->
        <EditAccountModal v-bind:item="currentAccount" />
        <!-- Loading table -->
        <div v-if="accounts.loading" class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        </div>
      </b-container>
    </b-card-body>
  </b-card>
</template>
<script>
import EditAccountModal from "./EditAccountModal";
export default {
  components: {
    EditAccountModal
  },
  data() {
    return {
      currentAccount: "",
      tableStatus: {
        fields: [
          "#",
          { key: "username", sortable: true },
          { key: "first_name", sortable: true },
          { key: "last_name", sortable: false },
          { key: "status", sortable: false },
          { key: "handle", sortable: false }
        ]
      }
    };
  },
  mounted() {
    this.getAllAccount();
  },
  methods: {
    //Load account
    getAllAccount() {
      this.$store.dispatch("account/getAllAccount");
    },
    buttonStatusColor(enabled) {
      return enabled ? "" : "bg-success";
    },
    // Show edit profile modal
    info(item) {
      this.currentAccount = item;
      this.$bvModal.show("editAccountModal");
    },
    // change status of table status management
    changeStatus(item) {
      if (item.enabled) {
        this.$store.dispatch("account/disableAccount", item.username);
      } else {
        this.$store.dispatch("account/enableAccount", item.username);
      }
      this.getAllAccount();
      this.getAllAccount();
    }
  },

  computed: {
    accounts() {
      return this.$store.state.account.getAllAccount;
    }
  }
};
</script>
<style>
.header_table {
  background-color: #b8daff;
}
.title_edit_profile {
  margin-left: 30%;
}
</style>