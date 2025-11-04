import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_SOURCE_DIR = "./posts";
const PUBLIC_POSTS_DIR = "./public/posts";
const PUBLIC_IMAGES_PREFIX = "/posts";
const OUTPUT = "./src/data/posts.json";

const normalizeFolders = () => {
  fs.mkdirSync(PUBLIC_POSTS_DIR, { recursive: true });
  if (!fs.existsSync(POSTS_SOURCE_DIR)) {
    throw new Error(`Source posts directory not found: ${POSTS_SOURCE_DIR}`);
  }

  return fs
    .readdirSync(POSTS_SOURCE_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
};

const copyImagesToPublic = (folder) => {
  const sourceImagesDir = path.join(POSTS_SOURCE_DIR, folder, "images");
  const publicImagesDir = path.join(PUBLIC_POSTS_DIR, folder, "images");

  if (!fs.existsSync(sourceImagesDir)) {
    fs.rmSync(publicImagesDir, { recursive: true, force: true });
    return;
  }

  fs.rmSync(publicImagesDir, { recursive: true, force: true });
  fs.mkdirSync(publicImagesDir, { recursive: true });
  fs.cpSync(sourceImagesDir, publicImagesDir, {
    recursive: true,
    force: true,
  });
};

const getPosts = async () => {
  const folders = normalizeFolders();

  const posts = await Promise.all(
    folders.map(async (folder) => {
      const filePath = path.join(POSTS_SOURCE_DIR, folder, "index.md");

      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing index.md for post: ${folder}`);
      }

      const file = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(file);

      const processed = await remark().use(html).process(content);
      let contentHtml = processed.toString();

      const imagePathPrefix = `${PUBLIC_IMAGES_PREFIX}/${folder}/images/`;
      contentHtml = contentHtml.replace(
        /src="\.\/images\//g,
        `src="${imagePathPrefix}`
      );

      copyImagesToPublic(folder);

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
