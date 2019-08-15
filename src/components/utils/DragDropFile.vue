<template>
  <div>
    <DropDrag
      class="border-0"
      ref="dropzone"
      id="dropzone"
      :options="dropzoneOptions"
      :useCustomSlot="true"
      @vdropzone-file-added="fileAddedEvent"
      @vdropzone-removed-file="removedFileEvent"
    >
      <div v-if="!adding">
        <img src="@/assets/Icon-import.svg" class="mt-3" alt />
        <div class="p-3">
          <p class="h5 mb-0">Drag and Drop your file here</p>
          <p class="mb-0">Or click here to choose your file.</p>
        </div>
      </div>
      <div v-if="adding">
        <img src="@/assets/Icon-import.svg" class="mt-3" alt />
      </div>
    </DropDrag>
  </div>
</template>

<script>
import DropDrag from "vue2-dropzone";

export default {
  components: {
    DropDrag
  },
  data() {
    return {
      adding: false,
      dropzoneOptions: {
        method: "POST",
        url: "http://localhost:8080/login",
        timeout: 30000,
        headers: { "My-Awesome-Header": "header value" },
        //maxFilesize: 1,
        addRemoveLinks: true,
        dictRemoveFile: "Remove", // translate defaule is "Remove file"
        autoProcessQueue: false, // Disable auto post file into server
        acceptedFiles:
          "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        previewTemplate: this.template()
      }
    };
  },
  methods: {
    template() {
      return `<div class="dz-preview dz-file-preview">
                <div class="dz-image">
                    <div data-dz-thumbnail-bg></div>
                </div>
                <div class="dz-details">
                    <div class="dz-size"><span data-dz-size></span></div>
                    <div class="dz-filename text-truncate"><span data-dz-name></span></div>
                </div>
                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                <div class="dz-error-message"><span data-dz-errormessage></span></div>
                <div class="dz-success-mark"><img src="${checkIcon}"></div>
                <div class="dz-error-mark"><img src="${closeIcon}"></div>
            </div>
        `;
    },
    sendingEvent(file, xhr, formData) {
      this.$emit("sendingEvent", { file, xhr, formData });
    },
    fileAddedEvent(event) {
      this.$emit("fileAddedEvent", event);
    },
    removedFileEvent(file, error, xhr) {
      this.$emit("removedFileEvent", { file, error, xhr });
    }
  }
};

var checkIcon = require("../../assets/check-icon.svg");
var closeIcon = require("../../assets/close.svg");
</script>

