import {Power0} from 'gsap'

export type Animations = {
    [key: string]: Array<any>
}

export const animations: Animations = {
    cloud: [
        {delay: 0, duration: 0.05, from: {x: 0, ease: Power0.easeNone}},
        {
            prop: 'scale',
            delay: 0,
            duration: 0.05,
            to: {x: 1.2, y: 1.2, ease: Power0.easeNone}
        },
        {
            delay: 0.04,
            duration: 0.1,
            to: {alpha: 0, ease: Power0.easeNone}
        },
        {
            delay: 0.06,
            duration: 0.1,
            to: {rotation: -1, ease: Power0.easeNone}
        }
    ],
}