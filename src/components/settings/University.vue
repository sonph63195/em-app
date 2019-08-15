<template>
  <div>
    <Header />
    <div>
      <div class="container">
        <div class="card">
          <h5 class="card-header text-light bg-dark">University Management</h5>
          <div class="card-body">
            <div class="col-sm-12 col-md-12 bg-white rounded-5 px-2 pt-2 d-flex">
              <div id="schools">
                <hot-table
                  data="data"
                  :rowHeaders="true"
                  :colHeaders="true"
                  :class="['grid w-100']"
                ></hot-table>
                <button type="button" class="btn btn-outline-dark float-right">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <p>This is Footer.</p>
      </div>
    </footer>
  </div>
</template>
<script>
import "handsontable/dist/handsontable.full.css";
import HotTable from "@handsontable/vue";
import Header from "../header/Header";

export default {
  components: {
    Header,
    HotTable
  },
  created() {},
  data() {
    return {};
  }
};
</script>
<style>
#hot-display-license-info {
  display: none;
}
</style>
