/**
 * @author zhengji.su
 * @description VariantContent
 */

import { motion, MotionProps } from "framer-motion";
import { contentVariants } from "@/src/utils/variants";
import type { ReactNode } from "react";
import clsx from "clsx";
import {makeStyles} from "@mui/styles";

interface VariantContentProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%'
  }
})

export default function VariantContent({ className, ...other }: VariantContentProps) {
  const classes = useStyles()

  return (
    <motion.div variants={contentVariants} className={clsx(className, classes.root)} {...other}/>
  )
}
