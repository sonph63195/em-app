<template>
  <div>
    <main>
      <div class="w-100 d-flex mx-0">
        <!-- Sidebar  -->
        <transition name="slide-fade">
          <Slidebar />
        </transition>
        <!-- Page Content  -->
        <div id="content" class="ml-2 w-100 p-40" style="min-height: 100vh;">
          <nav
            class="navbar navbar-expand-lg navbar-light bg-light mt-3"
            style="border-radius: 10px;border: 3px solid #fff;"
          >
            <div class="container-fluid">
              <b-button v-b-toggle.sidebar id="sidebarCollapse" class="btn btn-info">
                <i class="fas fa-align-left">
                  <font-awesome-icon icon="align-left" />
                </i>
                <span>Menu</span>
              </b-button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
                  <li class="nav-item">
                    <div class="d-flex align-items-stretch">
                      <a class="nav-link" href="/admin">
                        Home
                        <span class="align-self-center">
                          <i class="fa fa-home mr-2">
                            <font-awesome-icon icon="home" />
                          </i>
                        </span>
                      </a>
                    </div>
                  </li>
                  <li class="nav-item active" style="font-weight: bold">
                    <div class="d-flex align-items-stretch">
                      <a class="nav-link" href="/admin-edit-profile">
                        Profile
                        <span class="align-self-center">
                          <i class="fa fa-address-card mr-2">
                            <font-awesome-icon icon="address-card" />
                          </i>
                        </span>
                      </a>
                    </div>
                  </li>
                  <li class="nav-item">
                    <div class="d-flex align-items-stretch">
                      <a class="nav-link" href="/login">
                        Logout
                        <span class="align-self-center">
                          <i class="fas fa-sign-out-alt mr-2">
                            <font-awesome-icon icon="sign-out-alt" />
                          </i>
                        </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h1>
            <small class="text-muted">Edit profile</small>
          </h1>
          <hr />
          <b-card>
            <b-card-header class="text-light bg-primary font-weight-bold">
              <h5>{{firstname }}&nbsp;{{ lastname}}</h5>
            </b-card-header>
            <b-card-body>
              <b-form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  class="edit"
                >
                  <label for="username">Username</label>
                  <b-form-input id="username" v-model="username" readonly></b-form-input>
                </b-form-group>
                <b-form-group
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  class="edit"
                >
                  <label for="firstname">First name</label>
                  <b-form-input
                    v-model="firstname"
                    :state="state_name"
                    id="firstname"
                    trim
                    placeholder="Enter first name. . ."
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  class="edit"
                >
                  <label for="lastname">Last name</label>
                  <b-form-input
                    trim
                    v-model="lastname"
                    :state="state_last"
                    id="lastname"
                    placeholder="Enter last name. . ."
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  class="edit"
                >
                  <label for="passowrd">Password</label>
                  <b-form-input
                    type="password"
                    trim
                    required
                    v-model="password"
                    :state="state_password"
                    id="password"
                    placeholder="Enter password ...."
                  ></b-form-input>
                </b-form-group>
                <label for="confirmpassword">Confirm password</label>
                <b-form-input
                  type="password"
                  trim
                  :state="state"
                  v-model="confirmpassword"
                  id="confirmpassword"
                ></b-form-input>
                <b-button @click="save" class="btn btn-lg btn-success mt-2" type="submit">
                  <i class="fas fa-check">
                    <font-awesome-icon icon="check" />
                  </i> Save
                </b-button>
                <b-button class="btn btn-lg ml-2 mt-2" type="reset">
                  <i class="fas fa-sync">
                    <font-awesome-icon icon="sync" />
                  </i> Reset
                </b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Slidebar from "./Slidebar";
export default {
  components: {
    Slidebar
  },
  computed: {
    state_name() {
      if (this.firstname.length >= 3 && this.firstname.length <= 50) {
        return true;
      } else if (this.firstname.length > 50) {
        return false;
      } else {
        return false;
      }
    },
    state_last() {
      if (this.lastname.length >= 3 && this.lastname.length <= 50) {
        return true;
      } else if (this.lastname.length > 50) {
        return false;
      } else {
        return false;
      }
    },
    state_password() {
      return this.password.length >= 3 && this.password.length <= 50
        ? true
        : false;
    },
    state() {
      return this.password === this.confirmpassword ? true : false;
    },
    invalidFeedback() {
      if (this.firstname.length > 3) {
        return "";
      } else if (this.firstname.length > 0) {
        return "Enter at least 3 characters";
      } else if (this.firstname.length > 50) {
        return "Less than 50 characters";
      } else {
        return "Please enter something";
      }
    },
    validFeedback() {
      return this.state === true ? "Thank you" : "";
    }
  },
  data() {
    return {
      username: "quoctrin@gmail.com",
      firstname: "Son",
      lastname: "Goku",
      password: "",
      confirmpassword: ""
    };
  },
  methods: {
    save() {
      if (
        this.state_name === true &&
        this.state_last === true &&
        this.state_password === true &&
        this.state === true
      ) {
        alert("Save successfull!!!");
      } else {
        alert("Can't Save!!!");
      }
    }
  }
};
</script>
