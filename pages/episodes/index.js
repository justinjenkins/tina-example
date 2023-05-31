import { Layout } from "../../components/Layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function EpisodeList(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const episodesList = data.episodeConnection.edges.filter(
    (episode) => episode.node.is_published
  );

  return (
    <Layout>
      <h1 className="title">Episodes ({episodesList.length})</h1>
      <div>
        {episodesList.map((episode) => (
          <article key={episode.node.id} class="message mb-5 is-info">
            <div className="message-header">
              <p>{episode.node.title}</p>
            </div>
            <div className="message-body">{episode.node.short_description}</div>
            <div className="px-4 py-4">
              <Link href={`/episodes/${episode.node._sys.filename}`}>
                <button className="button">View More</button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.episodeConnection();

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
