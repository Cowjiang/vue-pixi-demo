import {Power0, Power1, Power2, Power3, Power4} from 'gsap'
import TweenVars = gsap.TweenVars

export type AnimationConfig = {
  startAt?: number
  endAt?: number
  delay?: number
  duration?: number
  prop?: string
  from?: TweenVars
  to?: TweenVars
  autoPlay?: boolean
}

const offset = 0 //偏移值

export const animations: { [key: string]: Array<AnimationConfig> } = {
  'scene1-3': [{
    startAt: 1 + offset,
    endAt: 1000 + offset,
    from: {y: 50, ease: Power1.easeInOut}
  }, {
    startAt: 1 + offset,
    endAt: 1000 + offset,
    from: {x: 100, ease: Power0.easeNone}
  }],
  'scene1-2-1': [{
    startAt: 1 + offset,
    endAt: 2000 + offset,
    to: {x: 500, ease: Power0.easeNone}
  }],
  'scene1-4': [{
    startAt: 400 + offset,
    endAt: 900 + offset,
    from: {y: 440, ease: Power1.easeInOut}
  }, {
    startAt: 500 + offset,
    endAt: 1000 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-5-2': [{
    startAt: 1 + offset,
    endAt: 500 + offset,
    from: {y: 159, ease: Power1.easeInOut}
  }, {
    startAt: 1 + offset,
    endAt: 500 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-5-3': [{
    startAt: 200 + offset,
    endAt: 700 + offset,
    from: {y: 116, ease: Power1.easeInOut}
  }, {
    startAt: 200 + offset,
    endAt: 700 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-5-4': [{
    startAt: 400 + offset,
    endAt: 900 + offset,
    from: {y: 132, ease: Power1.easeInOut}
  }, {
    startAt: 400 + offset,
    endAt: 900 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-6': [{
    startAt: 300 + offset,
    endAt: 3000 + offset,
    from: {x: 1550, ease: Power0.easeNone}
  }],
  'scene1-7': [{
    startAt: 500 + offset,
    endAt: 2500 + offset,
    from: {x: 1220, ease: Power0.easeNone}
  }],
  'scene1-9': [{
    startAt: 1000 + offset,
    endAt: 3500 + offset,
    from: {x: 2500, ease: Power0.easeNone}
  }],
  'scene1-14': [{
    startAt: 1000 + offset,
    endAt: 3500 + offset,
    from: {x: 3031, ease: Power0.easeNone}
  }],
  'scene1-2-2': [{
    startAt: 1000 + offset,
    endAt: 4000 + offset,
    to: {x: 2200, ease: Power0.easeNone}
  }],
  'scene1-10': [{
    startAt: 1300 + offset,
    endAt: 1700 + offset,
    from: {y: 354, ease: Power1.easeInOut}
  }, {
    startAt: 1300 + offset,
    endAt: 1700 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-12': [{
    startAt: 1600 + offset,
    endAt: 2100 + offset,
    from: {y: 66, ease: Power1.easeInOut}
  }, {
    startAt: 1600 + offset,
    endAt: 2100 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-19': [{
    startAt: 2000 + offset,
    endAt: 4500 + offset,
    to: {x: 2862, ease: Power0.easeNone}
  }],
  'scene1-20': [{
    startAt: 2000 + offset,
    endAt: 4500 + offset,
    to: {x: 3058, ease: Power0.easeNone}
  }],
  'scene1-21': [{
    startAt: 2000 + offset,
    endAt: 4500 + offset,
    to: {x: 2796, ease: Power0.easeNone}
  }],
  'scene1-22': [{
    startAt: 2900 + offset,
    endAt: 3400 + offset,
    from: {y: 183, ease: Power1.easeInOut}
  }, {
    startAt: 2900 + offset,
    endAt: 3400 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-23': [{
    startAt: 3500 + offset,
    endAt: 4000 + offset,
    from: {y: 353, ease: Power1.easeInOut}
  }, {
    startAt: 3500 + offset,
    endAt: 4000 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
  'scene1-2-3': [{
    startAt: 2000 + offset,
    endAt: 5000 + offset,
    to: {x: 3450, ease: Power0.easeNone}
  }],
  'scene1-17': [{
    duration: 1,
    from: {alpha: 0, ease: Power1.easeInOut, yoyo: true, repeat: -1},
    autoPlay: true
  }],
  'scene1-25': [{
    startAt: 3000 + offset,
    endAt: 5000 + offset,
    to: {x: 4245, ease: Power0.easeNone}
  }],
  'scene2-1': [{
    startAt: 4300 + offset,
    endAt: 4800 + offset,
    prop: 'scale',
    from: {x: 1.2, y: 1.2, ease: Power1.easeInOut}
  }, {
    startAt: 4300 + offset,
    endAt: 4800 + offset,
    from: {x: 69 - 302 * 0.1, ease: Power1.easeInOut}
  }, {
    startAt: 4300 + offset,
    endAt: 4800 + offset,
    from: {y: 26 - 599 * 0.1, ease: Power1.easeInOut}
  }, {
    startAt: 4300 + offset,
    endAt: 4800 + offset,
    from: {alpha: 0, ease: Power1.easeInOut}
  }],
}