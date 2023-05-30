import 'bulma/css/bulma.min.css';
import Link from 'next/link'
import Head from 'next/head'

export const Layout = (props) => {
  return (
    <div
      style={{
        margin: '3rem',
      }}
    >
      <Head>
        <title>The Bible Project Podcast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
        {' | '}
        <Link href="/episodes">
          <a>Episodes</a>
        </Link>
      </header>
      <main>{props.children}</main>
    </div>
  )
}
