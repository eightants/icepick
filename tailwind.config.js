const production = !process.env.ROLLUP_WATCH;
module.exports = {
  theme: {
    screens: {
      'md': {'max': '720px'},
    },
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
  ],
  purge: {
    content: [
     "./src/*.svelte",
    ],
    enabled: false // disable purge in dev
  },
};