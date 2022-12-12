/**
 * @author zhengji.su
 * @description ShareMain
 */

import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box"
import CreativeLines from "public/images/backdrop/creative-lines.jpeg"
import ShareRoot from "containers/Share/components/ShareRoot";
import useSwitchCatalog from "containers/Share/hooks/useSwitchCatalog";
import Typography from "@mui/material/Typography";
import CardSwiper from "containers/Share/components/CardSwiper";
import { blogList } from "containers/Share/constants";

function ShareMain() {
  const [value, setValue] = useState('')
  const { checkedMenu } = useSwitchCatalog()

  useEffect(() => {
    setValue('ShareMain')
  }, [])

  console.log(checkedMenu, 2212);

  return (
    <ShareRoot backdrop={CreativeLines}>
      <Box mt={3} mb={8}>
        <Typography variant="h3" fontWeight={400}>React</Typography>
        <CardSwiper blogs={blogList} />
      </Box>
    </ShareRoot>
  )
}

export default ShareMain
