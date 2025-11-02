import { useParams } from "react-router-dom";
import { getPostDetail } from "../api/PostApi";
import PostDetail from "../components/PostDetail/PostDetail";

function Post() {
  const { slug } = useParams();

  console.log(slug);

  const post = getPostDetail(slug);

  return (
    <>
      <div>글</div>
      <p>이곳의 슬러그는 다음과 같음: {slug}</p>
      <PostDetail post={post} />
    </>
  );
}

export default Post;
