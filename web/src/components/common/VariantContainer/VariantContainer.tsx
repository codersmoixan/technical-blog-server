/**
 * @author zhengji.su
 * @description VariantContainer
 */

import { motion, MotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface VariantContainerProps extends MotionProps{
  focus: boolean;
  children: ReactNode
}

function VariantContainer({ focus, ...other }: VariantContainerProps) {
  return <motion.div initial={false} animate={focus ? 'open' : 'closed'} {...other} />
}

export default VariantContainer
