<template>
  <header>
    <b-navbar toggleable="lg" type="light" variant="white" class="shadow-sm">
      <b-container>
        <b-navbar-brand to="/">
          <img src="@/assets/Logo.svg" width="117" alt />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mr-auto d-flex">
            <b-nav-form class="search-bar search my-2 my-lg-0 mr-3 flex-fill">
              <div class="input-group w-100">
                <input
                  class="form-control search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div class="input-group-append">
                  <button class="search-btn btn btn-outline-dark my-2 my-sm-0 py-0" type="submit">
                    <font-awesome-icon icon="search" />
                  </button>
                </div>
              </div>
            </b-nav-form>
            <MenuList />
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="_ml-auto">
            <b-nav-item-dropdown no-caret right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content">
                <div class="d-flex align-items-stretch">
                  <span class="align-self-center">Alex Bob</span>
                  <span width="36" height="36" class="bg-dark rounded-circle overflow-hinden ml-2">
                    <img width="36" height="36" src="@/assets/Logo.svg" alt />
                  </span>
                </div>
              </template>
              <b-dropdown-item to="/setting-university">School code</b-dropdown-item>
              <b-dropdown-item to="/setting-param">Param</b-dropdown-item>
              <b-dropdown-item to="/logout">
                <span class="text-danger">
                  <font-awesome-icon icon="sign-out-alt" class="mr-3" />Sign Out
                </span>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
import MenuList from "./MenuList";

export default {
  components: {
    MenuList
  }
};
</script>
