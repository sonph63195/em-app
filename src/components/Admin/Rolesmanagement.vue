<template>
  <b-card header-tag="header" header-bg-variant="primary" header-text-variant="white">
    <h4 slot="header">Roles</h4>
    <b-card-body>
      <b-container fluid>
        <b-table
          thead-class="header_table"
          :items="accounts.accounts"
          :fields="roleFields"
          striped
          bordered
          hover
        >
          <template slot="#" slot-scope="data">{{data.index + 1}}</template>
          <template slot="username" slot-scope="data">{{data.item.username}}</template>
          <template slot="first_name" slot-scope="data">{{data.item.firstName}}</template>
          <template slot="last_name" slot-scope="data">{{data.item.lastName}}</template>
          <template slot="current_roles" slot-scope="data">
            <div>
              <span
                class="badge badge-primary mx-1"
                v-for="role in data.item.authorities"
                :key="role.authorityId"
                @click="removeRole(data.item, role.userRole)"
                v-b-tooltip.hover
                title="Click to remove"
              >{{ role.userRole }}</span>
            </div>
          </template>
          <template slot="roles_add" slot-scope="data">
            <b-form-group>
              <b-form-select
                v-model="data.item.newRole"
                @change="AddNewRole(data.item)"
                :options="roles"
              ></b-form-select>
            </b-form-group>
          </template>

          <template slot="submit">
            <b-button variant="secondary" @click="saveRoles" type="submit">Submit</b-button>
          </template>
        </b-table>
      </b-container>
    </b-card-body>
  </b-card>
</template>
<script>
import { ToastMixin } from "../mixins";

export default {
  mixins: [ToastMixin],
  data() {
    return {
      roleFields: [
        "#",
        {
          key: "username",
          label: "Username",
          formatter: "username"
        },
        {
          key: "first_name",
          label: "First Name",
          formatter: "first_name"
        },
        {
          key: "last_name",
          label: "Last Name	",
          formatter: "last_name"
        },
        "current_roles",
        "roles_add",
        "submit"
      ],
      roleItems: [
        // {
        //   "#": 1,
        //   username: "Trinnguyen@gmail.com",
        //   first_name: "Trin",
        //   last_name: "Nguyen",
        //   current_roles: "Event manager"
        // },
        // {
        //   "#": 2,
        //   username: "Quockhanh@gmail.com",
        //   first_name: "Khanh",
        //   last_name: "Bui",
        //   current_roles: "Event manager"
        // },
      ],
      roles: [
        { value: null, text: "Select roles" },
        { value: "ROLE_EVENTMANAGER", text: "ROLE_EVENTMANAGER" },
        { value: "ROLE_CANDIDATEMANAGER", text: "ROLE_CANDIDATEMANAGER" },
        { value: "ROLE_REPORTER", text: "ROLE_REPORTER" }
      ]
    };
  },
  methods: {
    getAllAccount() {
      this.$store.dispatch("account/getAllAccount");
    },
    AddNewRole(account) {
      let flag = 0;
      account.authorities.forEach(role => {
        if (role.userRole === account.newRole) {
          flag++;
          return;
        }
      });
      if (flag <= 0) {
        account.authorities.push({
          authorityId: null,
          userRole: account.newRole
        });
      } else {
        this.showToast("This role has already added", "Error", "danger");
      }
    },
    removeRole(account, userRole) {
      if (userRole === "ROLE_ADMIN") {
        this.showToast("This role can not be removed", "Error", "danger");
        return;
      }
      const index = account.authorities.findIndex(role => {
        return role.userRole === userRole;
      });
      console.log(index);
      account.authorities.splice(index, 1);
    },
    saveRoles() {}
  },
  mounted() {
    this.getAllAccount();
  },
  computed: {
    accounts() {
      return this.$store.state.account.getAllAccount;
    }
  },
  watch: {
    accounts: {
      immediate: true,
      handler() {
        const accounts = this.accounts.accounts;
        if (accounts) {
          accounts.forEach(account => (account.newRole = null));
        }
      }
    }
  }
};
</script>