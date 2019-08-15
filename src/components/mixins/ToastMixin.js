export const ToastMixin = {
    methods: {
        showToast(message, title = null, type = null) {
            this.$bvToast.toast(message, {
                title: `${title || 'Notification'}`,
                variant: `${type || 'primary'}`,
                solid: false
            });
        }
    }
}