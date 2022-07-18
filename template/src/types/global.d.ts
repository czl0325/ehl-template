import { defineComponent } from "vue"

declare global {
  declare const AMapUI: any
  declare const defineOptions: typeof defineComponent
}
