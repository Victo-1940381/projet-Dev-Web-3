import JetonService from '@src/services/JetonService';
import User from '@src/models/User';
import { IReq, IRes } from './common/types';
import { parseReq } from './common/util';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
// **** Functions **** //

/******************************************************************************
                                Constants
******************************************************************************/

const Validators = {
  generatetoken: parseReq({ userLogin: User.testlogin }),
} as const;

/**
 * Générer un jeton.
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function generateToken(req: IReq, res: IRes) {
  const { userLogin } = Validators.generatetoken(req.body);
  const token = await JetonService.generateToken(userLogin);
  if(token.trim().length === 0){
    return res.status (HttpStatusCodes.NOT_FOUND).send({"message":"l'utilisateur n'existe pas"})
  }
  else{return res.status (HttpStatusCodes.OK).send({ token: token });}
  
}

// **** Export default **** //

export default {
  generateToken,
} as const;