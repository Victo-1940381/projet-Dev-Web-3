
export default {
  Base: '/api',
  jeuxvideo: {
    Base: '/jeuxvideo',
    Getall: '/liste',
    GetOne: '/:id',
    GetGenre: '/genre/:genre',
    GetPlatforme: '/plateforme/:plateforme',
    Add: '/ajouter',
    Update: '/modifier',
    Delete: '/supprimer/:id',
  },
} as const;
