<template>
  <svg viewBox="0 0 30 30">
    <defs>
      <linearGradient
        id="gradient-flying"
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
      >
        <stop
          class="flying"
          offset="0%"
        />
        <stop
          class="flying-2"
          offset="100%"
        />
      </linearGradient>
    </defs>
    <g
      fill="none"
      fill-rule="evenodd"
    >
      <rect
        fill="url(#gradient-flying)"
        width="30"
        height="30"
        rx="15"
      />
      <path
        d="M13.2357 22c2.19736 0 4.07856-1.22125 4.8552-2.95246.00948-.02114-3.11804.81279-3.0183.51798.04452-.13161 1.9617-.832 3.3585-1.6489.5352-.31302.92604-.80085 1.1725-1.4635-.9017.4378-1.58046.71222-2.0363.82329-1.3779.33573-2.5908.29957-2.5908.2646 0-.07565 2.01401-.45832 4.81328-2.16413.87777-.5349 1.43588-1.26304 1.67431-2.1844-.96506.57483-1.7393.95714-2.3227 1.14693-2.07527.6751-3.96906.87853-3.96906.78717 0-.19557 1.6666-.65388 3.4336-1.51007.91875-.44517 1.71442-1.02678 2.6365-1.67354C22.24823 11.23747 22.8341 10.25648 23 9c-.99205.63985-1.73013 1.06601-2.21425 1.2785-2.99646 1.31519-5.64232 2.00506-7.55006 2.15443C10.35594 12.6584 8 14.66764 8 17.2764 8 19.88518 10.3441 22 13.2357 22z"
        fill="#FFF"
      />
    </g>
  </svg>
</template>
