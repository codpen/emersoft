import { ICategory } from "../category/category";

export type ISingleBlog = {
    title: string;
    image: string;
    excerpt: string;
    categories: ICategory[] | undefined;
};