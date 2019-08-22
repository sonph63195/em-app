export const CandidateStatusMixin = {
  methods: {
    /**
     *
     */
    candidateStatusColor(name) {
      let result = "-";
      switch (name) {
        case "Cancel":
          result += "warning";
          break;
        case "Drop-out":
          result += "danger";
          break;
        case "Passed":
          result += "success";
          break;
        case "Done":
          result += "info";
          break;
        case "Failed":
          result += "dark";
          break;
        default:
          // Active
          result += "primary";
      }
      return result;
    }
  }
};
