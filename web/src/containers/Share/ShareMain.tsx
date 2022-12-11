/**
 * @author zhengji.su
 * @description ShareMain
 */

import React, { useState, useEffect } from 'react'
import CreativeLines from "public/images/backdrop/creative-lines.jpeg"
import ShareRoot from "containers/Share/components/ShareRoot";
import useSwitchCatalog from "containers/Share/hooks/useSwitchCatalog";

function ShareMain() {
  const [value, setValue] = useState('')
  const { checkedMenu } = useSwitchCatalog()

  useEffect(() => {
    setValue('ShareMain')
  }, [])

  console.log(checkedMenu, 2212);

  return (
    <ShareRoot backdrop={CreativeLines}>
      666
    </ShareRoot>
  )
}

export default ShareMain
