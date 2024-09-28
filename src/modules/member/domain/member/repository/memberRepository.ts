import { Member } from "../entity/member";
import { MemberId } from "../value/memberId";

export interface MemberRepository {
    findById(id: MemberId): Member;
}