<template>
  <b-card header-tag="header" header-bg-variant="primary" header-text-variant="white">
    <h4 slot="header">Status management</h4>
    <b-card-body>
      <b-container fluid>
        <b-table
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
            <b-button
              size="sm"
              @click="info(row.item, $event.target)"
              class="mr-1"
              variant="info"
            >Edit profile</b-button>
            <!-- change state button -->

            <b-button
              size="sm"
              @click="changeStatus(row.item)"
            >{{row.item.status =="Enabled"? "Disabled":"Enabled"}}</b-button>
          </template>
        </b-table>

        <!-- Edit info modal -->

        <b-modal
          :id="infoModal.id"
          title="Edit user profile"
          title-tag="h3"
          title-class="title_edit_profile"
          ref="modal"
          @show="resetInfoModal"
          @hidden="resetInfoModal"
        >
          <b-form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group id="input-group-username" label="Username:" label-for="input-username">
              <b-form-input id="input-username" v-model="infoModal.username" readonly></b-form-input>
            </b-form-group>

            <b-form-group
              :state="fisrtNameState"
              label="Firstname:"
              label-for="input-firstName"
              invalid-feedback="First name from 2 to 15 characters!"
            >
              <b-form-input
                id="input-firstName"
                v-model="infoModal.first_name"
                :state="fisrtNameState"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Lastname :"
              label-for="lastName"
              :state="lastNameState"
              invalid-feedback="Last name from 2 to 15 characters!"
            >
              <b-form-input
                id="lastName"
                v-model="infoModal.last_name"
                :state="lastNameState"
                required
              ></b-form-input>
            </b-form-group>

            <!-- <b-form-group
              label="Password :"
              label-for="password"
              :state="passwordState"
              invalid-feedback="Password is required"
            >
              <b-form-input
                id="password"
                required
                type="password"
                :state="passwordState"
                v-model="password"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Confirm password :"
              label-for="confirmPassword"
              :state="conFirmpasswordState"
              invalid-feedback="Password is not match"
            >
              <b-form-input
                id="confirmPassword"
                required
                type="password"
                v-model="confirmPassword"
                :state="conFirmpasswordState"
              ></b-form-input>
            </b-form-group>-->
          </b-form>

          <!-- footer of modal -->
          <template slot="modal-footer">
            <div class="d-flex justify-content-center w-100">
              <b-button @click="handleOk" variant="info" class="shadow btn-lg">Update profile</b-button>
            </div>
          </template>
        </b-modal>
      </b-container>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  data() {
    return {
      fisrtNameState: null,
      lastNameState: null,
      // passwordState: null,
      // conFirmpasswordState: null,
      // password: "",
      // confirmPassword: "",
      infoModal: {
        id: "info-modal",
        username: "",
        first_name: "",
        last_name: ""
        // password: "",
        // confirm_password: ""
      },
      tableStatus: {
        fields: [
          "#",
          { key: "username", sortable: true },
          { key: "first_name", sortable: true },
          { key: "last_name", sortable: false },
          { key: "status", sortable: false },
          { key: "handle", sortable: false }
        ]
      },
      rolesFields: [
        "#",
        "username",
        "first_name",
        "last_name",
        "current_roles",
        "roles_add",
        "submit"
      ],
      rolesItems: [
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
          current_roles: "Reporter"
        },
        {
          "#": 3,
          username: "Hoangloi@gmail.com",
          first_name: "Loi",
          last_name: "Nguyen",
          current_roles: "Candidate manager"
        },
        {
          "#": 4,
          username: "Hoanviet@gmail.com",
          first_name: "Viet",
          last_name: "Phan",
          current_roles: "Reporter"
        },
        {
          "#": 5,
          username: "Hoangson@gmail.com",
          first_name: "Son",
          last_name: "Pham",
          current_roles: "Reporter"
        },
        {
          "#": 6,
          username: "Trinnguyen@gmail.com",
          first_name: "Trin",
          last_name: "Nguyen",
          current_roles: "Reporter"
        },
        {
          "#": 7,
          username: "Trinnguyen@gmail.com",
          first_name: "Trin",
          last_name: "Nguyen",
          current_roles: "Reporter"
        }
      ]
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
    // Show edit profile modal
    info(item, button) {
      this.infoModal.username = item.username;
      this.infoModal.first_name = item.firstName;
      this.infoModal.last_name = item.lastName;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    // Reset edit profile modal
    resetInfoModal() {
      this.infoModal.title = "";
      this.fisrtNameState = null;
      this.lastNameState = null;
      // this.passwordState = null;
      // this.conFirmpasswordState = null;
      // this.password = "";
      // this.confirmPassword = "";
    },
    // check edit profile form
    checkFormValidity() {
      this.fisrtNameState =
        this.infoModal.first_name.length > 2 &&
        this.infoModal.first_name.length < 15
          ? "valid"
          : "invalid";
      this.lastNameState =
        this.infoModal.last_name.length > 2 &&
        this.infoModal.last_name.length < 15
          ? "valid"
          : "invalid";
      // this.passwordState = this.password.length > 0 ? "valid" : "invalid";
      // if (this.passwordState == "valid") {
      //   this.conFirmpasswordState =
      //     this.password == this.confirmPassword ? "valid" : "invalid";
      // }
      const valid =
        this.fisrtNameState == this.lastNameState &&
        this.lastNameState == "valid"
          ? // &&
            // this.passwordState == "valid" &&
            // this.conFirmpasswordState == "valid"
            true
          : false;
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    // change status of table status management
    changeStatus(item) {
      item.status = item.status === "Enabled" ? "Disabled" : "Enabled";
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