import { ISingleBlog } from '@/common/types/blog/single_blog';
import { ICategory } from '@/common/types/category/category';

export type ISelectedCategoryByBlog = {
    selectedCategory: ICategory | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<ICategory | undefined>>;
}

const Blog = ({title, image, excerpt, categories, selectedCategory, setSelectedCategory}: ISingleBlog & ISelectedCategoryByBlog) => {
    return (
        <div className='w-[300px] h-[320px] bg-white rounded-xl m-5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transform hover:scale-105 transition duration-500 ease-in-out'>
            <img className='h-[35%] rounded-t-xl' src={image} alt='image' width='100%' />
            <div className='p-5 bg-white h-[65%] rounded-b-xl flex flex-col justify-between'>
                <div>
                    <div className='mb-2 font-bold'>{title}</div>
                    <div className='text-sm text-gray-900'>{excerpt}</div>
                </div>
                <div>
                    {
                        categories?.map((category, index) => <button key={index} className='text-blue-500 text-sm pr-3' onClick={() => setSelectedCategory(category)}>{category.name}</button>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Blog;