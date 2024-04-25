import { Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomErrorMessage from '../Components/CustomErrorMessage';
import CustomModal from '../Components/CustomModal';
import PostDetails from '../Components/PostsComponents/PostDetails';
import PostSimpleView from '../Components/PostsComponents/PostSimpleView';
import SiteLoader from '../Components/SiteLoader';
import VHBar from '../Components/VHBar';
import { useCurrentUserPosts } from '../Hooks/currentUserPosts';
import { IPost } from '../models';

function AccountPostsPage() {
  const { error, loading, currentUserPosts } = useCurrentUserPosts();
  //for modal post
  const [currentPostModal, setCurrentPostModal] = useState<IPost | undefined>();
  const navigate = useNavigate();

  return (
      <>
          <VHBar />
          <>
              {error && <CustomErrorMessage error={error} />}
              {loading && <SiteLoader />}

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
                  onClick={() => navigate("/create-post")}
              >
                  Новий пост
              </Button>
              <Container
                  sx={{
                      "@media": {
                          maxWidth: "none",
                      },
                  }}
              >
                  <Grid
                      container
                      direction="column"
                      sx={{
                          width: "80%",
                          margin: "0px auto",
                      }}
                  >
                      {currentUserPosts.map((post) => {
                          return (
                              <Grid
                                  item
                                  key={post.postId}
                                  sx={{
                                      width: "100%",
                                      padding: "0px!important",
                                      margin: "20px",
                                  }}
                              >
                                  <PostSimpleView
                                      post={post}
                                      key={post.postId}
                                      setCurrentPost={(currentPost: IPost) =>
                                          setCurrentPostModal(currentPost)
                                      }
                                      isDetailsVisible={true}
                                  />
                              </Grid>
                          );
                      })}
                      {/* set modal for post view */}
                      {currentPostModal !== undefined && (
                          <CustomModal
                              h1CustomClass="modal-title"
                              isAutoModalHeight={true}
                              title="Деталі поста"
                              onClose={() => setCurrentPostModal(undefined)}
                          >
                              <PostDetails
                                  post={currentPostModal}
                                  displayButtons={true}
                              />
                          </CustomModal>
                      )}
                  </Grid>
              </Container>
          </>
      </>
  );
}

export default AccountPostsPage;
