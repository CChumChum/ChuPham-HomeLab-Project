export const serviceUrls = {
  jellyfin: import.meta.env.VITE_JELLYFIN_URL,
  immich: import.meta.env.VITE_IMMICH_URL,
  audiobookshelf: import.meta.env.VITE_AUDIOBOOKSHELF_URL,
  seerr: import.meta.env.VITE_SEERR_URL,

  sonarr: import.meta.env.VITE_SONARR_URL,
  radarr: import.meta.env.VITE_RADARR_URL,
  prowlarr: import.meta.env.VITE_PROWLARR_URL,
  deluge: import.meta.env.VITE_DELUGE_URL,
} as const;
