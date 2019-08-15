export const EventStatusMixin = {
    methods: {
        /**
         *
         */
        eventStatusColor(name) {
            let result = "badge-";
            switch (name) {
                case "Finish":
                    result += "warning";
                    break;
                case "Cancel":
                    result += "danger";
                    break;
                case "On-going":
                    result += "success";
                    break;
                default:
                    // Planning
                    result += "primary";
            }
            return result;
        },

        /**
     *
     */
        eventIsDoneOrCancel(status) {
            return status === "Cancel" || status === "Done";
        },
    }
}