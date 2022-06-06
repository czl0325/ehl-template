<template>
  <router-link :to="to" :target="to.indexOf('bigscreen') !== -1 ? '_blank' : '_self'">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Link",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isExternal = (path: string) => {
      return /^(https?:|mailto:|tel:)/.test(path)
    }
    const linkProps = (to: string) => {
      return {
        to: to,
        target: to.indexOf("bigscreen") !== -1 ? "_blank" : "_self"
      }
    }
    return {
      type: "router-link",
      linkProps
    }
  }
})
</script>
