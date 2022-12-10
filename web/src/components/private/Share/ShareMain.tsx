/**
 * @author zhengji.su
 * @description ShareMain
 */

import React, { useState, useEffect } from 'react'
import CreativeLines from "public/images/backdrop/creative-lines.jpeg"
import ShareRoot from "components/private/Share/components/ShareRoot";
import useCatalogMenu from "components/private/Share/hooks/useCatalogMenu";

function ShareMain() {
  const [value, setValue] = useState('')
  const { checkedMenu } = useCatalogMenu()

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
