import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Form, Formik } from 'formik';
import CustomErrorMessage from '../Components/CustomErrorMessage';
import PostSimpleView from '../Components/PostsComponents/PostSimpleView';
import VHBar from '../Components/VHBar';
import { useSendPost } from '../Hooks/sendPost';

function SendPostPage() {
  const {
    receiverPost,
    error,
    selectedPostId,
    currentUserPosts,
    selectedPost,
    handleChangeTitle,
    handleSendPost,
    navigateToCreatePost,
  } = useSendPost();

  return (
      <>
          <VHBar />
          <Box sx={{ margin: "20px" }}>
              <Grid
                  container
                  sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                  }}
              >
                  <Grid item sx={{ width: "100%" }}>
                      <Grid
                          container
                          sx={{
                              dispay: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                          }}
                      >
                          <Grid item sx={{ width: "62%" }}>
                              <PostSimpleView
                                  post={receiverPost}
                                  isDetailsVisible={false}
                                  setCurrentPost={(receiverPost) => {}}
                              />
                          </Grid>
                          <Grid item sx={{ width: "35%" }}>
                              <FormControl required sx={{ width: "100%" }}>
                                  <InputLabel
                                      id="post-title-label"
                                      sx={{ marginTop: "4%" }}
                                  >
                                      Оберіть ваш пост для відправки
                                  </InputLabel>
                                  <Select
                                      required
                                      fullWidth
                                      className="role-selector"
                                      labelId="post-title-label"
                                      id="post-title"
                                      value={selectedPostId}
                                      onChange={handleChangeTitle}
                                  >
                                      {currentUserPosts.map((post) => (
                                          <MenuItem
                                              key={post.postId}
                                              value={post.postId}
                                          >
                                              {post.title}
                                          </MenuItem>
                                      ))}
                                  </Select>
                              </FormControl>
                          </Grid>
                      </Grid>
                  </Grid>

                  <Grid
                      item
                      sx={{
                          width: "100%",
                          marginTop: "20px",
                      }}
                  >
                      <Grid
                          container
                          sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                          }}
                      >
                          <Grid item sx={{ width: "62%" }}>
                              {selectedPostId && selectedPost && (
                                  <PostSimpleView
                                      post={selectedPost}
                                      isDetailsVisible={false}
                                      setCurrentPost={(selectedPost) => {}}
                                  />
                              )}
                          </Grid>
                          <Grid item sx={{ width: "35%" }}>
                              {selectedPost && (
                                  <Formik
                                      initialValues={{
                                          title: "",
                                          description: "",
                                      }}
                                      onSubmit={(values) => {
                                          handleSendPost(values);
                                      }}
                                  >
                                      {({
                                          values,
                                          handleChange,
                                          handleBlur,
                                      }) => (
                                          <Form>
                                              <Box
                                                  sx={{
                                                      width: "100%",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      justifyContent:
                                                          "space-between",
                                                      alignItems: "left",
                                                  }}
                                              >
                                                  <TextField
                                                      name="title"
                                                      required
                                                      id="title"
                                                      label="Назва повідомлення"
                                                      autoFocus
                                                      value={values.title}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      className="input-field"
                                                      fullWidth
                                                  />
                                                  <TextField
                                                      required
                                                      multiline
                                                      rows={4}
                                                      id="description"
                                                      label="Опис повідомлення"
                                                      name="description"
                                                      value={values.description}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      className="input-field"
                                                      fullWidth
                                                  />
                                                  <Button
                                                      type="submit"
                                                      sx={{
                                                          backgroundColor:
                                                              "rgba(17, 102, 96, 0.7)",
                                                          color: "#FFFCFC",
                                                          fontFamily: "Inter",
                                                          fontStyle: "normal",
                                                          fontWeight: "400",
                                                          fontSize: "15px",
                                                          width: "40%",
                                                          margin: "15px 0px 10px 0px",
                                                          borderRadius: "15px",
                                                          "&:hover": {
                                                              backgroundColor:
                                                                  "#044945",
                                                          },
                                                      }}
                                                  >
                                                      Відправити повідомлення
                                                  </Button>
                                              </Box>
                                          </Form>
                                      )}
                                  </Formik>
                              )}
                          </Grid>
                      </Grid>
                  </Grid>

                  <Button
                      variant="contained"
                      sx={{
                          position: "fixed",
                          bottom: "2%",
                          right: "2%",
                          zIndex: 2000,
                          backgroundColor: "rgba(17, 102, 96, 0.7)",
                          borderRadius: "15px",
                          padding: "5px 10px",
                          color: "#fffcfc",
                          fontSize: "15px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          "&:hover": {
                              backgroundColor: "#044945",
                          },
                      }}
                      onClick={navigateToCreatePost}
                  >
                      Створити новий пост
                  </Button>
                  {error && <CustomErrorMessage error={error} />}
              </Grid>
          </Box>
      </>
  );
}

export default SendPostPage;
