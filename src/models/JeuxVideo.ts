import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';


import mongoose, { model, Schema } from 'mongoose';


/******************************************************************************
                                 Constants
******************************************************************************/



/******************************************************************************
                                  Types
******************************************************************************/

export interface IJeuxVideo {
  id?: string;
  nom: string;
  plateforme: string[];
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
  id:{type:String},
  nom:{type:String, required:[true,'le nom est requis']},
  plateforme:{
    type:[String],
    validate:{
      validator: function(v:string[] | null| undefined) {
        return Array.isArray(v) && v.length>0;
      },
      message: 'il doit avoir au moins une plateforme dans la liste',
    },
    required:[true,'les plateformes du jeux sont requis'],
  },
  dateSortieinitial:{type:Date,required:[true,'la date de sortie du jeux est requis']},
  nombreCopieVendu:{type:Number,required:[true,'le nombre de copie vendu du jeux est requis']},
  prix:{type:Number,required:[true,'le prix du jeux est requis'],min:[0,'le prix doit etre positif']},
  developpeur:{type:[String],required:[true,'le ou les developpeur sont requis']},
  editeur:{type:[String],required:[true,'le ou les editeur sont requis']},
  genre:{type:[String],required:[true,'le ou les genre sont requis']},
  ESRB:{type:String,validate:{
    validator: function (v:string){
      return /(\bA\b)|(\bT\b)|(\bM\b)|(\bE\b)|(\bRP\b)/.test(v);
    },
    message: 'Le Classement ESRB doit etre soit : A , E, T, M ou  RP',
  }},
  modeDeJeu:{type:[String],required:[true,'les modes de jeux sont requis']},
  dureeJeux:{type:Number,required:[true,'la durée du jeux est requis']},
  disponible:{type:Boolean,required:[true,'la disponibilité du jeu est requis']},
  Metacritic:{type:Number,max:[100,'le score metacritic ne doit pas dépassé 100']},
});





/******************************************************************************
                                Export default
******************************************************************************/
mongoose.pluralize(null);
export const JeuxVideo = model<IJeuxVideo>('JeuxVideo', JeuxVideoSchema);