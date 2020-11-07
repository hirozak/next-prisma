import * as React from 'react';
import { GetStaticProps } from 'next';
import styled from '@emotion/styled';
import { getList as getPostList } from '@/libs/api/post';
import { IPost } from '@/libs/model/post';
import PostCreator from '@/components/PostCreator';
import SignIn from '@/components/SignIn';
import PostList from '@/components/PostList';

const Container = styled.div({
  margin: '16px',
  padding: '16px',
});

interface IProps {
  initialPosts: IPost[];
}

const Index: React.FC<IProps> = ({ initialPosts }) => {
  const [posts, setPosts] = React.useState<IPost[]>(initialPosts);
  const addNewPost = (post: IPost) => {
    setPosts([post, ...posts]);
  };
  return (
    <Container>
      <h1>Hello next-prisma</h1>
      <SignIn />
      <PostCreator addNewPost={addNewPost} />
      <PostList posts={posts} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = await getPostList();
  return {
    props: {
      initialPosts: posts,
    },
    revalidate: 1, // In seconds
  };
};

export default Index;
