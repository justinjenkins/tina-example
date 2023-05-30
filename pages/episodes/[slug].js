import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.episode.description;

  return (
    <Layout>
      <div class="box">
        <h3 class="title is-3">This is {data.episode.title}</h3>
        <audio controls>
          <source src={data.episode.file_url} type="audio/mpeg" />
        </audio>
        <div data-tina-field={tinaField(data.episode, "description")}>
          <TinaMarkdown content={content} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.episodeConnection();
  const paths = data.episodeConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.episode({
    relativePath: ctx.params.slug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
