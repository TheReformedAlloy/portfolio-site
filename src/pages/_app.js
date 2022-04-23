import '../styles/theme.scss';

import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script'

const {User} = require('../mongodb.js');

import NavBar from '../components/body/NavBar';
import Footer from '../components/body/Footer';
import { useEffect, useState } from 'react';

export default function MyApp({Component, pageProps}) {
  const [user, userState] = useState('pageProps.user');

  return (
    <>
      {/*Include jQuery*/}
      <Script strategy="beforeInteractive" key="jquery" src="https://code.jquery.com/jquery-3.6.0.min.js" />
      {/*Include Bootstrap js*/}
      <Script strategy="beforeInteractive" key="bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
        {/*Include Popper.js, a Bootstrap dependency:*/}
        {/* <Script src="https://unpkg.com/@popperjs/core@2" /> */}

      {/*Include Holder.js*/}
      <Script key="holder" src="https://cdn.jsdelivr.net/npm/holderjs@2.9.7/holder.min.js" />

      {/*Google Adsense Connection*/}
      <Script key="adsense" data-ad-client="ca-pub-4784055745020269" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <Head>
        <title>Reformed Alloy Designs</title>

        {/*Favicon*/}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
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
