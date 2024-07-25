import { BlogEntry } from '@/lib/definitions';
import { MDXRemote } from 'next-mdx-remote/rsc'; // Import the MDXRemote component
import './BlogContentEntry.css';

const BlogContentEntry = async ({ entries }: { entries: BlogEntry }) => {


    return (
        <div className='BlogBox'>
            <MDXRemote source={entries.content} />
        </div>
    );
};


export default BlogContentEntry;