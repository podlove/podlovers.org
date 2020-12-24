<template>
  <svg
    xmlns:x="http://ns.adobe.com/Extensibility/1.0/"
    xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/"
    xmlns:graph="http://ns.adobe.com/Graphs/1.0/"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 125"
    style="enable-background: new 0 0 100 100"
    xml:space="preserve"
    :width="size"
    :height="size"
  >
    <switch>
      <foreignObject
        requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
        x="0"
        y="0"
        width="1"
        height="1"
      />
      <g i:extraneous="self">
        <g>
          <path
            :fill="color"
            d="M88.3,10.3H11.7c-5.1,0-9.2,4.1-9.2,9.2v44.6c0,5.1,4.1,9.2,9.2,9.2h24l7.4,12.5c1.5,2.5,4,3.9,6.9,3.9s5.4-1.5,6.9-3.9     l7.4-12.5h24c5.1,0,9.2-4.1,9.2-9.2V19.5C97.5,14.4,93.4,10.3,88.3,10.3z M89.6,64.1c0,0.7-0.6,1.3-1.3,1.3H62.1     c-1.4,0-2.7,0.7-3.4,1.9l-8.5,14.4c0,0.1-0.2,0.1-0.3,0l-8.5-14.4c-0.7-1.2-2-1.9-3.4-1.9H11.7c-0.7,0-1.3-0.6-1.3-1.3V19.5     c0-0.7,0.6-1.3,1.3-1.3h76.6c0.7,0,1.3,0.6,1.3,1.3V64.1z"
          />
          <path
            :fill="color"
            d="M31.8,35.2h-7.9c-1.5,0-2.7,1.2-2.7,2.7v7.9c0,1.5,1.2,2.7,2.7,2.7h7.9c1.5,0,2.7-1.2,2.7-2.7v-7.9     C34.5,36.4,33.3,35.2,31.8,35.2z"
          />
          <path
            :fill="color"
            d="M53.9,35.2h-7.9c-1.5,0-2.7,1.2-2.7,2.7v7.9c0,1.5,1.2,2.7,2.7,2.7h7.9c1.5,0,2.7-1.2,2.7-2.7v-7.9     C56.6,36.4,55.4,35.2,53.9,35.2z"
          />
          <path
            :fill="color"
            d="M76.1,35.2h-7.9c-1.5,0-2.7,1.2-2.7,2.7v7.9c0,1.5,1.2,2.7,2.7,2.7h7.9c1.5,0,2.7-1.2,2.7-2.7v-7.9     C78.8,36.4,77.6,35.2,76.1,35.2z"
          />
        </g>
      </g>
    </switch>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

<style></style>
