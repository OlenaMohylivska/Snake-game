import { TOP, BOTTOM, LEFT, RIGHT } from './types'

export const moveTop = () => {
  return {
    type: TOP
  }
}

export const moveBottom = () => {
  return {
    type: BOTTOM
  }
}

export const moveLeft = () => {
  return {
    type: LEFT
  }
}

export const moveRight = () => {
  return {
    type: RIGHT
  }
}