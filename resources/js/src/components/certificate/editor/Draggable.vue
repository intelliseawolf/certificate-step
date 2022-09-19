<template>
  <div ref="myDraggable" class="draggable">
    <slot></slot>
  </div>
</template>

<script>
import interact from "interactjs";

export default {
  name: "Draggable",
  props: {
    data: Object,
  },
  data() {
    return {
      screenX: this.data.x || 0,
      screenY: this.data.y || 0,
    };
  },
  mounted() {
    const myDraggable = this.$refs.myDraggable;
    this.screenX = this.data.x || 0;
    this.screenY = this.data.y || 0;
    this.initInteract(myDraggable);
  },
  methods: {
    initInteract(selector) {
      interact(selector).draggable({
        inertia: true,
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        },
        autoScroll: true,

        onstart: this.onDragStart,
        onmove: this.dragMoveListener,
        onend: this.onDragEnd,
      });
      this.translate(selector, this.screenX, this.screenY);
    },
    dragMoveListener(event) {
      const target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x =
          (parseFloat(target.getAttribute("data-x")) || this.screenX) +
          event.dx,
        y =
          (parseFloat(target.getAttribute("data-y")) || this.screenY) +
          event.dy;

      this.translate(target, x, y);
      this.$emit("onDragMove", { x, y });
    },
    translate(target, x, y) {
      target.style.webkitTransform =
        target.style.transform = `translate(${x}px, ${y}px)`;

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    onDragStart() {
      this.$emit("startDrag");
    },
    onDragEnd(event) {
      const target = event.target;
      this.screenX = target.getBoundingClientRect().left;
      this.screenY = target.getBoundingClientRect().top;
      this.$emit("endDrag");
    },
  },
  watch: {
    data(newVal) {
      if (newVal.x && newVal.y) {
        this.translate(this.$refs.myDraggable, newVal.x, newVal.y);
      }
    },
  },
};
</script>

<style scoped>
.draggable {
  border: 1px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
