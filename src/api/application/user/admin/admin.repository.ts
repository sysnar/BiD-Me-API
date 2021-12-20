import { EntityRepository, Repository } from 'typeorm';

import { Admin } from '@app/models/user/Admin.entity';
import { IBaseId } from '@app/api/structure/IBase';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  /*
   *  Admin 중 해당하는 User ID의 Admin 정보 조회
   */
  async findAdminByUserId(userId: IBaseId): Promise<Admin> {
    return await this.createQueryBuilder('admin') //
      .where('user_id = :id', userId)
      .getOne();
  }

  /*
   *  Admin 중 해당하는 User ID의 Admin 정보를 삭제
   */
  async deleteAdminByUserId(userId: IBaseId): Promise<void> {
    await this.createQueryBuilder('admin') //
      .delete()
      .where('user_id = :id', userId)
      .execute();
  }
}
