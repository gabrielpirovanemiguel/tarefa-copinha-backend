import type { Group, Prisma } from "@/@types/prisma/client.js";


export interface GroupRepository {
    createGroup(data: Prisma.GroupCreateInput): Promise<Group>
    findGroupWhereUnique(where: Prisma.GroupWhereUniqueInput, include?: Prisma.GroupInclude): Promise<Group | null>
}