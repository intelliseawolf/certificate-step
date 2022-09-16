<template>
  <div ref="myResizable" class="resizable">
    <slot></slot>
  </div>
</template>

<script>
import interact from 'interactjs'

export default {
  name: 'Resizable',
  props: {
    data: Object
  },
  data() {
    return {
      screenX: this.data.x || 0,
      screenY: this.data.y || 0
    }
  },
  mounted() {
    const myResizable = this.$refs.myResizable
    this.screenX = this.data.x || 0
    this.screenY = this.data.y || 0
    this.initInteract(myResizable)
  },
  methods: {
    initInteract(selector) {
      const el = this;
      interact(selector).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: 'parent',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        onstart: this.onDragStart,
        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move (event) {
            console.log('moving')
            var target = event.target
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            var y = (parseFloat(target.getAttribute('data-y')) || 0)

            // update the element's style
            target.style.width = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'

            // translate when resizing from top or left edges
            x += event.deltaRect.left
            y += event.deltaRect.top

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
            el.$emit('onResize', {
              width: event.rect.width,
              height: event.rect.height,
            })
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 }
          })
        ],

        inertia: true
      })
      this.translate(selector, this.screenX, this.screenY)
    },
    dragMoveListener(event) {
      const target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x =
          (parseFloat(target.getAttribute('data-x')) || this.screenX) +
          event.dx,
        y =
          (parseFloat(target.getAttribute('data-y')) || this.screenY) +
          event.dy

      this.translate(target, x, y)
      this.$emit('onDragMove', {x, y})
    },
    translate(target, x, y) {
      // translate the element
      target.style.webkitTransform = target.style.transform =
        `translate(${x}px, ${y}px)`

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    },
    onDragStart() {
      this.$emit('startDrag')
    },
    onDragEnd(event) {
      const target = event.target
      this.screenX = target.getBoundingClientRect().left
      this.screenY = target.getBoundingClientRect().top
      this.$emit('endDrag')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resizable {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
