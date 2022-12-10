/**
 * @author zhengji.su
 * @description Variant
 */

import { useEffect, useState, ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import isUndefined from "lodash/isUndefined"

interface VariantProps extends MotionProps{
  focus?: boolean;
  children: ReactNode
}

function Variant({ focus: propFocus, ...other }: VariantProps) {
  const [focus, setFocus] = useState(false)

  useEffect(() => (isUndefined(propFocus) ? setFocus(true) : setFocus(propFocus)), [propFocus])

  return <motion.div initial={false} animate={focus ? 'open' : 'closed'} {...other} />
}

export default Variant
