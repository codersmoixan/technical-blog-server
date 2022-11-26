/**
 * @author zhengji.su
 * @description Variant
 */

import { motion, MotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface VariantProps extends MotionProps{
  focus: boolean;
  children: ReactNode
}

function Variant({ focus, ...other }: VariantProps) {
  return <motion.div initial={false} animate={focus ? 'open' : 'closed'} {...other} />
}

export default Variant
