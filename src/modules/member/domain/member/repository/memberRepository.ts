import { Member } from '../entity/member';
import { MemberId } from '../../../../../shared/valueObject/memberId';

export interface MemberRepository {
  findById(id: MemberId): Member;
}
