<template>
  <div class="logo flex items-center flex-shrink-0 text-black">
    <svg
      width="50"
      height="50"
      viewBox="0 0 330 300"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter
          id="b"
          x="-6.5%"
          y="-13.5%"
          width="112.9%"
          height="127.1%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-30"
            dy="-2"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 0.847005208 0 0 0 0 0.0443515685 0 0 0 0 0.262020352 0 0 0 1 0"
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
          />
          <feOffset
            dx="8"
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
          />
          <feGaussianBlur
            stdDeviation="1.5"
            in="SourceAlpha"
            result="shadowBlurInner3"
          />
          <feOffset
            dx="-10"
            in="shadowBlurInner3"
            result="shadowOffsetInner3"
          />
          <feComposite
            in="shadowOffsetInner3"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner3"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 0.744197237 0 0 0 0 0.0275670623 0 0 0 0 0.223329452 0 0 0 1 0"
            in="shadowInnerInner3"
            result="shadowMatrixInner3"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
            <feMergeNode in="shadowMatrixInner3" />
          </feMerge>
        </filter>
        <filter
          id="d"
          x="-6.5%"
          y="-13.5%"
          width="112.9%"
          height="127.1%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-30"
            dy="11"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 0.894117647 0 0 0 0 0.91372549 0 0 0 0 0.937254902 0 0 0 1 0"
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
          />
          <feOffset
            dx="8"
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
          />
          <feGaussianBlur
            stdDeviation="1.5"
            in="SourceAlpha"
            result="shadowBlurInner3"
          />
          <feOffset
            dx="-10"
            dy="5"
            in="shadowBlurInner3"
            result="shadowOffsetInner3"
          />
          <feComposite
            in="shadowOffsetInner3"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner3"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 0.763682291 0 0 0 0 0.78005653 0 0 0 0 0.799705616 0 0 0 1 0"
            in="shadowInnerInner3"
            result="shadowMatrixInner3"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
            <feMergeNode in="shadowMatrixInner3" />
          </feMerge>
        </filter>
        <filter
          id="f"
          x="-15.5%"
          y="-15.5%"
          width="131%"
          height="131%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-11"
            dy="-8"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 0.908910779 0 0 0 0 0.908910779 0 0 0 0 0.908910779 0 0 0 1 0"
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
          />
          <feOffset
            dx="9"
            dy="7"
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <filter
          id="g"
          x="-14.7%"
          y="-15%"
          width="134.2%"
          height="145.1%"
          filterUnits="objectBoundingBox"
        >
          <feMorphology
            radius="3"
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          />
          <feOffset
            dx="2"
            dy="6"
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          />
          <feComposite
            in="shadowOffsetOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowOffsetOuter1"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 0.807843137 0 0 0 0 0.831372549 0 0 0 0 0.862745098 0 0 0 1 0"
            in="shadowOffsetOuter1"
          />
        </filter>
        <filter
          id="i"
          x="-22%"
          y="-22.5%"
          width="148.9%"
          height="160.1%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="-12"
            dy="-8"
            in="SourceAlpha"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 0.894117647 0 0 0 0 0.91372549 0 0 0 0 0.937254902 0 0 0 1 0"
            in="shadowInnerInner1"
            result="shadowMatrixInner1"
          />
          <feOffset
            dx="6"
            dy="4"
            in="SourceAlpha"
            result="shadowOffsetInner2"
          />
          <feComposite
            in="shadowOffsetInner2"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner2"
          />
          <feColorMatrix
            color-interpolation-filters="sRGB"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            in="shadowInnerInner2"
            result="shadowMatrixInner2"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixInner1" />
            <feMergeNode in="shadowMatrixInner2" />
          </feMerge>
        </filter>
        <path
          id="a"
          d="M279 133C279 59.546 216.544 0 139.5 0S0 59.546 0 133h279z"
        />
        <path
          id="c"
          d="M279 282.5c0-73.454-62.456-133-139.5-133S0 209.046 0 282.5h279z"
        />
        <ellipse
          id="h"
          cx="127.012"
          cy="43.512"
          rx="20.471"
          ry="19.971"
        />
        <circle
          id="e"
          cx="126.5"
          cy="43.5"
          r="43.5"
        />
      </defs>
      <g
        transform="translate(23 3)"
        fill="none"
        fill-rule="evenodd"
      >
        <ellipse
          fill="#D7E6EE"
          cx="139.5"
          cy="281"
          rx="127.5"
          ry="31"
        />
        <g class="ball">
          <g
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use
              fill="#F60A4A"
              xlink:href="#a"
            />
            <use
              fill="#000"
              filter="url(#b)"
              xlink:href="#a"
            />
            <use
              stroke="#25253F"
              stroke-width="6"
              xlink:href="#a"
            />
            <g transform="matrix(1 0 0 -1 0 432)">
              <use
                fill="#F5F5F5"
                xlink:href="#c"
              />
              <use
                fill="#000"
                filter="url(#d)"
                xlink:href="#c"
              />
              <use
                stroke="#25253F"
                stroke-width="6"
                xlink:href="#c"
              />
            </g>
          </g>
          <g transform="translate(13 98)">
            <use
              fill="#F5F5F5"
              xlink:href="#e"
            />
            <use
              fill="#000"
              filter="url(#f)"
              xlink:href="#e"
            />
            <use
              stroke="#25253F"
              stroke-width="16"
              xlink:href="#e"
            />
          </g>
          <g
            class="button"
            transform="translate(13 98)"
          >
            <use
              fill="#000"
              filter="url(#g)"
              xlink:href="#h"
            />
            <use
              fill="#F5F5F5"
              xlink:href="#h"
            />
            <use
              fill="#000"
              filter="url(#i)"
              xlink:href="#h"
            />
            <use
              stroke="#25253F"
              stroke-width="6"
              xlink:href="#h"
            />
          </g>
          <path
            d="M89 141.5H13"
            stroke="#25253F"
            stroke-width="23"
            stroke-linecap="square"
          />
          <path
            d="M266 141.5h-76"
            stroke="#25253F"
            stroke-width="22"
            stroke-linecap="square"
          />
          <g fill-opacity=".6">
            <path
              d="M36.972 94.333c7.39 8.209 19.827-12.825 40.554-31.487 20.727-18.663 47.677-23.578 40.286-31.787-7.391-8.208-37.913-5.145-58.64 13.517-20.726 18.662-29.591 41.549-22.2 49.757z"
              fill="#FFF"
            />
            <path
              d="M28.689 104.242a5.5 5.5 0 017.767.407l.887.986a4.137 4.137 0 01-.144 5.688 29.333 29.333 0 01-2.358 2.124 4.137 4.137 0 01-5.672-.452l-.888-.985a5.5 5.5 0 01.408-7.768z"
              fill="#F9F9F9"
            />
          </g>
        </g>
      </g>
    </svg>
    <span class="ml-2 font-semibold text-xl text-blue-900 dark:text-white tracking-tight">Pokelib</span>
  </div>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss" scoped>
.ball {
  animation: wobble 1s linear 4;
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.button {
  animation: flash 1s linear 4;
}


.logo:hover {
  .ball {
    animation: wobble 1s infinite linear;
    transform-box: fill-box;
    transform-origin: 50% 100%;
  }
  .button {
    animation: flash 1s infinite linear;
  }
}

@keyframes wobble {
  33% {
    transform: rotate(-5deg)
  }
  66% {
    transform: rotate(5deg)
  }
}

@keyframes flash {
  100% {
    fill: rgba(255, 0, 0, 0.4)
  }
}
</style>
