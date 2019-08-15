<template>
  <b-form ref="form" @submit.stop.prevent="handleRegister" novalidate>
    <b-form-group
      :state="regUsernameState"
      invalid-feedback="Username is invalid"
      valid-feedback="Good"
    >
      <label for="username">Username:</label>
      <b-form-input
        id="username"
        v-model="regUsername"
        :state="regUsernameState"
        trim
        required
        minlength="3"
        maxlength="15"
        placeholder="Enter User name. . ."
      />
    </b-form-group>
    <b-form-group
      invalid-feedback="Firstname is invalid"
      :state="regFirstnameState"
      valid-feedback="Good"
    >
      <label for="firstname">Firstname:</label>
      <b-form-input
        id="firstname"
        v-model="regFirstname"
        :state="regFirstnameState"
        minlength="3"
        maxlength="15"
        required
        placeholder="Enter first name. . ."
      />
    </b-form-group>
    <b-form-group
      invalid-feedback="Lastname is invalid"
      :state="regLastnameState"
      valid-feedback="Good"
    >
      <label for="lastname">Lastname:</label>
      <b-form-input
        v-model="regLastname"
        :state="regLastnameState"
        id="lastname"
        minlength="3"
        maxlength="15"
        required
        placeholder="Enter Last name. . ."
      />
    </b-form-group>
    <b-form-group
      invalid-feedback="Password is invalid"
      valid-feedback="Good"
      :state="regPasswordState"
    >
      <label for="password">Password:</label>
      <b-form-input
        id="password"
        v-model="regPassword"
        :state="regPasswordState"
        minlength="3"
        maxlength="15"
        required
        type="password"
      />
    </b-form-group>
    <b-form-group :state="regConfirmPasswordState" invalid-feedback="Confirm is not match">
      <label for="confirmpassword">Confirm password:</label>
      <b-form-input
        id="confirmpassword"
        v-model="regConfirmPassword"
        type="password"
        required
        :state="regConfirmPasswordState"
        invalid-feedback="Confirm is not match"
      />
    </b-form-group>
    <b-button @click="register" class="btn btn-lg btn-success mt-2" type="submit">
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
export default {
  data() {
    return {
      regConfirmPasswordState: null,
      regPasswordState: null,
      regUsernameState: null,
      regFirstnameState: null,
      regLastnameState: null,
      regUsername: "",
      regFirstname: "",
      regLastname: "",
      regPassword: "",
      regConfirmPassword: ""
    };
  },
  methods: {
    // check state of from Create account
    checkRegFormValidity() {
      this.regUsernameState =
        this.regUsername.length > 2 && this.regUsername.length < 50
          ? "valid"
          : "invalid";
      this.regFirstnameState =
        this.regFirstname.length > 2 && this.regFirstname.length < 50
          ? "valid"
          : "invalid";
      this.regLastnameState =
        this.regLastname.length > 2 && this.regLastname.length < 50
          ? "valid"
          : "invalid";
      this.regPasswordState = this.regPassword.length > 0 ? "valid" : "invalid";
      if (this.regPasswordState == "valid") {
        this.regConfirmPasswordState =
          this.regPassword == this.regConfirmPassword ? "valid" : "invalid";
      }
      const valid =
        (this.regUsernameState == this.regFirstnameState) ==
          this.regLastnameState &&
        this.regLastnameState == "valid" &&
        this.regPasswordState == "valid" &&
        this.regConfirmPasswordState == "valid"
          ? true
          : false;
      return valid;
    },
    // call @click
    register(evt) {
      evt.preventDefault();
      this.handleRegister();
    },
    // call @submit
    handleRegister() {
      if (!this.checkRegFormValidity()) {
        return;
      }
      this.$refs.form.classList.add("was-validated");
      alert("save");
    }
  }
};
</script>