/**
 * @author zhengji.su
 * @description Variant
 */

import { ReactNode, useEffect, useState } from "react";
import { motion, MotionProps } from "framer-motion";

interface VariantProps extends MotionProps{
  focus: boolean;
  children: ReactNode
}

function Variant({ focus: propFocus, ...other }: VariantProps) {
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    setFocus(propFocus)
  }, [propFocus])

  return <motion.div initial={false} animate={focus ? 'open' : 'closed'} {...other} />
}

export default Variant
