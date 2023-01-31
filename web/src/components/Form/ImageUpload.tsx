import { useEffect, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add"
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import isEmpty from "lodash/isEmpty";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Theme } from "@mui/material";

interface ImageUploadProps {
  accept?: Accept;
  onChange?: (files: File[]) => void;
  onRemove?: (files: File[]) => void;
  notice?: string;
}

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
  preview: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '& .delete-icon': {
      position: 'absolute',
      top: '50%',
      left: '50%'
    }
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%'
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'all .3s',
    color: theme.status.white,
    '&:hover': {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, .5)'
    }
  }
}))

function ImageUpload({
  accept,
  onChange,
  onRemove,
  notice = '建议尺寸: 1370*734px'
}: ImageUploadProps) {
  const classes = useStyles()
  const theme = useTheme()

  const [files, setFiles] = useState<File[]>([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: accept ?? {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      const nowFiles = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
      setFiles(nowFiles);
      onChange?.(nowFiles)
    },
  });

  const handleDelete = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL((newFiles[index] as any).preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onRemove?.(newFiles)
  }

  const preview = files.map((file: any, index) => (
    <Box key={file.name} className={classes.preview}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={file.preview}
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
        className={classes.img}
        alt=""
      />
      <Box className={classes.deleteIcon} onClick={(event) => event.stopPropagation()}>
        <DeleteIcon onClick={() => handleDelete(index)} />
      </Box>
    </Box>
  ));

  useEffect(() => {
    return () => {
      // files.forEach((file: any) => URL.revokeObjectURL(file.preview))
      setFiles([])
    };
  }, []);

  return (
    <section className={classes.root}>
      <Box {...getRootProps()} className={classes.select}>
        <input {...getInputProps()} name="123" />
        {isEmpty(files) ? (
          <>
            <AddIcon />
            <Typography color={theme.palette.text.secondary}>上传封面</Typography>
          </>
        ) : preview}
      </Box>
      {isEmpty(files) && <Typography color={theme.palette.text.secondary} mt={2}>{notice}</Typography>}
    </section>
  );
}

export default ImageUpload
