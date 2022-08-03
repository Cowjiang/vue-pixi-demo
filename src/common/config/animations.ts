import {Power0} from 'gsap'

export type Animations = {
    [key: string]: Array<any>
}

export const animations: Animations = {
    'scene1-1': [{
        delay: 0.3,
        duration: 0.1,
        to: {y: 30, ease: Power0.easeNone, yoyo: true, repeat: -1}
    }],
    'scene1-2': [{
        delay: 0.42,
        duration: 0.1,
        from: {alpha: 0, ease: Power0.easeNone}
    }],
    'scene1-3': [{
        delay: 0.85,
        duration: 0.15,
        from: {y: -600, ease: Power0.easeNone}
    }],
    'scene1-4': [{
        delay: 0.95,
        duration: 0.1,
        from: {alpha: 0, ease: Power0.easeNone}
    }]
}