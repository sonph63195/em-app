<template>
  <div>
    <b-modal :id="id" size="sm" header-class="border-0" footer-class="border-0">
      <b-container fluid>
        <b-row>
          <b-col cos="12" class="text-center">
            <div v-html="icons"></div>
            <slot></slot>
          </b-col>
        </b-row>
      </b-container>
      <template slot="modal-footer" slot-scope="{ cancel }">
        <div v-if="type !== 'danger'" class="d-flex justify-content-center w-100">
          <b-button @click="cancel()" variant="light">Cancel</b-button>
          <b-button :variant="type" @click="action" class="shadow ml-3">OKAY</b-button>
        </div>
        <div v-else class="d-flex justify-content-center w-100">
          <b-button :variant="type" @click="cancel()" class="shadow">OKAY</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    id: String
  },
  watch: {
    type: {
      immediate: true,
      handler() {
        let result = ``;
        switch (this.type) {
          case "warning":
            result = `<img src="${require("../../assets/warning.svg")}" alt="warning" /><div class="mt-3 h3 text-warning">WARNING!</div>`;
            break;
          case "danger":
            result = `<img src="${require("../../assets/error.svg")}" alt="error" /><div class="mt-3 h3 text-danger">ERROR!</div>`;
            break;
          case "":
            break;
          default:
            // Info
            result = `<img src="${require("../../assets/info.svg")}" alt="info" />`;
        }
        this.icons = result;
      }
    }
  },
  methods: {
    action() {
      this.$emit("action");
    }
  },
  data() {
    return {
      icons: null
    };
  }
};
</script>

