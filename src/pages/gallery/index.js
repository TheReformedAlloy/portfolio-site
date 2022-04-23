import { getExhibitIDs } from '../../lib/gallery';

import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import ExhibitCard from '../../components/exhibits/ExhibitCard';

export default function Exhibits({user, exhibits}) {
    return (
        <>
            <Container className="framed p-4">
                <Row className='my-2'>
                    <h1>My Recent Work:</h1>
                </Row>
                <Row className='my-2 mx-2 mx-md-0' xs={1} md={3} lg={5}>
                    {exhibits.length > 0 ?
                        exhibits.map(exhibit => {
                            return <ExhibitCard galleryID={exhibit.galleryID} key={`exhibit-card-${exhibit.galleryID}`}/>
                        })
                    :
                        <h4>No exhibits are currently available.</h4>
                    }
                </Row>
            </Container>
        </>
    )
}

export async function getServerSideProps() {
    const exhibits = await getExhibitIDs();


    return {
        props: {
            exhibits: [
                ...exhibits
            ]
                
        }
    }

}