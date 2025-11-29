import { useParams } from "react-router-dom";
import { getPostDetail } from "../api/PostApi";
import PostDetail from "../components/post/PostDetail/PostDetail";

function Post() {
  const { slug } = useParams();

  const post = getPostDetail(slug);

  return (
    <>
      <PostDetail post={post} />
      {/* Related Posts 컴포넌트도 만들어서 넣을 수 있을듯 */}
    </>
  );
}

export default Post;
