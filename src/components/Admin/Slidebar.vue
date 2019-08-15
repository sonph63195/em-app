<template>
  <!--Slide bar-->
  <b-collapse
    v-b-scrollspy:nav-scroller
    id="sidebar"
    style="width: 320px; height=100vh; margin-right: 2rem; background: #6d7fcc;"
    visible
  >
    <div class="fixed-top" style="width: 250px;">
      <b-nav id="sidebar" class="w-100 h-100">
        <div class="slidebar-header" style="padding: 20px;">
          <center>
            <img src="@/assets/Logo.svg" width="150" height="70" alt />
          </center>
          <h3 class="text-center" style="color: #fff">Admin Page</h3>
          <div class="d-flex align-items-stretch ml-3">
            <img
              src="@/assets/goku-son-kakarot-dragon-ball-z-resurrection-f-1.13.jpg"
              class="rounded-circle mr-3 ml-3"
              alt="Cinque Terre"
              width="50"
              height="50"
            />
            <span class="align-self-center">
              <h4 class="mb-0" style="color:#fff">Son Goku</h4>
            </span>
          </div>
        </div>
        <ul class="ml-3 list-unstyled components" style="padding: 20px 0;width: 250px">
          <h3 class="p-10 text-white">Admin menu</h3>
          <li class="active">
            <a
              v-b-toggle.accountsManagement
              class="h3 text-white dropdown-toggle"
              style="padding: 10px;font-size: 1.5em;display: block;color:#fff;text-decoration:none;display: block;
                right: 20px;"
            >Home</a>
            <b-collapse id="accountsManagement" role="tabpanel" class>
              <ul class="list-unstyled" id="homeSubmenu">
                <li>
                  <a
                    v-b-toggle.accountsManagementSubMenu
                    style="padding: 10px; font-size: 1.1em; display: block;color:#fff;text-decoration:none"
                    href="#accountsManagementSubMenu"
                    class="h5 pt-3 text-white dropdown-toggle"
                  >Account management</a>
                  <b-collapse id="accountsManagementSubMenu" role="tabpanel" class="mt-2" visible>
                    <ul class="list-unstyled" id="accountsManagementSubMenu">
                      <li>
                        <a
                          style="padding: 10px;
                            font-size: 1.1em;
                            display: block;
                            color:#fff;
                            display: block;text-decoration:none;"
                          href="/admin/#Status"
                          @click="scrollIntoView"
                        >&nbsp;&nbsp;&nbsp;&nbsp;Status management</a>
                      </li>
                      <li>
                        <a
                          style="padding: 10px;
                            font-size: 1.1em;
                            color:#fff;
                            display: block;text-decoration:none;"
                          href="/admin/#CreateAccount"
                          @click="scrollIntoView"
                        >&nbsp;&nbsp;&nbsp;&nbsp;Create account</a>
                      </li>
                    </ul>
                  </b-collapse>
                </li>
                <li>
                  <a
                    style="padding: 10px; font-size: 1.1em; display: block;color:#fff;text-decoration:none"
                    href="/admin/#RolesManagement"
                    @click="scrollIntoView"
                  >Roles management</a>
                </li>
              </ul>
            </b-collapse>
          </li>
          <li>
            <a
              v-b-toggle.pageSubmenu
              style="padding: 10px;font-size: 1.5em;display: block;color:#fff;text-decoration:none;display: block;
                right: 20px;"
              class="dropdown-toggle"
            >Setting</a>
            <b-collapse id="pageSubmenu">
              <ul class="list-unstyled" id="pageSubmenu">
                <li>
                  <a
                    style="padding: 10px;font-size: 1.1em;display: block;color:#fff;text-decoration:none"
                    href="/admin-edit-profile"
                  >&nbsp;&nbsp;&nbsp;&nbsp;Profile</a>
                </li>
                <li>
                  <a
                    style="padding: 10px;font-size: 1.1em;display: block;color:#fff;text-decoration:none"
                    href="/login"
                  >&nbsp;&nbsp;&nbsp;&nbsp;Logout</a>
                </li>
              </ul>
            </b-collapse>
          </li>
        </ul>
      </b-nav>
    </div>
  </b-collapse>
</template>
<style>
a:hover {
  color: red;
}
</style>