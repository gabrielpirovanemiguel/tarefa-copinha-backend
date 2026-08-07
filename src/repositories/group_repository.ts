import type { Group, Prisma } from "@/@types/prisma/client.js";


export interface GroupRepository {
    createGroup(data: Prisma.GroupCreateInput): Promise<Group>
    getGroupByPublicId(publicId: string, include?: Prisma.GroupInclude): Promise<Group | null>
    findGroupWhereUnique(where: Prisma.GroupWhereUniqueInput, include?: Prisma.GroupInclude): Promise<Group | null>
    updateGroup(where: Prisma.GroupWhereUniqueInput, data: Prisma.GroupUpdateInput, include?: Prisma.GroupInclude): Promise<Group>
    deleteGroup(where: Prisma.GroupWhereUniqueInput): Promise<void>
}