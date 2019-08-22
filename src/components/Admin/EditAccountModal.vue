<template>
  <b-modal
    id="editAccountModal"
    title="Edit user profile"
    title-tag="h3"
    title-class="title_edit_profile"
    @hidden="hideModal"
  >
    <div>
      <b-form v-if="!updateAccountState.updating">
        <b-form-group id="input-group-username" label="Username:" label-for="username">
          <b-form-input id="username" v-model="item.username" readonly></b-form-input>
        </b-form-group>

        <b-form-group
          :state="fisrtNameState"
          label="Firstname:"
          label-for="firstName"
          invalid-feedback="First name from 2 to 15 characters!"
        >
          <b-form-input id="firstName" v-model="item.firstName" :state="fisrtNameState" required></b-form-input>
        </b-form-group>

        <b-form-group
          label="Lastname :"
          label-for="lastName"
          :state="lastNameState"
          invalid-feedback="Last name from 2 to 15 characters!"
        >
          <b-form-input id="lastName" v-model="item.lastName" :state="lastNameState" required></b-form-input>
        </b-form-group>
      </b-form>

      <div v-if="updateAccountState.updating" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      </div>
    </div>
    <!-- footer of modal -->
    <template slot="modal-footer">
      <div class="d-flex justify-content-center w-100">
        <b-button @click="updateAccount(item)" variant="info" class="shadow btn-lg">Update profile</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ToastMixin } from "../mixins";
export default {
  mixins: [ToastMixin],
  data() {
    return {
      fisrtNameState: null,
      lastNameState: null,
      modalInfo: this.item
    };
  },
  props: ["item"],

  methods: {
    // check edit profile form
    checkFormValidity() {
      this.fisrtNameState =
        this.item.firstName.length > 2 && this.item.firstName.length < 15
          ? "valid"
          : "invalid";
      this.lastNameState =
        this.item.lastName.length > 2 && this.item.lastName.length < 15
          ? "valid"
          : "invalid";
      const valid =
        this.fisrtNameState == this.lastNameState &&
        this.lastNameState == "valid"
          ? true
          : false;
      return valid;
    },
    updateAccount(item) {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$store.dispatch("account/updateAccount", item);
    },
    hideModal() {
      this.fisrtNameState = null;
      this.lastNameState = null;
      this.getAllAccount();
    },
    getAllAccount() {
      this.$store.dispatch("account/getAllAccount");
    }
  },
  computed: {
    /**
     *
     */
    updateAccountState() {
      return this.$store.state.account.updateAccount;
    },

    accounts() {
      return this.$store.state.account.getAllAccount;
    }
  },

  watch: {
    updateAccountState: {
      handler() {
        if (this.updateAccountState.updated === false) {
          let errMsg = this.updateAccountState.data.errors[0];
          this.showToast(errMsg, "Error", "danger");
        } else if (this.updateAccountState.updated === true) {
          this.showToast("Account was updated", "Success", "success");
          // close modal
          this.$bvModal.hide("editAccountModal");
        }
      }
    }
  }
};
</script>