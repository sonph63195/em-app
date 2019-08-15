export const PopupMixin = {
    methods: {
        showPopup(ref, id) {
            return this.$refs[ref].$bvModal.show(id);
        },
        hidePopup(ref, id) {
            return this.$refs[ref].$bvModal.hide(id);
        }
    }
}