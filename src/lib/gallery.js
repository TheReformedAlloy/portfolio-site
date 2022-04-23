const matter = require('gray-matter');

const btoa = require('btoa');

import {remark} from 'remark';
import html from 'remark-html';

import {hostURL} from '../config';

export async function getExhibitIDs() {
    const allPostsData = await fetch(`${hostURL}/api/gallery?projection=galleryID`)
        .then(response => response.json())
    
        return allPostsData;
}

export async function getListOfExhibits() {
    const allPostsData = await fetch(`${hostURL}/api/gallery`)
        .then(response => response.json())
        .then(async (data) => {
            const processedData = await Promise.all(data.map(async (exhibit) => {
                const matterResults = matter(exhibit.description, {
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
                    ...exhibit
                };
            }));

            return processedData
        });

    return allPostsData
}

export async function getExhibitData(id) {
    const postData = await fetch(`${hostURL}/api/gallery/${id}`)
        .then(response => response.json())
        .then(async (exhibit) => {
            const matterResult = matter(exhibit.description)

            const processContent = await remark()
                .use(html)
                .process(matterResult.content);
            const contentHTML = processContent.toString();
            
            return {
                id,
                contentHTML,
                ...matterResult,
                ...exhibit,
                orig: null
            }
        });
    
    return postData;
}