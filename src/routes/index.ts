import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import JeuxVideoRoute from './JeuxVideoRoute';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { error } from 'console';
import { JeuxVideo } from '@src/models/JeuxVideo';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

function validateJeuxVideoadd (req:Request,res:Response,next:NextFunction){
    if(req.body === null){
        res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({error:"jeuxvideo requis"})
        .end();
        return;
    }
    if(req.body.jeuxvideo === null){
         res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({error:"jeuxvideo requis"})
        .end();
        return;
    }
    const nouveljeuxvideo = new JeuxVideo(req.body.jeuxvideo);
    const error = nouveljeuxvideo.validateSync();
    if(error !== null && error !== undefined){
        res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
    }else{
        next();
    }
}
function validateJeuxVideoupdate (req:Request,res:Response,next:NextFunction){
    if(req.body === null){
        res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({error:"jeuxvideo requis"})
        .end();
        return;
    }
    if(req.body.jeuxvideo === null){
         res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({error:"jeuxvideo requis"})
        .end();
        return;
    }
    const nouveljeuxvideo = new JeuxVideo(req.body.jeuxvideo);
    const error = nouveljeuxvideo.validateSync();
    if(error !== null && error !== undefined){
        res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
    }else{
        next();
    }
}
// ** Add JeuxVideoRouter ** //

// Init router
const JeuxVideoRouter = Router();

// Get all jeuxvideo
JeuxVideoRouter.get(Paths.jeuxvideo.Getall, JeuxVideoRoute.getAll);
JeuxVideoRouter.get(Paths.jeuxvideo.GetOne, JeuxVideoRoute.getOne);
JeuxVideoRouter.get(Paths.jeuxvideo.GetGenre, JeuxVideoRoute.getGenre);
JeuxVideoRouter.get(Paths.jeuxvideo.GetPlatforme, JeuxVideoRoute.getPlatforme);
JeuxVideoRouter.post(Paths.jeuxvideo.Add,validateJeuxVideoadd, JeuxVideoRoute.add);
JeuxVideoRouter.put(Paths.jeuxvideo.Update,validateJeuxVideoupdate, JeuxVideoRoute.update);
JeuxVideoRouter.delete(Paths.jeuxvideo.Delete, JeuxVideoRoute.delete);

// Add JeuxVideoRouter
apiRouter.use(Paths.jeuxvideo.Base, JeuxVideoRouter);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
