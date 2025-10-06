import { IJeuxVideo,JeuxVideo } from '@src/models/JeuxVideo';
import ENV from "@src/common/constants/ENV";
import mongoose from "mongoose";
import { error } from 'console';


/******************************************************************************
                                Functions
******************************************************************************/


async function getOne(id: string): Promise<IJeuxVideo | null> {
 const jeuxvideo = await JeuxVideo.findById(id);
 return jeuxvideo;
}
async function getPlatforme(plateforme: string) : Promise<IJeuxVideo[]> {
    const jeuxvideo = await JeuxVideo.find({
        plateforme:plateforme,
    })
    return jeuxvideo
}

async function getAll(): Promise<IJeuxVideo[]> {
  const jeuxvideos = await JeuxVideo.find();
  return jeuxvideos;
}
async function getGenre(genre: string) : Promise<IJeuxVideo[]> {
    const jeuxvideo = await JeuxVideo.find({
       genre:genre
    })
    return jeuxvideo
}

async function add(jeuxvideo: IJeuxVideo): Promise<void> {
  const nouveljeuxvideo = new JeuxVideo(jeuxvideo);
  await nouveljeuxvideo.save();
}


async function update(jeuxvideo:IJeuxVideo): Promise<void> {
 const jeuxAModifier = await JeuxVideo.findById(jeuxvideo.id);
 if (jeuxAModifier === null){
    throw new Error("jeux video non trouvé");
 }
 jeuxAModifier.nom = jeuxvideo.nom;
 jeuxAModifier.plateforme = jeuxvideo.plateforme;
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
jeuxAModifier.save();
}


async function delete_(id: string): Promise<void> {
    await JeuxVideo.deleteOne({_id:id});
}





/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getPlatforme,
  getAll,
  getGenre,
  add,
  update,
  delete: delete_,
} as const;
