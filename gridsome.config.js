// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Podlovers",

  plugins: [
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        config: './tailwind.config.js'
      }
    }
  ],
  templates: {
    Episode: '/episode/:id'
  }
};
