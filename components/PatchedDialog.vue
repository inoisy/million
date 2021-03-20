<script>
import { VDialog } from "vuetify/lib";

export default {
  extends: VDialog,
  watch: {
    isActive(val) {
      if (val) {
        this.show();
        // this.hideScroll();
      } else {
        this.removeOverlay();
        this.unbind();
        this.previousActiveElement?.focus();
      }
    },
  },
  methods: {
    hideScroll() {
      // this must be empty
    },
  },
};
</script>
