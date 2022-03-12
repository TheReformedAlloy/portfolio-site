const matter = require('gray-matter');

const btoa = require('btoa');

import {remark} from 'remark';
import html from 'remark-html';

export async function getListOfExhibits() {
    const allPostsData = await fetch(`https://www.reformedalloy.com/api/gallery`)
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
                    ...exhibit,
                    imgs: await Promise.all(exhibit.imgs.map(async img => {
                        var binary = '';
                        var bytes = new Uint8Array(img.data.data);
                        let data = '';
                        bytes.forEach(async (b, index) => {
                            binary += String.fromCharCode(b);
                            if(index == (bytes.length - 1)) {
                                data = btoa(binary);
                            }
                        });
    
                        return {
                            ...img,
                            data
                        }
                    }))
                };
            }));

            return processedData
        });

    return allPostsData
}

export async function getExhibitData(id) {
    const postData = await fetch(`https://www.reformedalloy.com/api/gallery/${id}`)
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
                imgs: await Promise.all(exhibit.imgs.map(async img => {
                    var binary = '';
                    var bytes = new Uint8Array(img.data.data);
                    let data = '';
                    bytes.forEach(async (b, index) => {
                        binary += String.fromCharCode(b);
                        if(index == (bytes.length - 1)) {
                            data = btoa(binary);
                        }
                    });

                    return {
                        ...img,
                        data
                    }
                })),
                orig: null

            }
        });
    
    return postData;
}