const axios = require("axios")
const endpoint = (...path) => `http://localhost:8080/wp-json/${path.join("/")}`;

module.exports = async actions => {
  const episodes = actions.addCollection("Episode");

  const publisher = await axios.get(endpoint("wp", "v2", "episodes")).then(({ data = [] }) => data.map(({ id, slug }) => ({ id, slug })));

  await Promise.all(
    publisher.map(({ id, slug }) =>
      axios
        .get(endpoint("podlove-web-player", "shortcode", "publisher", id))
        .then(({ data }) => ({ ...data, id: slug }))
        .then(data => episodes.addNode(data))
    )
  );
};
