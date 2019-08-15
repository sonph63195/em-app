<template>
  <div>
    <Header />
    <main>
      <b-container>
        <b-row v-if="candidate">
          <b-col cols="12" class="mt-3">
            <b-card no-body class="border-0 p-3" style="background-color: #f4f8f9">
              <div class="d-md-flex align-items-center align-items-stretch">
                <div class="d-flex flex-fill">
                  <!-- <div class="avatar d-flex flex-column justify-content-center d-none">
                    <img src="../../assets/avatar_female.svg" class="w-100 h-100" alt />
                  </div>-->
                  <div class="candidate-name flex-1 d-flex flex-column align-self-center">
                    <div>
                      <h1 class="title h1">{{ candidate.name }}</h1>
                    </div>
                    <div class="d-flex">
                      <div>
                        <font-awesome-icon icon="poll" />
                        <span class="ml-2">{{ candidate.gpa }}/4.0</span>
                      </div>
                      <div class="ml-3">
                        <font-awesome-icon icon="paw" />
                        <span class="ml-2">{{ candidate.skill }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="align-self-center my-3 my-md-0"></div>
              </div>
              <div class="d-flex">
                <div class="flex-fill d-flex"></div>
                <div class="d-flex">
                  <div class="mr-3">
                    <div class="text-wrap">
                      <span class="text-muted">
                        <font-awesome-icon icon="envelope" />
                        <span class="ml-1">{{ candidate.account }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="mr-3">
                    <div class="text-wrap">
                      <span class="text-muted">
                        <font-awesome-icon icon="phone" />
                        <span class="ml-1">{{ candidate.phone }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="mr-0">
                    <div class="text-wrap">
                      <span class="text-muted">
                        <font-awesome-icon icon="graduation-cap" />
                        <span class="ml-1">{{ candidate.university }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>

          <b-col cols="12" class="mt-3">
            <b-card no-body class="border-0">
              <b-tabs pills card fill justified>
                <b-tab title="Information" @click="tabIndex=0" active>
                  <ul class="nav w-100">
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Name</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.name"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.name"
                          type="text"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">NationID</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.nationID"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.nationID"
                          type="text"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Gender</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.gender"
                        />
                        <b-form-select
                          class="col-sm-8 col-10"
                          v-model="currentCandidate.gender"
                          v-if="edited"
                          :options="genders"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">University</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.university"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.university"
                          type="text"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Email</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.account"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.account"
                          type="email"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Phone</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.phone"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.phone"
                          type="tel"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Birthday</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.dayOfBirth"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.dayOfBirth"
                          type="date"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Graduation Date</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.graduationDate"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.graduationDate"
                          type="date"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Full Time Working</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.fullTimeWorking"
                        />
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.fullTimeWorking"
                          type="number"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">Skill</span>
                        <span
                          class="flex-fill text-right text-muted"
                          v-if="!edited"
                          v-text="candidate.skill"
                        />
                        <b-form-select
                          class="col-sm-8"
                          v-model="currentCandidate.skill"
                          v-if="edited"
                          :options="skills"
                        />
                      </div>
                    </li>
                    <li class="nav-item w-100 mb-3">
                      <div class="d-flex">
                        <span class="col-sm-4">GPA</span>
                        <span class="flex-fill text-right text-muted" v-if="!edited">
                          <span
                            v-if="candidate.gpa>0"
                            class="flex-fill text-right text-muted"
                          >{{candidate.gpa}}/4.0</span>
                        </span>
                        <b-input
                          class="col-sm-8 col-10"
                          v-if="edited"
                          v-model="currentCandidate.gpa"
                          type="text"
                        />
                      </div>
                    </li>
                  </ul>
                </b-tab>
                <b-tab title="History" @click="++tabIndex">
                  <b-card-text>Note</b-card-text>
                </b-tab>
                <template slot="tabs-end">
                  <b-button
                    v-if="!edited && tabIndex==0"
                    variant="outline-warning"
                    @click="edited = true"
                    class="ml-3"
                  >Edit Profile</b-button>
                  <b-button
                    v-if="edited"
                    variant="success"
                    @click="edited = false"
                    class="ml-3"
                  >Save</b-button>
                </template>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<style scoped>
.title {
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>

<script>
import Header from "../header/Header";
import { CandidateStatusMixin } from "../mixins";

export default {
  components: {
    Header
  },
  mixins: [CandidateStatusMixin],
  data() {
    return {
      edited: false,
      info: true,
      tabIndex: 0,
      genders: [
        { value: null, text: "Other" },
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" }
      ],
      faculties: [{ value: "ict", text: "ICT" }],
      status: [
        { value: "active", text: "Active" },
        { value: "passed", text: "Passed" }
      ],
      skills: [
        { value: "java", text: "Java" },
        { value: ".Net", text: ".Net" },
        { value: "all", text: "All" }
      ],
      currentCandidate: null
    };
  },
  created() {
    let candidateId = this.$route.params.candidateId;
    this.getCandidateById(candidateId);
  },
  watch: {
    candidate: {
      handler() {
        this.$nextTick(() => {
          this.currentCandidate = this.candidate;
          console.log(this.currentCandidate);
        });
      }
    }
  },
  computed: {
    candidate() {
      return this.$store.state.candidate.candidate;
    }
  },
  methods: {
    getCandidateById(candidateId) {
      this.$store.dispatch("candidate/getCandidateById", candidateId);
    }
  }
};
</script>
