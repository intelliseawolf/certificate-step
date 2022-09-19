<template>
  <div ref="myResizable" class="resizable">
    <slot></slot>
  </div>
</template>

<script>
import interact from "interactjs";

export default {
  name: "Resizable",
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
    const myResizable = this.$refs.myResizable;
    this.screenX = this.data.x || 0;
    this.screenY = this.data.y || 0;
    this.initInteract(myResizable);
  },
  methods: {
    initInteract(selector) {
      const el = this;
      interact(selector)
        .draggable({
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
        })
        .resizable({
          edges: { left: true, right: true, bottom: true, top: true },

          listeners: {
            move(event) {
              var target = event.target;
              var x = parseFloat(target.getAttribute("data-x")) || 0;
              var y = parseFloat(target.getAttribute("data-y")) || 0;

              target.style.width = event.rect.width + "px";
              target.style.height = event.rect.height + "px";

              x += event.deltaRect.left;
              y += event.deltaRect.top;

              target.style.transform = "translate(" + x + "px," + y + "px)";

              target.setAttribute("data-x", x);
              target.setAttribute("data-y", y);
              el.$emit("onResize", {
                width: event.rect.width,
                height: event.rect.height,
              });
            },
          },
          modifiers: [
            interact.modifiers.restrictEdges({
              outer: "parent",
            }),

            interact.modifiers.restrictSize({
              min: { width: 50, height: 50 },
            }),
          ],

          inertia: true,
        });
      this.translate(selector, this.screenX, this.screenY);
    },
    dragMoveListener(event) {
      const target = event.target,
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
};
</script>

<style scoped>
.resizable {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
