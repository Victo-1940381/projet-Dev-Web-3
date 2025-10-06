import insertUrlParams from 'inserturlparams';
import { customDeepCompare } from 'jet-validators/utils';

import JeuxVideoRepo from '@src/repos/JeuxVideoRepo';
import { IJeuxVideo,JeuxVideo } from '@src/models/JeuxVideo';
import { JEUXVIDEO_NON_TROUVE} from '@src/services/JeuxVideoService';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { ValidationError } from '@src/common/util/route-errors';

import Paths from './common/Paths';
import { parseValidationErr, TRes } from './common/util';
import { agent } from './support/setup';


const DB_JEUXVIDEO: IJeuxVideo[] = [
        {
            id:"1",
  nom: "super mario bros wonder",
  plateforme: [
    "Nintendo Switch"
  ],
  dateSortieinitial: new Date(2023-11-23),
  nombreCopieVendu: 16030000,
  prix: 84.99,
  developpeur: [
    "Nintendo"
  ],
  editeur: [
    "Nintendo"
  ],
  genre: [
    "Platforme"
  ],
  ESRB: "E",
  modeDeJeu: [
    "solo",
    "multijoueur local",
    "multijoueur en ligne"
  ],
  dureeJeux: 10,
  disponible: true,
  Metacritic: 92
},
{
  id:"2",
  nom: "super mario 3d all-star",
  plateforme: [
    "Nintendo Switch"
  ],
  dateSortieinitial: new Date(2020-10-18),
  nombreCopieVendu: 9007000,
  prix: 79.99,
  developpeur: [
    "Nintendo"
  ],
  editeur: [
    "Nintendo"
  ],
  genre: [
    "Platforme 3d",
    "action-aventure"
  ],
  ESRB: "E",
  modeDeJeu: [
    "solo",
    "multijoueur local"
  ],
  dureeJeux: 0,
  disponible: false,
  Metacritic: 82
},
{
 id:"3",
  nom: "Doom",
  plateforme: [
    "Windows",
    "Mac OS",
    "Linux",
    "32X",
    "3DO",
    "GBA",
    "Jaguar",
    "Playstation",
    "Xbox 360",
    "Saturn",
    "Super nintendo",
    "Nintendo Switch"
  ],
  dateSortieinitial: new Date(1994-1-10),
  nombreCopieVendu: 20000000,
  prix: 6.04,
  developpeur: [
    "id software",
    " Nightdive Studio"
  ],
  editeur: [
    "Bethesda"
  ],
  genre: [
    "FPS"
  ],
  ESRB: "M",
  modeDeJeu: [
    "solo"
  ],
  dureeJeux: 5,
  disponible: true,
  Metacritic: 82
}] as const;
const compareJeuxVideoArrays = customDeepCompare ({
    onlyCompareProps: ['nom','plateforme','dateSortieinitial','nombreCopieVendu','prix','developpeur','editeur','genre','ESRB','modeDeJeu','dureeJeux','disponible','Metacritic'],
});
const mockify = require('@jazim/mock-mongoose');


describe('JeuxVideoRouter', () => {
    let dbJeuxvideo: IJeuxVideo[]= [];

    describe(`'GET:${Paths.jeuxvideo.Getall}'`, () => {
        it(
            'doit retourné un JSON avec tous les Jeux vidéo et un code de ' + `of '${HttpStatusCodes.OK}' si réussi`,
            async () => {
                const data = [...DB_JEUXVIDEO];
                mockify(JeuxVideo).toReturn(data, 'find');
                const res: TRes<{ jeuxVideos: IJeuxVideo[]}> = await agent.get(Paths.jeuxvideo.Getall);

                expect(res.status).toBe(HttpStatusCodes.OK);
                expect(compareJeuxVideoArrays(res.body.jeuxVideos, DB_JEUXVIDEO)).toBeTruthy();
            },
        );
    });
    describe(`'GET:${Paths.jeuxvideo.GetOne}'`, () => {
        const getPath = (id: string) => 
            insertUrlParams(Paths.jeuxvideo.GetOne, { id });
        it(
            `doit retourné un code de '${HttpStatusCodes.OK}' si réussi`,
            async () =>{
                mockify(JeuxVideo)
                .toReturn(DB_JEUXVIDEO[0], 'findOne')
                const id = DB_JEUXVIDEO[0].id
               const res: TRes<{jeuxvideo: IJeuxVideo}> = await agent.get(getPath(id));
                expect(res.status).toBe(HttpStatusCodes.OK);
                expect(compareJeuxVideoArrays(res.body.jeuxvideo, DB_JEUXVIDEO )).toBeTruthy();
            },
        );
    });
      describe(`'GET:${Paths.jeuxvideo.GetGenre}'`, () => {
        const getPath = (genre: string) => 
            insertUrlParams(Paths.jeuxvideo.GetGenre, { genre });
        it(
            `doit retourné un code de '${HttpStatusCodes.OK}' si réussi`,
            async () =>{
                mockify(JeuxVideo)
                .toReturn(DB_JEUXVIDEO[0], 'find')
                const genre = DB_JEUXVIDEO[0].genre[0]
               const res: TRes<{jeuxvideos: IJeuxVideo[]}> = await agent.get(getPath(genre));
                expect(res.status).toBe(HttpStatusCodes.OK);
                expect(compareJeuxVideoArrays(res.body.jeuxvideos, DB_JEUXVIDEO )).toBeTruthy();
            },
        );
    });
      describe(`'GET:${Paths.jeuxvideo.GetPlatforme}'`, () => {
        const getPath = (plateforme: string) => 
            insertUrlParams(Paths.jeuxvideo.GetPlatforme, { plateforme });
        it(
            `doit retourné un code de '${HttpStatusCodes.OK}' si réussi`,
            async () =>{
                mockify(JeuxVideo)
                .toReturn(DB_JEUXVIDEO[0], 'find')
                const plateforme = DB_JEUXVIDEO[0].plateforme[0]
               const res: TRes<{jeuxvideos: IJeuxVideo[]}> = await agent.get(getPath(plateforme));
                expect(res.status).toBe(HttpStatusCodes.OK);
                expect(compareJeuxVideoArrays(res.body.jeuxvideos, DB_JEUXVIDEO )).toBeTruthy();
            },
        );
    });
    describe(`'POST:${Paths.jeuxvideo.Add}'`, () => {
    // Ajout réussi
    it(
      `doit retourner le code '${HttpStatusCodes.CREATED}' si la ` +
        'transaction est réussie',
      async () => {
        const jeuxvideo: IJeuxVideo = {
            id:'12',
             nom: "test",
  plateforme: [
    "Windows",
    "Mac OS",
    "Linux"
  ],
  dateSortieinitial: new Date(1994-1-10),
  nombreCopieVendu: 200,
  prix: 6.00,
  developpeur: [
    "id software"
  ],
  editeur: [
    "Bethesda"
  ],
  genre: [
    "FPS"
  ],
  ESRB: "A",
  modeDeJeu: [
    "solo"
  ],
  dureeJeux: 1,
  disponible: false,
  Metacritic: 5

};
        // Préparer le simulacre de Mongoose
        mockify(JeuxVideo).toReturn(jeuxvideo, 'save');
        const res = await agent.post(Paths.jeuxvideo.Add).send({ jeuxvideo });
        expect(res.status).toBe(HttpStatusCodes.CREATED);
      },
    );

    // Paramètre manquant
    it(
      'doit retourner un JSON avec les erreurs et un code de ' +
        `'${HttpStatusCodes.BAD_REQUEST}' si un paramètre est ` +
        'manquant.',
      async () => {
        const res: TRes = await agent
          .post(Paths.jeuxvideo.Add)
          .send({ auteur: null });
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe('jeuxvideo requis');
      },
    );
  });
   describe(`'PUT:${Paths.jeuxvideo.Update}'`, () => {
    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la mise à jour ` +
        'est réussie.',
      async () => {
        const jeuxvideo = DB_JEUXVIDEO[0];
        jeuxvideo.nom = "test de modif";

        // Préparer le simulacre de Mongoose
        mockify(JeuxVideo).toReturn(jeuxvideo, 'findById').toReturn(jeuxvideo, 'save');

        const res = await agent.put(Paths.jeuxvideo.Update).send({ jeuxvideo });
        expect(res.status).toBe(HttpStatusCodes.OK);
      },
    );
    it(
      'doit retourner un JSON avec erreur  ' +
        `'${JEUXVIDEO_NON_TROUVE}' et un code de ` +
        `'${HttpStatusCodes.NOT_FOUND}' si l'id n'est pas trouvé.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(JeuxVideo).toReturn(null, 'findById');
        const jeuxvideo = {
            id: 4,
           nom: "test",
            plateforme: [
    "Windows",
  ],
  dateSortieinitial: new Date(1994-1-10),
  nombreCopieVendu: 200,
  prix: 6.00,
  developpeur: [
    "id software"
  ],
  editeur: [
    "Bethesda"
  ],
  genre: [
    "FPS"
  ],
  ESRB: "A",
  modeDeJeu: [
    "solo"
  ],
  dureeJeux: 1,
  disponible: false,
  Metacritic: 5

          },
          res: TRes = await agent.put(Paths.jeuxvideo.Update).send({ jeuxvideo });

        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(JEUXVIDEO_NON_TROUVE);
      },
    );
  });
    describe(`'DELETE:${Paths.jeuxvideo.Delete}'`, () => {
    const getPath = (id: string) =>
      insertUrlParams(Paths.jeuxvideo.Delete, { id });

    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la ` +
        'suppression est réussie.',
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(JeuxVideo)
          .toReturn(DB_JEUXVIDEO[0], 'findOne')
          .toReturn(DB_JEUXVIDEO[0], 'findOneAndRemove');
        const id = DB_JEUXVIDEO[0].id,
          res = await agent.delete(getPath(id));
        expect(res.status).toBe(HttpStatusCodes.OK);
      },
    );

    // Réservation non trouvée
    it(
      'doit retourner un JSON avec erreur ' +
        `'${JEUXVIDEO_NON_TROUVE}' et un code de  ` +
        `'${HttpStatusCodes.NOT_FOUND}' si le Jeux vidéo est introuvable.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(JeuxVideo).toReturn(null, 'findOne');

        const res: TRes = await agent.delete(getPath('-1'));
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(JEUXVIDEO_NON_TROUVE);
      },
    );
  });
});
