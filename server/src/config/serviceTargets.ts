export const serviceTargets = [
  {
    id: "jellyfin",
    url: process.env.JELLYFIN_URL,
  },
  {
    id: "immich",
    url: process.env.IMMICH_URL,
  },
  {
    id: "audiobookshelf",
    url: process.env.AUDIOBOOKSHELF_URL,
  },
  {
    id: "seerr",
    url: process.env.SEERR_URL,
  },
  {
    id: "sonarr",
    url: process.env.SONARR_URL,
  },
  {
    id: "radarr",
    url: process.env.RADARR_URL,
  },
  {
    id: "prowlarr",
    url: process.env.PROWLARR_URL,
  },
  {
    id: "deluge",
    url: process.env.DELUGE_URL,
  },
] as const;
