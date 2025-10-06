import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

import JeuxVideoRepo from '@src/repos/JeuxVideoRepo';
import { IJeuxVideo } from '@src/models/JeuxVideo';


/******************************************************************************
                                Constants
******************************************************************************/

export const JEUXVIDEO_NON_TROUVE = 'jeux vidéo non trouvée';


/******************************************************************************
                                Functions
******************************************************************************/

function getAll(): Promise<IJeuxVideo[]> {
  return JeuxVideoRepo.getAll();
}
function getOne(id:string) : Promise<IJeuxVideo | null>{
    return JeuxVideoRepo.getOne(id);
}

function getPlatforme(plateforme:string) : Promise<IJeuxVideo[]>{
    return JeuxVideoRepo.getPlatforme(plateforme);
}
function getGenre(genre: string): Promise<IJeuxVideo[]>{
    return JeuxVideoRepo.getGenre(genre);
}

function addOne(jeuxvideo: IJeuxVideo): Promise<void> {
  return JeuxVideoRepo.add(jeuxvideo);
}


async function updateOne(jeuxvideo:IJeuxVideo): Promise<void> {
 const persists = await JeuxVideoRepo.getOne(jeuxvideo.id);
 if(!persists){
  throw new RouteError(HttpStatusCodes.NOT_FOUND, JEUXVIDEO_NON_TROUVE);
 }
 return JeuxVideoRepo.update(jeuxvideo);
}


async function _delete(id: string): Promise<void> {
  const persists = await JeuxVideoRepo.getOne(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      JEUXVIDEO_NON_TROUVE,
    );
  }

  return JeuxVideoRepo.delete(id);
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  getOne,
  getGenre,
  getPlatforme,
  addOne,
  updateOne,
  delete: _delete,
} as const;
