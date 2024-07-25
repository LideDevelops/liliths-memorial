import Blog from '@/components/blog/Blog';
import { getBlogEntriesWithPagination } from '@/lib/blog-entry-loader';
import { BlogEntries } from '@/lib/definitions';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

async function getBlogEntries(): Promise<BlogEntries> {

    const entries = await getBlogEntriesWithPagination(10, 0);
    
    return entries
};


export default async function HomePage() {
    const entries = await getBlogEntries();
    return (
        <div>
            <Blog entries={entries}/>
        </div>
    );
};