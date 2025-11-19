import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import JeuxVideoService from '@src/services/JeuxVideoService';
import { IJeuxVideo } from '@src/models/JeuxVideo';

import { IReq, IRes } from './common/types';

/******************************************************************************
                                Functions
******************************************************************************/


async function getAll(_: IReq, res: IRes) {
  const jeuxvideos = await JeuxVideoService.getAll();
  res.status(HttpStatusCodes.OK).json({ jeuxvideos });
}
async function getOne(req: IReq, res:IRes) {
    const { id } = req.params;
   const jeuxvideo= await JeuxVideoService.getOne(id as string);
   if (jeuxvideo == null){
    res.status (HttpStatusCodes.NOT_FOUND).json({ jeuxvideo});
   } else{
    res.status (HttpStatusCodes.OK).json({ jeuxvideo });
   }
}
async function getGenre(req: IReq, res:IRes) {
    const { genre } = req.params;
    const jeuxvideos = await JeuxVideoService.getGenre(genre as string);
    if (jeuxvideos.length ===0){
      res.status (HttpStatusCodes.NOT_FOUND).json({jeuxvideos});
    } else{
      res.status (HttpStatusCodes.OK).json({jeuxvideos});
    }
    
}
async function getPlatforme(req: IReq, res:IRes) {
    const { plateforme } = req.params;
    const jeuxvideos = await JeuxVideoService.getPlatforme(plateforme as string);
    if (jeuxvideos.length ===0){
      res.status (HttpStatusCodes.NOT_FOUND).json({jeuxvideos});
    } else{
      res.status (HttpStatusCodes.OK).json({jeuxvideos});
    }
}

async function add(req: IReq, res: IRes) {
  const { jeuxvideo } = req.body;
  await JeuxVideoService.addOne(jeuxvideo as IJeuxVideo);
  res.status(HttpStatusCodes.CREATED).json({"message":"le jeux a été ajouter"});
  
}


async function update(req: IReq, res: IRes) {
  const { jeuxvideo } = req.body;
  await JeuxVideoService.updateOne(jeuxvideo as IJeuxVideo);
  res.status(HttpStatusCodes.OK).json({"message":"le jeux a été modifié"});
}


async function delete_(req: IReq, res: IRes) {
  const { id } = req.params;
  await JeuxVideoService.delete(id as string);
  res.status(HttpStatusCodes.OK).json({"message":`jeux supprimer avec l'id: ${id}` });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  getGenre,
  getOne,
  getPlatforme,
  add,
  update,
  delete: delete_,
} as const;