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
import {useGetCategoriesQuery} from "containers/Share/queries";
import useShare from "containers/Share/hooks/useShare";

function ShareMain() {
  const { checkedMenu } = useSwitchCatalog()
  const { data } = useGetCategoriesQuery()
  const { blogs } = useShare()

  console.log(checkedMenu, 2212, blogs);

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
