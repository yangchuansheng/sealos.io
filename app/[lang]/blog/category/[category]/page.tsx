import { generateBlogMetadata } from '@/lib/utils/metadata';
import BlogHeader from '../../components/BlogHeader';
import BlogGrid from '../../components/BlogGrid';
import { redirect } from 'next/navigation';
import {
  getCategories,
  getSortedBlogPosts,
  formatCategoryTitle,
  getAllTags,
} from '@/lib/utils/blog-utils';
import BlogContainer from '../../components/BlogContainer';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categories = await getCategories();
  const { category } = params;

  const decodedCategory = decodeURIComponent(category);
  if (!categories.includes(decodedCategory)) {
    redirect(`../../blog/`);
  }

  const allPosts = getSortedBlogPosts({ category: category, tags: [] });
  const posts = allPosts;
  const tags = await getAllTags(allPosts);

  const categoryTitle = formatCategoryTitle(category);

  return (
    <BlogContainer>
      <BlogHeader
        title={`${categoryTitle} Articles`}
        description={`Blog articles in the ${categoryTitle.toLowerCase()} category`}
        categories={categories}
        tags={tags}
      />
      <BlogGrid posts={posts} />
    </BlogContainer>
  );
}

export const generateMetadata = generateBlogMetadata;
