import {Container} from 'pixi.js'

export type Scenes = {
  [key: string]: Container
}

const sceneWidth = [4843, 4386]

const xValue = (index: number): number => sceneWidth.slice(0, index).reduce((prev, cur) => prev + cur)
const yValue = 640

export const scenesOptions = [
  {
    name: 'scene1',
    x: 0,
    width: sceneWidth[0],
    height: yValue
  },
  {
    name: 'scene2',
    x: xValue(1),
    width: sceneWidth[1],
    height: yValue
  },
]