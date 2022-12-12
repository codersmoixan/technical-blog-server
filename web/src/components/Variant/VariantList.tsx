import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactNode } from "react";
import clsx from "clsx";
import {makeStyles} from "@mui/styles";

interface CustomVariants {
  container: Variants;
  item: Variants
}

interface VariantListProps {
  list: any[];
  children: (item: any) => ReactNode;
  variants?: CustomVariants;
  className?: string;
}

const customVariants: CustomVariants = {
  container: {
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  },
  item: {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  },
};

const useStyles = makeStyles({
  root: {
    '& li': {
      listStyle: 'none'
    }
  }
})

function VariantList({ list, children, className, variants = customVariants }: VariantListProps) {
  const classes = useStyles()

  return (
    <motion.ul
      variants={variants.container}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: true }}
      className={clsx(className, classes.root)}
    >
      <AnimatePresence exitBeforeEnter>
        {list?.map((item, i) => (
          <motion.li custom={i} key={item.id} variants={variants.item}>
            {children(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default VariantList
