import "bulma/css/bulma.min.css";
import Link from "next/link";
import Head from "next/head";

export const Layout = (props) => {
  return (
    <div
      style={{
        margin: "3rem",
      }}
    >
      <Head>
        <title>The Bible Project Podcast</title>
      </Head>
      <header>
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/episodes">
                <a>Episodes</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main style={{marginTop: 15}}>{props.children}</main>
    </div>
  );
};
