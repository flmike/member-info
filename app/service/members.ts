import { MemberDto } from '../model/dto/member-dto';
import { documentClient } from '../model';

export class MembersService {

  protected async createMember (params: MemberDto): Promise<object> {
    try {
      await documentClient.put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          email: params.email,
          phoneNumber: params.phoneNumber,
          firstName: params.firstName,
          lastName: params.lastName,
          middleInitial: params.middleInitial,
        },
      }).promise();

      return params;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  protected async updateMembers (email: string, params: MemberDto) {
    try {
      await documentClient.put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          email,
          phoneNumber: params.phoneNumber,
          firstName: params.firstName,
          lastName: params.lastName,
          middleInitial: params.middleInitial,
        },
      }).promise();

      return params;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  protected async findMembers () {
    return await documentClient.scan({ TableName: process.env.DYNAMODB_TABLE }).promise();
  }

  protected async findOneMemberById (email: string) {
    return await documentClient.get({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        email,
      },
    }).promise();
  }

  protected async deleteOneMemberById (email: string) {
    return await documentClient.delete({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        email,
      },
    }).promise();
  }
}
