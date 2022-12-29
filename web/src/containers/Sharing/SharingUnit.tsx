/**
 * @author zhengji.su
 * @description ShareUnit
 */

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid"
import BlogCard, { DESCRIPTION, EXPANDED } from "containers/Sharing/components/SharingCard";
import { blogList } from "./constants"
import { Variant, VariantContent } from "components/Variant";
import SharingRoot from "containers/Sharing/components/SharingRoot";
import CreativeGrid from "public/images/backdrop/creative-grid.jpeg";
import { stiffnessVariants } from "utils/variants";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    transition: 'all .3s'
  }
}))

function SharingUnit() {
  const classes = useStyles()

  return (
    <SharingRoot backdrop={CreativeGrid}>
      <Variant>
        <Grid container spacing={3} py={3}>
          {blogList.map(blog => (
            <Grid
              key={blog.id}
              item
              spacing={2}
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              display="flex"
              justifyContent="center"
              className={classes.gridItem}
            >
              <VariantContent>
                <VariantContent variants={stiffnessVariants}>
                  <BlogCard title={blog.title} date="2022.11.06" actions>
                    <Box slot={DESCRIPTION}>
                      <Typography>{blog.description}</Typography>
                    </Box>
                    <Box slot={EXPANDED}>
                      <Typography>
                        {blog.content}
                      </Typography>
                    </Box>
                  </BlogCard>
                </VariantContent>
              </VariantContent>
            </Grid>
          ))}
        </Grid>
      </Variant>
    </SharingRoot>
  )
}

export default SharingUnit
