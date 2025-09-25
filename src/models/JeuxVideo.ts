import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';

import { isRelationalKey, transIsDate } from '@src/common/util/validators';
import { IModel } from './common/types';
import { platform } from 'os';
import { model, Schema } from 'mongoose';


/******************************************************************************
                                 Constants
******************************************************************************/



/******************************************************************************
                                  Types
******************************************************************************/

export interface IJeuxVideo extends IModel {
  id: number;
  nom: string;
  platforme: string[];
  dateSortieinitial:Date;
  nombreCopieVendu:number;
  prix:number;
  developpeur:string[];
  editeur:string[];
  genre:string[];
  ESRB?:string;
  modeDeJeu:string[];
  dureeJeux:number;
  disponible:boolean;
  Metacritic?:number;
}

const JeuxVideoSchema = new Schema<IJeuxVideo>({
    id:{type:Number, required:[true,"l'id est requis"],min:[0,"l'id ne doit pas etre negatif"]},
    nom:{type:String, required:[true,"le nom est requis"]},
    platforme:{type:[String],required:[true,"les platformes du jeux sont requis"]},
    dateSortieinitial:{type:Date,required:[true,"la date de soritir du jeux est requis"]},
    nombreCopieVendu:{type:Number,required:[true,"le nombre de copie vendu du jeux est requis"]},
    prix:{type:Number,required:[true,"le prix du jeux est requis"],min:[0,"le prix doit etre positif"]},
    developpeur:{type:[String],required:[true,"le ou les developpeur sont requis"]},
    editeur:{type:[String],required:[true,"le ou les editeur sont requis"]},
    genre:{type:[String],required:[true,"le ou les genre sont requis"]},
    ESRB:{type:String},
    modeDeJeu:{type:[String],required:[true,"les modes de jeux sont requis"]},
    dureeJeux:{type:Number,required:[true,"la durée du jeux est requis"]},
    disponible:{type:Boolean,required:[true,"la disponibilité du jeu est requis"]},
    Metacritic:{type:Number},
});



/*true,"la disponibilité du jeu est requis"*
,
Metacritic:{type:Number}, * Check is a user object. For the route validation.


/******************************************************************************
                                Export default
******************************************************************************/

export const JeuxVideo = model<IJeuxVideo>('JeuxVideo', JeuxVideoSchema);