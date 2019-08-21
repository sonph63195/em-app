<template>
  <div :id="id">
    <span
      @click="showInput"
      v-if="!showEdit"
      :class="cssClass"
      v-b-tooltip.hover
      title="Click to edit"
    >{{ value }}</span>
    <div v-if="showEdit" class="d-flex">
      <div class="flex-fill">
        <div v-if="type === 'input'">
          <b-form-input v-model="value" ref="textinput" :placeholder="value" />
        </div>
        <div v-if="type === 'select'">
          <b-form-select v-model="value" :options="defaultData.options"></b-form-select>
        </div>
      </div>
      <div>
        <b-button @click="saveInput" variant="link" v-b-tooltip.hover title="Save">
          <font-awesome-icon icon="check" class="text-success" v-if="!state.updating" />
          <b-spinner v-if="state.updating" variant="success" small label="Updating..."></b-spinner>
        </b-button>
      </div>
      <div>
        <b-button @click="cancelEdit" variant="link" v-b-tooltip.hover title="Cancel">
          <font-awesome-icon icon="times" class="text-dark" />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
//import PopupMessage from "../utils/PopupMessage";
import { PopupMixin } from "../mixins/PopupMixin";

export default {
  name: "edit-by-click",
  props: {
    id: {
      type: String,
      required: true
    },
    cssClass: {
      type: String,
      default: ""
    },
    valueKey: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "input"
    },
    obj: {
      type: Object,
      required: true
    },
    defaultData: {
      type: Object,
      required: false
    },
    state: {
      type: Object,
      default: null
    }
  },
  components: {
    //PopupMessage
  },
  mixins: [PopupMixin],
  data() {
    return {
      showEdit: false,
      oldValue: null,
      objKey: [],
      value: null
    };
  },
  mounted() {
    this.value = this.obj[this.valueKey];
  },
  watch: {
    state: {
      handler() {
        if (this.state.updated === true) {
          this.showEdit = false;
        } else if (this.state.updated === false) {
          this.cancelEdit();
        }
      }
    }
  },
  methods: {
    showInput() {
      this.showEdit = true;
      // save old value
      this.oldValue = this.value;
      if (this.type === "input") {
        this.$nextTick(function() {
          this.$refs.textinput.focus();
        });
      }
    },
    saveInput() {
      if (this.oldValue !== this.value && this.value !== "") {
        // update value to object
        this.obj[this.valueKey] = this.value;
        // send object to parent component to send request.
        this.$emit("updateEdit", this.obj);
      } else {
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.showEdit = false;
      this.obj[this.valueKey] = this.oldValue;
      this.value = this.oldValue;
    }
    // showError() {
    //   if (!this.state.updated) {
    //     this.showPopup(this.id, `${this.id}Error`);
    //     return;
    //   }
    // }
  }
};
</script>
