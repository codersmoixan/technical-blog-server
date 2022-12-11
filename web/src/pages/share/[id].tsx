/**
 * @author zhengji.su
 * @description Index
 */

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import ShareRoot from "containers/Share/components/ShareRoot";
import CreativeBleak from "public/images/backdrop/creative-bleak.jpeg"

function Index() {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue('Index')
  }, [])

  return (
    <ShareRoot backdrop={CreativeBleak}>
      {value}
    </ShareRoot>
  )
}

export default Index
