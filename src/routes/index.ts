import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import JeuxVideoRoute from './JeuxVideoRoute';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { error } from 'console';
import { JeuxVideo } from '@src/models/JeuxVideo';

import UserRoutes from './UserRoutes';
import JetonRoutes from './JetonRoutes';
/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

function validateJeuxVideo (req:Request,res:Response,next:NextFunction){
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
const tokenRouter = Router();
tokenRouter.get(Paths.GenerateToken.Get, JetonRoutes.generateToken);

// ** Add tokenRouter ** //
apiRouter.use(Paths.GenerateToken.Base, tokenRouter);
// Init router
const JeuxVideoRouter = Router();

// Get all jeuxvideo
JeuxVideoRouter.get(Paths.jeuxvideo.Getall, JeuxVideoRoute.getAll);
JeuxVideoRouter.get(Paths.jeuxvideo.GetOne, JeuxVideoRoute.getOne);
JeuxVideoRouter.get(Paths.jeuxvideo.GetGenre, JeuxVideoRoute.getGenre);
JeuxVideoRouter.get(Paths.jeuxvideo.GetPlatforme, JeuxVideoRoute.getPlatforme);
JeuxVideoRouter.post(Paths.jeuxvideo.Add,validateJeuxVideo, JeuxVideoRoute.add);
JeuxVideoRouter.put(Paths.jeuxvideo.Update,validateJeuxVideo, JeuxVideoRoute.update);
JeuxVideoRouter.delete(Paths.jeuxvideo.Delete, JeuxVideoRoute.delete);


const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);


// Add JeuxVideoRouter
apiRouter.use(Paths.jeuxvideo.Base, JeuxVideoRouter);
apiRouter.use(Paths.Users.Base, userRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
