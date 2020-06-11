const { prop, propOr } = require('ramda')
const axios = require("axios")
const endpoint = (...path) => `http://localhost:8080/wp-json/${path.join("/")}`;

const timeRegex = new RegExp(/^(?:(\d{1,2}):)?(?:(\d{1,2}):)?(\d{1,2})(?:\.(\d{1,3}))?$/)
const toPlayerTime = (time = '0') => {
  const matches = timeRegex.exec(time)

  if (!matches) {
    return 0
  }

  const hours = parseInt(matches[2] ? matches[1] : 0)
  const minutes = parseInt(matches[2] ? matches[2] : matches[1] || 0)
  const seconds = parseInt(matches[3] || 0)
  const milliseconds = parseInt(matches[4] || 0)

  return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds
}

const parseChapters = duration => (result, chapter, index, chapters) => {
  const end = propOr({ start: duration }, index + 1, chapters)
  const href = propOr('', 'href', chapter).trim()

  return [
    ...result,
    {
      index: index + 1,
      start: toPlayerTime(chapter.start),
      end: toPlayerTime(end.start),
      title: prop('title', chapter),
      image: prop('image', chapter),
      href
    }
  ]
}

module.exports = async actions => {
  const episodes = actions.addCollection("Episode");

  const publisher = await axios.get(endpoint("wp", "v2", "episodes")).then(({ data = [] }) => data.map(({ id, slug, content: { rendered } }) => ({ id, slug, content: rendered })));

  await Promise.all(
    publisher.map(({ id, slug, content }) =>
      axios
        .get(endpoint("podlove-web-player", "shortcode", "publisher", id))
        .then(({ data }) => ({ ...data, id: slug, duration: toPlayerTime(data.duration), content, chapters: (data.chapters || []).reduce(parseChapters(toPlayerTime(data.duration)), []) }))
        .then(data => episodes.addNode(data))
    )
  );
};
