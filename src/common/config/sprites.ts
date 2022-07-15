import {Sprite} from "pixi.js";

export type SpriteOption = {
    [key: string]: any
}

export type Sprites = {
    [key: string]: Sprite
}

export const spritesOptions: SpriteOption[] = [
    {
        bg: {
            position: {x: 0, y: 0}
        },
        cloud: {
            position: {x: -300, y: 0},
            anchor: {x: 0.2, y: 0.2},
        }
    }
]