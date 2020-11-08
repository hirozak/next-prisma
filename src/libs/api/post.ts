import { IPost, IPostBody } from '@/libs/model/post';
import { functions } from '@/libs/firebase';

export const getList = async (path?: string): Promise<IPost[]> => {
  console.log(path);
  try {
    const func = functions.httpsCallable('getPostList');
    const result = await func();
    return result.data.map((post: IPost) => ({
      ...post,
      createdAt: new Date(post.createdAt),
    }));
  } catch (e) {
    throw new Error(e);
  }
};

export const createPost = async (body: IPostBody): Promise<IPost> => {
  try {
    const func = functions.httpsCallable('createPost');
    const result = await func(body);
    return {
      ...result.data,
      createdAt: new Date(result.data.createdAt),
    } as IPost;
  } catch (e) {
    throw new Error(e);
  }
};
