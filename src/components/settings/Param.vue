<template>
  <div>
    <Header />
    <div class="container center mt-3">
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Campuslink program" active>
            <b-card-text>
              <b-table
                striped
                hover
                :fields="fields"
                :items="items"
                contenteditable="true"
                bordered
                class="responsive-md text-center"
              >
                <template slot="remove" slot-scope="data">
                  <b-button
                    @click="removeRow(data.index)"
                    variant="danger"
                    contenteditable="false"
                  >Remove</b-button>
                </template>
              </b-table>
              <b-button v-b-modal.modal-sm variant="outline-dark float-left">Save</b-button>
              <b-modal
                id="modal-sm"
                size="sm"
                title="Beautiful"
                ok-only="true"
                ok-title="Love <3"
              >Beautiful girl</b-modal>
              <b-button @click="addRow" variant="outline-success float-right mb-2">
                <svg
                  class="svg-inline--fa fa-plus fa-w-14 fa-2x"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  />
                </svg>
              </b-button>
            </b-card-text>
          </b-tab>
          <b-tab title="Format Type">
            <b-card-text>
              <b-table
                striped
                hover
                :fields="fields_format"
                :items="items_format"
                contenteditable="true"
                bordered
                class="responsive-md text-center"
              >
                <template slot="remove" contenteditable="false">
                  <b-button variant="danger">Remove</b-button>
                </template>
              </b-table>
              <b-button variant="outline-dark float-left">Save</b-button>
              <b-button variant="outline-success float-right">
                <svg
                  class="svg-inline--fa fa-plus fa-w-14 fa-2x"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  />
                </svg>
              </b-button>
            </b-card-text>
          </b-tab>
          <b-tab title="Sub-Subject Type">
            <b-card-text>
              <b-table
                striped
                hover
                :fields="fields_subject"
                :items="items_subject"
                contenteditable="true"
                bordered
                class="responsive-md text-center"
              >
                <template slot="remove" contenteditable="false">
                  <b-button variant="danger">Remove</b-button>
                </template>
              </b-table>
              <b-button variant="outline-dark float-left">Save</b-button>
              <b-button variant="outline-success float-right">
                <svg
                  class="svg-inline--fa fa-plus fa-w-14 fa-2x"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  />
                </svg>
              </b-button>
            </b-card-text>
          </b-tab>
          <b-tab title="Status">
            <b-card-text>
              <b-table
                striped
                hover
                :fields="fields_status"
                :items="items_status"
                contenteditable="true"
                bordered
                class="responsive-md text-center"
              >
                <template slot="remove" contenteditable="false">
                  <b-button variant="danger">Remove</b-button>
                </template>
              </b-table>
              <b-button variant="outline-dark float-left">Save</b-button>
              <b-button variant="outline-success float-right">
                <svg
                  class="svg-inline--fa fa-plus fa-w-14 fa-2x"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  />
                </svg>
              </b-button>
            </b-card-text>
          </b-tab>
          <b-tab title="REC Status">
            <b-card-text>
              <b-table
                striped
                hover
                :fields="fields_recstatus"
                :items="items_recstatus"
                contenteditable="true"
                bordered
                class="responsive-md text-center"
              >
                <template slot="remove" contenteditable="false">
                  <b-button variant="danger">Remove</b-button>
                </template>
              </b-table>
              <b-button variant="outline-dark float-left">Save</b-button>
              <b-button variant="outline-success float-right">
                <svg
                  class="svg-inline--fa fa-plus fa-w-14 fa-2x"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  />
                </svg>
              </b-button>
            </b-card-text>
          </b-tab>
          <b-tab title="Contract">
            <b-card-text>
              <b-table
                striped
                hover
                :fields="fields_contract"
                :items="items_contract"
                contenteditable="true"
                bordered
                class="responsive-md text-center"
              >
                <template slot="remove" contenteditable="false">
                  <b-button variant="danger">Remove</b-button>
                </template>
              </b-table>
              <b-button variant="outline-dark float-left">Save</b-button>
              <b-button variant="outline-success float-right">
                <svg
                  class="svg-inline--fa fa-plus fa-w-14 fa-2x"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg
                >
                  <path
                    fill="currentColor"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                  />
                </svg>
              </b-button>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>
<script>
import Header from "../header/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      fields: [
        {
          key: "campuslink_program",
          label: "Campuslink program",
          formatter: "campuslink_program"
        },
        {
          key: "code",
          label: "Code",
          formatter: "code"
        },
        {
          key: "remove",
          label: "Remove",
          formatter: "remove"
        }
      ],
      items: [
        {
          campuslink_program: "Global Software Talent",
          code: "GST"
        },
        {
          campuslink_program: "THESIS",
          code: "THESIS"
        },
        {
          campuslink_program: "GST LITE",
          code: "LITE"
        },
        {
          campuslink_program: "INTERNSHIP",
          code: "INTE"
        }
      ],
      fields_format: [
        {
          key: "format_type",
          label: "Format type",
          formatter: "format_type"
        },
        {
          key: "remove",
          label: "Remove",
          formatter: "remove"
        }
      ],
      items_format: [
        {
          format_type: "Blended"
        },
        {
          format_type: "Offline"
        }
      ],
      fields_subject: [
        {
          key: "subject_type",
          label: "Sub-Subject type",
          formatter: "subject_type"
        },
        {
          key: "remove",
          label: "Remove",
          formatter: "remove"
        }
      ],
      items_subject: [
        {
          subject_type: "Net"
        },
        {
          subject_type: "IOS"
        },
        {
          subject_type: "Android"
        },
        {
          subject_type: "Java"
        },
        {
          subject_type: "Test"
        },
        {
          subject_type: "Đề Tài Tốt Nghiệp"
        }
      ],
      fields_status: [
        {
          key: "status",
          label: "Status",
          formatter: "status"
        },
        {
          key: "remove",
          label: "Remove",
          formatter: "remove"
        }
      ],
      items_status: [
        {
          status: "Active"
        },
        {
          status: "Cancel"
        },
        {
          status: "Done"
        },
        {
          status: "Drop-Out"
        },
        {
          status: "Failed"
        },
        {
          status: "Passed"
        }
      ],
      fields_recstatus: [
        {
          key: "rec_status",
          label: "REC Status",
          formatter: "rec_status"
        },
        {
          key: "remove",
          label: "Remove",
          formatter: "remove"
        }
      ],
      items_recstatus: [
        {
          rec_status: "Interview"
        },
        {
          rec_status: "Pass"
        },
        {
          rec_status: "Onboard"
        },
        {
          rec_status: "Cancel"
        },
        {
          rec_status: "Re-apply"
        },
        {
          rec_status: "Calling"
        }
      ],
      fields_contract: [
        {
          key: "contract",
          label: "Contract",
          formatter: "contract"
        },
        {
          key: "remove",
          label: "Remove",
          formatter: "remove"
        }
      ],
      items_contract: [
        {
          contract: "Define-term Labor Contract"
        },
        {
          contract: "Fresher Training Contract"
        },
        {
          contract: "Intern Training Contract"
        },
        {
          contract: "On Job Training Contract"
        }
      ]
    };
  },
  methods: {
    save: function() {
      alert("save something");
    },
    addRow: function() {
      this.fields.push(
        {
          key: "campuslink_program",
          label: "Campuslink program",
          formatter: "campuslink_program"
        },
        {
          key: "code",
          label: "Code",
          formatter: "code"
        },
        {
          key: "remove",
          label: "Remove",
          formatter: "remove"
        }
      );
      this.items.push({ campuslink_program: "", code: "" });
    },
    removeRow: function(i) {
      this.items.splice(i, 1);
    },
    getCampuslink() {
      this.$store.dispatch("campuslink/getCampuslink");
    }
  },
  beforeMount() {
    this.getCampuslink();
  },
  computed: {
    programs() {
      return this.$store.state.campuslink.getCampuslink.data;
    }
  },
  watch: {
    programs: {
      immediate: true,
      handler() {
        this.items = this.programs.map(program => {
          return {
            campuslink_program: program.name,
            code: program.code
          };
        });
      }
    }
  }
};
</script>
    
