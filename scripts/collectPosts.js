import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIR = "./public/posts";
const OUTPUT = "./src/data/posts.json";

const getPosts = async () => {
  const folders = fs.readdirSync(POSTS_DIR);

  const posts = await Promise.all(
    folders.map(async (folder) => {
      const filePath = path.join(POSTS_DIR, folder, "index.md");
      const file = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(file);

      const processed = await remark().use(html).process(content);
      let contentHtml = processed.toString();

      const imagePathPrefix = `/posts/${folder}/images/`;
      contentHtml = contentHtml.replace(
        /src="\.\/images\//g,
        `src="${imagePathPrefix}`
      );

      return {
        slug: folder,
        ...data,
        content: contentHtml,
        imagesPath: imagePathPrefix,
      };
    })
  );
  return posts;
};

const run = async () => {
  const posts = await getPosts();
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2));
  console.log("✅ posts.json generated:", OUTPUT);
};

run();
