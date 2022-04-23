import Head from 'next/head';

import { getExhibitIDs } from '../../lib/gallery';

import CommentSection from '../../components/comments/CommentSection';
import ExhibitDisplay from '../../components/exhibits/ExhibitDisplay';

export default function Exhibit({user, exhibitID}) {
    return (
        <>
            <Head>
                <title>Loading...</title>
            </Head>
            <ExhibitDisplay user={user} exhibitID={exhibitID}/>
            {/* <CommentSection user={user} postID={post.id}></CommentSection> */}
        </>
    )
}

export async function getStaticPaths() {
    const exhibitIDs = await getExhibitIDs();
    const paths = exhibitIDs.map(item => ({
        params: {
            id: item.galleryID
        }
    }))

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            exhibitID: params.id
        }
    }
}