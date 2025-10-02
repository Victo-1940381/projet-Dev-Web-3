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

/**
 * Get all users.
 */
function getAll(): Promise<IJeuxVideo[]> {
  return JeuxVideoRepo.getAll();
}
function getOne(id:string) : Promise<IJeuxVideo | null>{
    return JeuxVideoRepo.getOne(id);
}

function getPlatforme(platforme:string) : Promise<IJeuxVideo[]>{
    return JeuxVideoRepo.getPlatforme(platforme);
}
function getGenre(genre: string): Promise<IJeuxVideo[]>{
    return JeuxVideoRepo.getGenre(genre);
}
/**
 * Add one user.
 */
function addOne(jeuxvideo: IJeuxVideo): Promise<void> {
  return JeuxVideoRepo.add(jeuxvideo);
}

/**
 * Update one user.
 */
async function updateOne(jeuxvideo:IJeuxVideo): Promise<void> {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.delete(id);
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
