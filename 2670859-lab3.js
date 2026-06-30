function getMusicTitlesByYear(tracks) {
  if (!Array.isArray(tracks) || tracks.length === 0) return {};

  const result = tracks.reduce((acc, track) => {
    if (
      !track ||
      typeof track.year !== 'number' ||
      !Number.isFinite(track.year) ||
      typeof track.title !== 'string' ||
      typeof track.artist !== 'string'
    ) return acc;

    const { year, title } = track;
    if (!acc[year]) acc[year] = [];
    acc[year].push(title);
    return acc;
  }, {});

  for (const year of Object.keys(result)) {
    result[year].sort();
  }

  return result;
}

function filterAndTransformTracks(tracks, criteria) {
  if (!Array.isArray(tracks) || tracks.length === 0) return [];

  const { minYear, maxYear, artist } = criteria || {};

  return tracks
    .filter(track => {
      if (
        !track ||
        typeof track.title !== 'string' ||
        typeof track.artist !== 'string' ||
        typeof track.year !== 'number'
      ) return false;

      if (minYear !== undefined && track.year < minYear) return false;
      if (maxYear !== undefined && track.year > maxYear) return false;
      if (artist !== undefined && track.artist.toLowerCase() !== artist.toLowerCase()) return false;

      return true;
    })
    .map(({ title, artist, year }) => ({
      title,
      artist,
      year,
      decade: `${Math.floor(year / 10) * 10}s`,
    }));
}

module.exports = {
  getMusicTitlesByYear,
  filterAndTransformTracks,
};
