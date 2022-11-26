/**
 * @author zhengji.su
 * @description VariantContainer
 */

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";
import clsx from "clsx";

interface VariantContainerProps {
  focus: boolean;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  }
}))

function VariantContainer({ focus, className }: VariantContainerProps) {
  const classes = useStyles()

  return (
    <motion.div initial={false} animate={focus ? 'open' : 'cosed'}>
      <motion.div className={clsx(classes.root, className)}>

      </motion.div>
    </motion.div>
  )
}

export default VariantContainer
