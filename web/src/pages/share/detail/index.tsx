/**
 * @author zhengji.su
 * @description ShareDetail
 */

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';

function ShareDetail() {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue('Index')
  }, [])

  return (
    <Box>
      {value}
    </Box>
  )
}

export default ShareDetail
