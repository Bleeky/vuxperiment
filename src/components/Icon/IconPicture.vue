<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 563 795"
    >
      <defs>
        <linearGradient
          id="linearGradient-3"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop
            stop-color="#6380A6"
            offset="0%"
          />
          <stop
            stop-color="#F1F5F9"
            offset="100%"
          />
        </linearGradient>
        <linearGradient
          id="linearGradient-4"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop
            stop-color="#2A4365"
            offset="0%"
          />
          <stop
            stop-color="#6388A7"
            offset="100%"
          />
        </linearGradient>
        <rect
          id="path-1"
          x="0"
          y="0"
          width="563"
          height="795"
          rx="30"
        />
      </defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Group">
          <mask
            id="mask-2"
            fill="#fff"
          >
            <use xlink:href="#path-1" />
          </mask>
          <use
            id="Rectangle"
            fill="#EDF7FF"
            xlink:href="#path-1"
          />
          <path
            id="Combined-Shape"
            d="M109.808 579.51L249 718.515V795H1V627.482l48.037-47.973c16.788-16.765 43.983-16.765 60.77 0z"
            fill="url(#linearGradient-3)"
            mask="url(#mask-2)"
          />
          <path
            id="Combined-Shape"
            d="M473.362 475.797l.088.088 89.55 89.65V787a8 8 0 01-8 8H8a8 8 0 01-7.228-4.566l314.198-314.55c43.714-43.762 114.629-43.802 158.392-.087z"
            fill="url(#linearGradient-4)"
            mask="url(#mask-2)"
          />
          <circle
            id="Oval"
            fill="#2A4365"
            fill-rule="nonzero"
            mask="url(#mask-2)"
            cx="172.52"
            cy="230.52"
            r="47.52"
          />
        </g>
      </g>
    </svg>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'IconPicture',
};
</script>

<style lang="scss" scoped>

</style>
