import { useState, useEffect } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';
import Blog from '@/components/Blog';
import { IBlog } from '@/common/types/blog/blogs';
import { ICategory } from '@/common/types/category/category';
import MultiSelect from '@/components/MultiSelect';
import { Pagination } from '@/components/Pagination';
import { ISelectItem } from '@/common/types/select/single_item';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<ISelectItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const perPage = 10;

  const convertCatergories = () => {
    const result = categories.map((category) => {
      return {value: category.id, label: category.name};
    });
    return result;
  };

  const getCategoriesByBlog = (list: number[]) => {
    if (categories.length > 0) {
      const resultList = categories.filter((category) => list.includes(category.id));
      return resultList;
    }
  }

  useEffect(() => {
    const url = 'https://mocki.io/v1/440d2bbf-3049-4f58-8a5b-841fb31fed38';
    axios.get(url).then(res => {
      setBlogs(res.data.posts);
      setCategories(res.data.categories);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    const filteredResultsByKeyword = blogs.filter((blog) => blog.title.toLowerCase().includes(keyword.toLowerCase()));
    if (selectedOptions.length > 0) {
      const filteredResultsByCategory = filteredResultsByKeyword.filter((item) => {
        return item.categories.some((category) => {
          return selectedOptions.some((option) => option.value === category);
        });
      });
      setFilteredBlogs(filteredResultsByCategory);
    } else {
      setFilteredBlogs(filteredResultsByKeyword);
    }
    setCurrentPage(1);
  }, [keyword, blogs, selectedOptions]);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedOptions([{value: selectedCategory.id, label: selectedCategory.name}])
    }
  }, [selectedCategory]);

  return (
    <div className='flex flex-col items-center w-full p-20'>
      <div className='text-5xl font-bold'>From The Blog</div>
      <div className='text-3xl py-10'>This is blog page for emersoft test built by Bruno</div>
      <div className='flex flex-wrap w-full justify-center pb-5'>
        <MultiSelect items={convertCatergories()} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
        <input 
          className='shadow appearance-none border rounded lg:w-1/4 md:w-1/2 w-full py-2 px-3 md:ml-0 md:mt-0 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          type='text' 
          placeholder='Search blogs by title' 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}  
        />
      </div>
      <div className='flex flex-wrap justify-center'>
        {
          filteredBlogs.slice(perPage * (currentPage - 1), perPage * currentPage).map(
            (blog, index) => 
              <Blog
                key={index}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                title={blog.title} 
                image={blog.imageUrl} 
                excerpt={blog.excerpt} 
                categories={getCategoriesByBlog(blog.categories)}
              />
            )
        }
      </div>
      <div className='py-3'>
        <Pagination nPages={filteredBlogs.length / perPage} perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  )
}
