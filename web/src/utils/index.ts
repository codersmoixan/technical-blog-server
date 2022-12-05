import indexOf from "lodash/indexOf";
import union from "lodash/union";
import without from "lodash/without";

export function timeSleep(wait: number = 300) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, wait)
  })
}

export const toggleExist = <T extends any>(a: T[], b: T) => (indexOf(a, b) === -1 ? union(a, [b]) : without(a, b));
