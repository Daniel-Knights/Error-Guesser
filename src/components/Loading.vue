<template>
  <div class="loading" aria-label="Loading...">
    <div class="loading-container">
      <svg
        id="svg8"
        viewBox="0 0 2.6458333 12.775572"
        height="12.775572mm"
        width="2.6458333mm"
        v-for="(svg, i) in 3"
        :key="i"
      >
        <defs id="defs2" />
        <g
          id="layer1"
          transform="matrix(0.15139838,0,0,0.27017607,-0.3217594,-0.74551272)"
        >
          <g transform="matrix(0.10290055,0,0,0.10290055,-12.034225,2.7593588)" id="g58">
            <path
              style="stroke-width: 1.33935"
              id="path56"
              :fill="i % 2 === 0 ? '#fff' : '#000'"
              d="M 300.72272,7.2652499 C 296.00645,2.4271081 290.33518,0 283.70217,0 H 161.33018 c -6.62774,0 -12.29643,2.4271081 -17.01516,7.2652499 -4.71643,4.8448361 -6.94658,10.5844401 -6.69196,17.2121041 l 10.70499,293.697476 c 0.25438,6.62764 2.86508,12.37125 7.8384,17.20807 4.97081,4.85018 10.77072,7.27465 17.40098,7.27465 h 97.91077 c 6.61967,0 12.41814,-2.42447 17.40098,-7.27465 4.96942,-4.83546 7.57198,-10.57907 7.83854,-17.20807 l 10.6983,-293.697476 c 0.26519,-6.627664 -1.97573,-12.361905 -6.6933,-17.2121041 z"
            />
            <path
              style="stroke-width: 1.10646"
              id="path54"
              :fill="i % 2 !== 0 ? '#fff' : '#000'"
              d="m 271.46884,367.67019 h -97.90267 c -6.63049,0 -12.36742,1.65537 -17.21357,4.95871 -4.84212,3.30611 -7.26519,7.21824 -7.26519,11.74279 v 58.45607 c 0,4.52272 2.42307,8.4385 7.26519,11.74918 4.85019,3.2997 10.58182,4.95508 17.21357,4.95508 h 97.91072 c 6.61958,0 12.35923,-1.65538 17.20938,-4.95508 4.83549,-3.30975 7.25992,-7.22554 7.25992,-11.74918 v -58.45607 c 0,-4.52365 -2.42845,-8.43575 -7.26925,-11.74279 -4.84483,-3.3061 -10.58448,-4.95871 -17.2081,-4.95871 z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../css/mixins';

.loading {
  @include flex-x(center, center);
  position: absolute;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, var(--orange), var(--rose));
}

svg {
  margin: 5px;
  transform: scale3d(1, 0.8, 1);
  animation: loading 1.1s infinite cubic-bezier(0.215, 0.61, 0.355, 1);

  @for $i from 1 through 3 {
    &:nth-of-type(#{$i}) {
      animation-delay: #{$i / 5}s;
    }
  }

  @keyframes loading {
    0%,
    100%,
    30% {
      transform: scale3d(1, 0.8, 1);
    }
    40% {
      transform: scale3d(0.9, 1.1, 1);
    }
    48% {
      transform: scale3d(1, 0.9, 1);
    }
    56% {
      transform: scale3d(0.95, 1.05, 1);
    }
    64% {
      transform: scale3d(0.98, 1.02, 1);
    }
    75% {
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
