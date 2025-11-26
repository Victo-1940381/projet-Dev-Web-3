
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
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
