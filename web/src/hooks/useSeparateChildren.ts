
import { useMemo, ReactElement, ReactNode } from "react";
import { separateChildren } from "@/src/utils";

const useSeparateChildren = <T extends string>(children: ReactNode | ReactElement[], slots: T[]) => {
  return useMemo(() => separateChildren<T>(children, slots), [children, slots])
}

export default useSeparateChildren
