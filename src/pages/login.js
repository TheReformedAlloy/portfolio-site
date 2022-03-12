import {
    Container,
    Alert
} from 'react-bootstrap';

import { useRouter } from 'next/router';

import LoginForm from '../components/LoginForm'

export default function Login() {
    const router = useRouter();
    return (
        <Container>
            {router.query.has_failed && (
                <Alert variant="danger">Login failed. Please try again.</Alert>
             )}
            <LoginForm />
        </Container>
    )
}