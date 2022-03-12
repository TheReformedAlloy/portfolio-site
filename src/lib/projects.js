const matter = require('gray-matter');

const querystring = require('querystring');

import {remark} from 'remark';
import html from 'remark-html';

export async function searchProjects(query) {
    const results = await fetch(`https://www.reformedalloy.com/api/projects/search?${querystring.stringify(query)}`)
        .then(response => response.json())
        .then(async (data) => {
            const processedData = await Promise.all(data.map(async (blog) => {
                const matterResults = matter(blog.description, {
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

export async function getProjectList() {
    const allPostsData = await fetch(`https://www.reformedalloy.com/api/projects`)
        .then(response => response.json())
        .then(async (data) => {
            const processedData = await Promise.all(data.map(async (project) => {
                const matterResults = matter(project.description, {
                    excerpt: (file, options) => {
                        file.excerpt = file.content.slice(0, 150) + "...";
                    }
                });

                const processContent = await remark()
                    .use(html)
                    .process(matterResults.content);
                const contentHTML = processContent.toString();

                return {
                    contentHTML,
                    ...matterResults,
                    ...project
                };
            }));

            return processedData
        });

    return allPostsData
}

export async function getProjectData(id) {
    const postData = await fetch(`https://www.reformedalloy.com/api/projects/${id}`)
        .then(response => response.json())
        .then(async (project) => {
            const matterResult = matter(project.description)

            const processContent = await remark()
                .use(html)
                .process(matterResult.content);
            const contentHTML = processContent.toString();
        
            return {
                id,
                contentHTML,
                ...matterResult,
                ...project
            }
        });
    
    return postData;
}