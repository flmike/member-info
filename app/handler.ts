
import { Handler, Context } from 'aws-lambda';

import { MembersController } from './controller/members';
const membersController = new MembersController();

export const create: Handler = (event: any, context: Context) => {
  return membersController.create(event, context);
};

export const update: Handler = (event: any) => membersController.update(event);

export const find: Handler = () => membersController.find();

export const findOne: Handler = (event: any) => membersController.findOne(event);

export const deleteOne: Handler = (event: any) => membersController.deleteOne(event);
