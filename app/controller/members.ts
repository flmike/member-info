import { Context } from 'aws-lambda';
import { MessageUtil } from '../utils/message';
import { MembersService } from '../service/members';
import { MemberDto } from '../model/dto/member-dto';

export class MembersController extends MembersService {

  async create (event: any, context?: Context) {
    console.log('functionName', context.functionName);
    const params: MemberDto = JSON.parse(event.body);

    try {
      const result = await this.createMember(params);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async update (event: any) {
    const id: string = event.pathParameters.id;
    const params: MemberDto = JSON.parse(event.body);

    try {
      const result = await this.updateMembers(id, params);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async find () {
    try {
      const result = await this.findMembers();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async findOne (event: any) {
    const id: string = event.pathParameters.id;

    try {
      const result = await this.findOneMemberById(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  async deleteOne (event: any) {
    const id: string = event.pathParameters.id;

    try {
      const result = await this.deleteOneMemberById(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
