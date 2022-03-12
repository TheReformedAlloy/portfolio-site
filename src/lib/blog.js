const matter = require('gray-matter');

const querystring = require('querystring');

import {remark} from 'remark';
import html from 'remark-html';

export async function searchPosts(query) {
    const results = await fetch(`https://www.reformedalloy.com/api/blog/search?${querystring.stringify(query)}`)
        .then(response => response.json())
        .then(async (data) => {
            const processedData = await Promise.all(data.map(async (blog) => {
                const matterResults = matter(blog.content, {
                    excerpt: (file, options) => {
                        file.excerpt = file.content.slice(0,125) + "...";
                    }
                });

                const processContent = await remark()
                    .use(html)
                    .process(matterResults.content);
                const contentHTML = processContent.toString();

                return {
                    contentHTML,
                    ...matterResults,
                    ...blog
                };
            }));

            return processedData;
        });
    
    return results;
}

export async function getBlogList() {
    const allPostsData = await fetch(`https://www.reformedalloy.com/api/blog`)
        .then(response => response.json())
        .then(async (data) => {
            const processedData = await Promise.all(data.map(async (blog) => {
                const matterResults = matter(blog.content, {
                    excerpt: (file, options) => {
                        file.excerpt = file.content.slice(0,125) + "...";
                    }
                });

                const processContent = await remark()
                    .use(html)
                    .process(matterResults.content);
                const contentHTML = processContent.toString();

                return {
                    contentHTML,
                    ...matterResults,
                    ...blog
                };
            }));

            return processedData
        });

    return allPostsData
}

export async function getBlogData(id) {
    const postData = await fetch(`https://www.reformedalloy.com/api/blog/${id}`)
        .then(response => response.json())
        .then(async (blog) => {
            const matterResult = matter(blog.content)

            const processContent = await remark()
                .use(html)
                .process(matterResult.content);
            const contentHTML = processContent.toString();
        
            return {
                id,
                contentHTML,
                ...matterResult,
                ...blog
            }
        });
    
    return postData;
}