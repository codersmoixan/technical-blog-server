/**
 * @author zhengji.su
 * @description ShareMain
 */

import Box from "@mui/material/Box"
import CreativeLines from "public/images/backdrop/creative-lines.jpeg"
import ShareRoot from "containers/Share/components/ShareRoot";
import useSwitchCatalog from "containers/Share/hooks/useSwitchCatalog";
import CardSwiper from "containers/Share/components/CardSwiper";
import { blogList } from "containers/Share/constants";

function ShareMain() {
  const { checkedMenu } = useSwitchCatalog()

  console.log(checkedMenu, 2212);

  return (
    <ShareRoot backdrop={CreativeLines}>
      <Box mb={8}>
        <CardSwiper blogs={blogList} mt={3} title="React" />
        <CardSwiper blogs={blogList} mt={3} title="Vue" />
        <CardSwiper blogs={blogList} mt={3} title="Angular" />
      </Box>
    </ShareRoot>
  )
}

export default ShareMain
