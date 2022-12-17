/**
 * @author zhengji.su
 * @description ShareMain
 */

import Box from "@mui/material/Box"
import CreativeLines from "public/images/backdrop/creative-lines.jpeg"
import ShareRoot from "containers/Share/components/ShareRoot";
import useSwitchCatalog from "containers/Share/hooks/useSwitchCatalog";
import { blogList } from "containers/Share/constants";
import ShareSwiper from "containers/Share/components/ShareSwiper";

function ShareMain() {
  const { checkedMenu } = useSwitchCatalog()

  console.log(checkedMenu, 2212);

  return (
    <ShareRoot backdrop={CreativeLines}>
      <Box mb={8}>
        <ShareSwiper blogs={blogList} title="React" />
        <ShareSwiper blogs={blogList} title="Vue" />
        <ShareSwiper blogs={blogList} title="Angular" />
      </Box>
    </ShareRoot>
  )
}

export default ShareMain
