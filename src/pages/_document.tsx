import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="application-name" content="Moveit" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#121214"
          />
          <meta name="apple-mobile-web-app-title" content="Moveit" />
          <meta name="description" content="Mova-se!" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta
            name="description"
            content="Para Evitar problemas futuros, mova-se!"
          />
          <meta name="keywords" content="Keywords" />
          <meta name="theme-color" content="#121214" />

          <link rel="shortcut icon" href="/favicon.svg" type="image/png" />

          {/* <link rel="manifest" href="/manifest.json" /> */}

          <link rel="apple-touch-icon" href="iconspwa/apple-icon-180.png" />
        </Head>
        <body>
          <Main />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`}
          ></script>
          <NextScript />
        </body>
      </Html>
    )
  }
}
