<template>
  <div
    class="popover bg-gray-100 z-50 shadow-md p-2 rounded"
    :class="{ [direction]: true, hidden: !visible, block: visible }"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'bottom'
    }
  },
  data() {
    return {
      visible: false,
      width: 0,
      height: 0,
      parent: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    }
  },

  watch: {
    visible() {
      setTimeout(() => {
        this.width = this.$el.clientWidth
        this.height = this.$el.clientHeight
        this.parent = this.$el.parentElement.getBoundingClientRect()
      })
    }
  },
  mounted() {
    this.$el.parentElement.addEventListener('mouseover', this.showPopover.bind(this))
    this.$el.parentElement.addEventListener('mouseleave', this.hidePopover.bind(this))
  },
  destroyed() {
    this.$el.parentElement.removeEventListener('mouseover', this.showPopover.bind(this))
    this.$el.parentElement.removeEventListener('mouseleave', this.hidePopover.bind(this))
  },
  computed: {
    style() {
      const centerX = (this.width / 2) * -1
      const centerY = (this.height / 2) * -1

      switch (this.direction) {
        case 'bottom':
          return {
            top: this.parent.y + this.parent.height + 10 + 'px',
            left: this.parent.x + centerX + this.parent.width / 2 + 'px'
          }
        case 'right':
          return {
            top: this.parent.y + centerY + this.parent.height / 2 + 'px',
            left: this.parent.x + this.parent.width + 10 + 'px'
          }
        default: {
          return {}
        }
      }
    }
  },
  methods: {
    showPopover() {
      this.visible = true
    },
    hidePopover() {
      this.visible = false
    }
  }
}
</script>

<style>
.popover {
  position: fixed;
}

.popover:before {
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  content: '';
}

.popover.bottom:before {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  top: -6px;
  left: calc(50% - 6px);
  filter: drop-shadow(0px -2px 2px rgba(52, 73, 94, 0.1));
}

.popover.top:before {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #fff;
  bottom: -6px;
  left: calc(50% - 6px);
  filter: drop-shadow(0px 2px 2px rgba(52, 73, 94, 0.1));
}

.popover.left:before {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #fff;
  right: -6px;
  top: calc(50% - 6px);
  filter: drop-shadow(2px 0px 2px rgba(52, 73, 94, 0.1));
}

.popover.right:before {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #fff;
  left: -6px;
  top: calc(50% - 6px);
  filter: drop-shadow(-2px 0px 2px rgba(52, 73, 94, 0.1));
}
</style>
