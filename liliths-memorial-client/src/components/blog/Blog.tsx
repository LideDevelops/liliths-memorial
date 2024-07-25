import { BlogEntries, BlogEntry } from '@/lib/definitions';
import BlogContentEntry from './BlogContentEntry';

type BlogProps = {
    entries: BlogEntries;
};

export default function Blog({ entries }: BlogProps) {

    if (!entries) {
        return <div>No blog entries found</div>;
    }
    return (
        <div>
            {entries.map((entry: BlogEntry) => (
                <BlogContentEntry key={entry.id} entries={entry} />
            ))}
        </div>
    );
};



