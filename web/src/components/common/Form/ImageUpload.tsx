import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add"
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import isEmpty from "lodash/isEmpty";

interface ImageUploadProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  select: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    cursor: 'pointer',
    border: `1px solid ${theme.status.disabled}`,
    borderRadius: 2
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%'
  }
}))

function ImageUpload(props: ImageUploadProps) {
  const classes = useStyles()
  const theme = useTheme()

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      console.log(acceptedFiles, 2233);
      // @ts-ignore
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const preview = files.map((file: any) => (
    <img
      key={file.name}
      src={file.preview}
      onLoad={() => { URL.revokeObjectURL(file.preview) }}
      className={classes.img}
    />
  ));

  useEffect(() => {
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className={classes.root}>
      <Box {...getRootProps()} className={classes.select}>
        <input {...getInputProps()} />
        {isEmpty(files) ? (
          <>
            <AddIcon />
            <Typography color={theme.palette.text.secondary}>上传封面</Typography>
          </>
        ) : preview}
      </Box>
    </section>
  );
}

export default ImageUpload
