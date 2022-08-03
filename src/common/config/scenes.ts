import {Container} from 'pixi.js'

export type Scenes = {
    [key: string]: Container
}

export const scenesOptions = [
    {
        name: 'scene1',
        x: 0,
    },
]