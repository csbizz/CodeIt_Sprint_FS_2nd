const ogs = require('open-graph-scraper');

async function getOgImageUrl(url) {
  const { result } = await ogs({ url });
  const ogImageUrl = result?.ogImage?.[0]?.url ?? null;
  return ogImageUrl;
}

module.exports = {
  getOgImageUrl,
};
