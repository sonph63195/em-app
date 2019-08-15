<template>
  <div>
    <div class="w-100 d-flex mx-0">
      <!-- Sidebar  -->
      <transition name="slide-fade">
        <Slidebar />
      </transition>
      <!-- Page Content  -->
      <b-container fluid>
        <b-row>
          <b-col>
            <div
              id="content"
              class="ml-2"
              _style="width: calc(100% - 250px);
              padding: 40px;
              min-height: 100vh;
              transition: all 0.3s;
              position: absolute;
              top: 0;
              right: 0;"
            >
              <!-- Header-->
              <nav class="navbar navbar-expand-lg navbar-light bg-light mt-3">
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
              </nav>
              <h1>
                <small class="text-muted" id="Status">Account management</small>
              </h1>
              <hr />
              <!-- Status management -->
              <Statusmanagement />
              <br />
              <h1>
                <small class="text-muted" id="CreateAccount">Create account</small>
              </h1>
              <hr />
              <!-- Create account -->
              <Createaccount />
              <br />
              <h1>
                <small class="text-muted" id="RolesManagement">Roles management</small>
              </h1>
              <hr />
              <!-- Roles management -->
              <Rolesmanagement />
              <hr />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import Slidebar from "./Slidebar";
import Statusmanagement from "./Statusmanagement";
import Createaccount from "./Createaccount";
import Rolesmanagement from "./Rolesmanagement";
export default {
  components: {
    Slidebar,
    Statusmanagement,
    Createaccount,
    Rolesmanagement
  }
};
</script>

