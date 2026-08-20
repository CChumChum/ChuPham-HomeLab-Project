export const serviceTargets = [
  {
    id: "jellyfin",
    url: process.env.JELLYFIN_URL,
    access: "family",
  },
  {
    id: "immich",
    url: process.env.IMMICH_URL,
    access: "family",
  },
  {
    id: "audiobookshelf",
    url: process.env.AUDIOBOOKSHELF_URL,
    access: "family",
  },
  {
    id: "seerr",
    url: process.env.SEERR_URL,
    access: "family",
  },
  {
    id: "sonarr",
    url: process.env.SONARR_URL,
    access: "admin",
  },
  {
    id: "radarr",
    url: process.env.RADARR_URL,
    access: "admin",
  },
  {
    id: "prowlarr",
    url: process.env.PROWLARR_URL,
    access: "admin",
  },
  {
    id: "deluge",
    url: process.env.DELUGE_URL,
    access: "admin",
  },
] as const;
