export const CandidateStatusMixin = {
    methods: {
        /**
     *
     */
        candidateStatusColor(name) {
            let result = "-";
            switch (name) {
                case "Cancelled":
                    result += "warning";
                    break;
                case "Drop-Out":
                    result += "danger";
                    break;
                case "Passed":
                    result += "success";
                    break;
                default:
                    // Active
                    result += "primary";
            }
            return result;
        },
    }
}