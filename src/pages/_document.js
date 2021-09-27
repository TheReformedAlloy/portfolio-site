import Document, {
    Html,
    Head,
    Main,
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
                    {/*Import Bootstrap CSS*/}
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />
                    
                    {/*Import jQuery*/}
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>

                    {/*Import Bootstrap JS*/}
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossOrigin="anonymous"></script>
                    
                    {/*Include Holder.js*/}
                    <script src="https://cdn.jsdelivr.net/npm/holderjs@2.9.7/holder.min.js"></script>

                    {/*Include bs-custom-file-input*/}
                    <script src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js"></script>
                    
                    {/*Google Adsense Connection*/}
                    <script data-ad-client="ca-pub-4784055745020269" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

                    {/*Favicon*/}
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
                    
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
                    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}