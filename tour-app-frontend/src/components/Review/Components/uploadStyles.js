export const styles = theme => ({
  dropzone: {
    height: 200,
    width: 200,
    minWidth: 200,
    border: '2px dashed rgb(187, 186, 186)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16,
  },
  fileInput: {
    display: 'none',
  },
  hightlight: {
    backgroundColor: 'rgb(188, 185, 236)',
  },
  wrapper: {
    display: "flex"
  },
  previewWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  previewImg: {
    width: '100%',
    objectFit: 'contain',
  },
  
  // root: {
  //   display: "flex",
  //   maxWidth: "100vw",
  //   overflowX: "hidden",
  // },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   width: `calc(100vw - 240px)`,
  //   minHeight: "100vh",
  // },
  // grid: {
  //   display: "flex",
  // },
  // row: {
  //   margin: theme.spacing(3)
  // }
});
