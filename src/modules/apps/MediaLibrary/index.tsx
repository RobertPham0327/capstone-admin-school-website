import AppLoader from '@crema/components/AppLoader';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import AppAnimate from '@crema/components/AppAnimate';
import { getBlogList } from '../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { useEffect } from 'react';
import CreateMediaLibrary from './CreateMediaLibrary';

const Blogs = () => {
  const blogLists = useAppSelector(({ blogs }) => blogs.blogLists);
  const { loading } = useAppSelector(({ common }) => common);
  const dispatch = useAppDispatch();
  const selectedBlog = useAppSelector(({ blogs }) => blogs.selectedBlog);

  useEffect(() => {
    dispatch(getBlogList());
  }, [dispatch]);

  return loading ? (
    <AppLoader />
  ) : !isEmptyObject(blogLists.blogSidebar) ? (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <CreateMediaLibrary selectedBlog={selectedBlog?.blogDetail} />
    </AppAnimate>
  ) : null;
};
export default Blogs;
