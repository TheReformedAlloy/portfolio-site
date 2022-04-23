import Document, {
    Html,
    Main,
    Head,
    NextScript
} from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps
        };
    }

    render() {
        return (
            <Html>
                <Head>
                    {/*EasyMDE CSS*/}
                    <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}