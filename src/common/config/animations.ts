import {Power0} from 'gsap'
import TweenVars = gsap.TweenVars

export type AnimationConfig = {
    startAt?: number
    endAt?: number
    delay?: number
    duration?: number
    prop?: string
    from?: TweenVars
    to?: TweenVars
}

const offset = 0 //偏移值

export const animations: { [key: string]: Array<AnimationConfig> } = {
    'scene1-1': [{
        startAt: 1,
        endAt: 600,
        to: {y: 30, ease: Power0.easeNone, yoyo: true, repeat: -1}
    }],
    'scene1-2': [{
        startAt: 2500 + offset,
        endAt: 3000 + offset,
        from: {alpha: 0, ease: Power0.easeNone}
    }],
    'scene1-3': [{
        startAt: 3500 + offset,
        endAt: 4000 + offset,
        from: {alpha: 0, ease: Power0.easeNone}
    }],
    'scene1-4': [{
        startAt: 5280 + offset,
        endAt: 6211 + offset,
        from: {y: -600, ease: Power0.easeNone}
    }],
    'scene1-5': [{
        startAt: 6000 + offset,
        endAt: 6311 + offset,
        from: {alpha: 0, ease: Power0.easeNone}
    }]
}