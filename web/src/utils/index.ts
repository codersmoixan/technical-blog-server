import indexOf from "lodash/indexOf";
import union from "lodash/union";
import without from "lodash/without";
import isEqual from "lodash/isEqual";
import isArray from "lodash/isArray";
import type { EmptyObject } from "@/src/tb.types";
import type { ReactElement, ReactNode } from "react";

export function timeSleep(wait: number = 300) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, wait)
  })
}

export const toggleExist = <T extends any>(a: T[], b: T) => (indexOf(a, b) === -1 ? union(a, [b]) : without(a, b));

export const deepEqual = <T>(aDeps: T, bDeps: T) => isEqual(aDeps, bDeps);

export const findChildNode = (nodes: ReactElement[], key: string) => nodes.find((node: ReactElement) => node.props.slot === key) ?? null

export const separateChildren = <T extends string>(children: ReactElement[] | ReactNode, slots: T[]) => {
  let slotsChild: any = {}

  if (isArray(children)) {
    slots.forEach((slot: string) => {
      slotsChild[slot] = findChildNode(children, slot)
    })
  } else {
    slotsChild[slots[0]] = children ?? null
  }

  return slotsChild as EmptyObject<T, ReactElement>
}
