import { IJeuxVideo,JeuxVideo } from '@src/models/JeuxVideo';
import ENV from "@src/common/constants/ENV";
import mongoose from "mongoose";
import { error } from 'console';


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get one user.
 */
async function getOne(id: string): Promise<IJeuxVideo | null> {
 const jeuxvideo = await JeuxVideo.findOne({
    id: id,
 });
 return jeuxvideo;
}
async function getPlatformeERSB(platforme: string,ersb:string) : Promise<IJeuxVideo[]> {
    const jeuxvideo = await JeuxVideo.find({
        platforme:platforme,
        ESRB:ersb,
    })
    return jeuxvideo
}
/**
 * Get all users.
 */
async function getAll(): Promise<IJeuxVideo[]> {
  const jeuxvideos = await JeuxVideo.find();
  return jeuxvideos;
}
/**
 * Add one user.
 */
async function add(jeuxvideo: IJeuxVideo): Promise<void> {
  const nouveljeuxvideo = new JeuxVideo(jeuxvideo);
  await nouveljeuxvideo.save();
}

/**
 * Update a user.
 */
async function update(jeuxvideo:IJeuxVideo): Promise<void> {
 const jeuxAModifier = await JeuxVideo.findOne({ id: jeuxvideo.id});
 if (jeuxAModifier === null){
    throw new Error("jeux video non trouvé");
 }
 jeuxAModifier.nom = jeuxvideo.nom;
 jeuxAModifier.platforme = jeuxvideo.platforme;
 jeuxAModifier.dateSortieinitial = jeuxvideo.dateSortieinitial;
 jeuxAModifier.nombreCopieVendu = jeuxvideo.nombreCopieVendu;
 jeuxAModifier.prix = jeuxvideo.prix;
 jeuxAModifier.developpeur = jeuxvideo.developpeur;
 jeuxAModifier.editeur = jeuxvideo.editeur;
 jeuxAModifier.genre = jeuxvideo.genre;
 jeuxAModifier.ESRB = jeuxvideo.ESRB;
 jeuxAModifier.modeDeJeu = jeuxvideo.modeDeJeu;
 jeuxAModifier.dureeJeux = jeuxvideo.dureeJeux;
 jeuxAModifier.disponible = jeuxvideo.disponible;
 jeuxAModifier.Metacritic = jeuxvideo.Metacritic;
  
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
    await JeuxVideo.deleteOne({id:id});
}



/**
 * Insert multiple users. Can't do multiple at once cause using a plain file 
 * for nmow.



/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getPlatformeERSB,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
