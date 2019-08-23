<template>
  <b-form @submit.prevent="onSubmit" v-if="show">
    <b-form-group
    >
      <label for="username">Username:</label>
      <b-form-input
        id="username"
        v-model="account.username"
        trim
        required
        minlength="3"
        maxlength="15"
        placeholder="Enter User name. . ."
      />
    </b-form-group>
    <b-form-group
    >
      <label for="firstname">Firstname:</label>
      <b-form-input
        id="firstname"
        v-model="account.firstName"
        minlength="3"
        maxlength="15"
        required
        placeholder="Enter first name. . ."
      />
    </b-form-group>
    <b-form-group
    >
      <label for="lastname">Lastname:</label>
      <b-form-input
        v-model="account.lastName"
        id="lastname"
        minlength="3"
        maxlength="15"
        required
        placeholder="Enter Last name. . ."
      />
    </b-form-group>
    <b-form-group
    >
      <label for="password">Password:</label>
      <b-form-input
        id="password"
        v-model="account.password"
        minlength="3"
        maxlength="15"
        required
        type="password"
      />
    </b-form-group>
    <!-- <b-form-group :state="regConfirmPasswordState" invalid-feedback="Confirm is not match">
      <label for="confirmpassword">Confirm password:</label>
      <b-form-input
        id="confirmpassword"
        v-model="regConfirmPassword"
        type="password"
        required
        :state="regConfirmPasswordState"
        invalid-feedback="Confirm is not match"
      />
    </b-form-group> -->
    <b-button type="submit" class="btn btn-lg btn-success mt-2">
      <i class="fas fa-check">
        <font-awesome-icon icon="check" />
      </i> Save
    </b-button>
    <b-button type="Reset" class="btn btn-lg ml-2 mt-2">
      <i class="fas fa-sync">
        <font-awesome-icon icon="sync" />
      </i> Reset
    </b-button>
  </b-form>
</template>
<script>
import { ToastMixin } from "../mixins";
export default {
  mixins: [ToastMixin],
  mounted() {},
  data() {
    return {
      // regConfirmPasswordState: null,
      account: {
        username: "",
        firstName: "",
        lastName: "",
        password: ""
      },
      show: true,
      // regConfirmPassword: ""
    };
  },
  methods: {
    register() {
      const { account } = this;
      this.$store.dispatch("account/saveAccount", { account });
    },
    onSubmit(evt) {
      alert(JSON.stringify(this.account))
      this.register();
    },
  },
  watch: {
    saveAccount: {
      handler() {
        if (this.saveAccount.state.success === true) {
          this.showToast("Successful", "Succes", "success");
          this.$emit(
            "addNewAccountSuccess",
            this.saveAccount.data.identifiedObject
          );
        } else if (this.saveAccount.state.success === false) {
          let msg = this.saveAccount.data.errors[0];
          this.showToast(msg, "Error", "danger");
        }
      }
    }
  },
  computed: {
    saveAccount() {
      return this.$store.state.account.saveAccount;
    },
  }
};
</script>