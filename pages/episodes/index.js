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
  const episodesList = data.episodeConnection.edges.filter(episode => episode.node.is_published);

  return (
    <Layout>
      <h1 class="title">Episodes</h1>
      <div>
        {episodesList.map((episode) => (
          <div key={episode.node.id}>
            <Link href={`/episodes/${episode.node._sys.filename}`}>
              <a>{episode.node.title}</a>
            </Link>
          </div>
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
