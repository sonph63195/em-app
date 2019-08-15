<template>
  <b-container class="mt-5">
    <b-row class="d-flex justify-content-center">
      <b-col cols="12" md="6" lg="4">
        <b-card-group deck>
          <b-card class="shadow-lg position-relative" bg-variant="light">
            <b-card-img src />
            <div
              v-if="loading"
              class="fixed-bottom sticky-top position-absolute d-flex justify-content-center align-items-center"
              style="background-color: rgba(249, 249, 249, 0.5)"
            >
              <b-spinner type="grow" variant="dark" label="loading..."></b-spinner>
            </div>
            <b-card-body>
              <center>
                <h1>Login</h1>
              </center>
              <br />
              <b-form @submit="login" ref="form" class="needs-validation" novalidate>
                <b-form-group label="Username:" label-for="username">
                  <b-form-input
                    invalid-feedback="Username is required"
                    required
                    id="username"
                    v-model="username"
                  />
                </b-form-group>
                <b-form-group label="Password:" label-for="password">
                  <b-form-input
                    id="password"
                    type="password"
                    required
                    invalid-feedback="Password is required"
                    v-model="password"
                  />
                </b-form-group>
                <b-button variant="primary" block type="submit">
                  <strong>Sign in</strong>
                </b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    loading() {
      return this.$store.state.authenticate.login.loading;
    },
    token() {
      return this.$store.state.authenticate.login.token;
    }
  },
  methods: {
    login(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (this.$refs.form.checkValidity() === false) {
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        this.authenticate();
        return;
      }
      this.$refs.form.classList.add("was-validated");
    },
    authenticate() {
      const { username, password } = this;
      this.$store.dispatch("authenticate/authenticate", { username, password });
    }
  }
};
</script>