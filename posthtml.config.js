// Reference:
// https://github.com/parcel-bundler/parcel/issues/1209#issuecomment-891760840
module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        google_analytics: process.env.google_analytics,
        microsoft_clarity: process.env.microsoft_clarity,
      },
    },
  },
};
