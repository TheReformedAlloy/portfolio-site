import '../styles/theme.scss';

import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script'

const {User} = require('../mongodb.js');

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

export default function MyApp({Component, pageProps}) {
  const [user, userState] = useState('pageProps.user');

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, [])

  return (
    <>
      {/*Import jQuery*/}
      <Script strategy="beforeInteractive" src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></Script>

      {/*Include Holder.js*/}
      <Script src="https://cdn.jsdelivr.net/npm/holderjs@2.9.7/holder.min.js"></Script>

      {/*Include bs-custom-file-input*/}
      <Script src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js"></Script>

      {/*Google Adsense Connection*/}
      <Script data-ad-client="ca-pub-4784055745020269" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></Script>

      {/*SimpleMDE js import*/}
      <Script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></Script>
      <Head>
        <title>Reformed Alloy Designs</title>

        {/*Favicon*/}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
      </Head>
      <NavBar user={user} />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {};
  if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
  }
  if (ctx.req && ctx.req.session && ctx.req.session.passport) {
      pageProps.user = await User.findOne({username: ctx.req.session.passport.user}).lean();
  }
  
  return { pageProps };
}
