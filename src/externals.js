export const Popover = () =>
  process.isClient
    ? import('vue-js-popover').then((mod) => mod.default)
    : Promise.resolve({
        install(Vue) {
          Vue.component('Popover', { render: () => '' })
          Vue.directive('popover', {})
        }
      })
export const Icon = () => import('@podlove/components/icons').catch()
export const PlayButton = () => import('@podlove/components/play-button').catch()
export const ProgressBar = () => import('@podlove/components/progress-bar').catch()
export const StepperButton = () => import('@podlove/components/stepper-button').catch()
export const ChapterButton = () => import('@podlove/components/chapter-button').catch()
export const InputSlider = () => import('@podlove/components/input-slider').catch()
export const Timer = () => import('@podlove/components/timer').catch()
export const ChapterProgress = () => import('@podlove/components/chapter-progress').catch()
export const DoughnutChart = () => import('vue-doughnut-chart').catch()
