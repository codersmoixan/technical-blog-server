/**
 * @author zhengji.su
 * @description SharingMain
 */

import Box from "@mui/material/Box"
import CreativeLines from "public/images/backdrop/creative-lines.jpeg"
import SharingRoot from "containers/Sharing/components/SharingRoot";
import useSwitchCatalog from "containers/Sharing/hooks/useSwitchCatalog";
import { blogList } from "containers/Sharing/constants";
import SharingSwiper from "containers/Sharing/components/SharingSwiper";
import useSharing from "containers/Sharing/hooks/useSharing";

function SharingMain() {
  const { checkedMenu } = useSwitchCatalog()
  const { blogs } = useSharing()

  console.log(checkedMenu, 2212, blogs);

  return (
    <SharingRoot backdrop={CreativeLines}>
      <Box mb={8}>
        <SharingSwiper blogs={blogList} title="React" />
        <SharingSwiper blogs={blogList} title="Vue" />
        <SharingSwiper blogs={blogList} title="Angular" />
      </Box>
    </SharingRoot>
  )
}

export default SharingMain
