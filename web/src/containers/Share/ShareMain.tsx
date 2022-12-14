/**
 * @author zhengji.su
 * @description ShareMain
 */

import Box from "@mui/material/Box"
import CreativeLines from "public/images/backdrop/creative-lines.jpeg"
import ShareRoot from "containers/Share/components/ShareRoot";
import useSwitchCatalog from "containers/Share/hooks/useSwitchCatalog";
import SidesSwiper from "components/Swiper/SidesSwiper";
import { blogList } from "containers/Share/constants";
import { Theme, useMediaQuery } from "@mui/material";

function ShareMain() {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const { checkedMenu } = useSwitchCatalog()

  console.log(checkedMenu, 2212);

  return (
    <ShareRoot backdrop={CreativeLines}>
      <Box mb={8}>
        <SidesSwiper blogs={blogList} mt={3} title="React" triggerScroll={mdUp} />
        <SidesSwiper blogs={blogList} mt={3} title="Vue" triggerScroll={mdUp} />
        <SidesSwiper blogs={blogList} mt={3} title="Angular" triggerScroll={mdUp} />
      </Box>
    </ShareRoot>
  )
}

export default ShareMain
