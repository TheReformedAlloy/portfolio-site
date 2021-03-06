

import {
    Container,
    Alert
} from 'react-bootstrap';
import RegisterForm from '../components/authentication/RegisterForm';

import { useRouter } from 'next/router';

export default function Login({eventTypes}) {
    const router = useRouter();
    return (
        <Container>
            {router.query.has_failed && (
                <Alert variant="danger">Registration failed. Username already exist.</Alert>
             )}
            <RegisterForm/>
        </Container>
    );
}