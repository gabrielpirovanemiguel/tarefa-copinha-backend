import {
  __export
} from "./chunk-PZ5AY32C.js";

// src/@types/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  GameResultScalarFieldEnum: () => GameResultScalarFieldEnum,
  GroupScalarFieldEnum: () => GroupScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  LogScalarFieldEnum: () => LogScalarFieldEnum,
  MatchScalarFieldEnum: () => MatchScalarFieldEnum,
  ModelName: () => ModelName,
  NewsScalarFieldEnum: () => NewsScalarFieldEnum,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  StadiumScalarFieldEnum: () => StadiumScalarFieldEnum,
  TeamAResultScalarFieldEnum: () => TeamAResultScalarFieldEnum,
  TeamBResultScalarFieldEnum: () => TeamBResultScalarFieldEnum,
  TeamScalarFieldEnum: () => TeamScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime.PrismaClientValidationError;
var sql = runtime.sqltag;
var empty2 = runtime.empty;
var join2 = runtime.join;
var raw2 = runtime.raw;
var Sql2 = runtime.Sql;
var Decimal2 = runtime.Decimal;
var getExtensionContext = runtime.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.9.0",
  engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
var NullTypes2 = {
  DbNull: runtime.NullTypes.DbNull,
  JsonNull: runtime.NullTypes.JsonNull,
  AnyNull: runtime.NullTypes.AnyNull
};
var DbNull2 = runtime.DbNull;
var JsonNull2 = runtime.JsonNull;
var AnyNull2 = runtime.AnyNull;
var ModelName = {
  User: "User",
  Log: "Log",
  News: "News",
  Group: "Group",
  Team: "Team",
  Match: "Match",
  Stadium: "Stadium",
  GameResult: "GameResult",
  TeamAResult: "TeamAResult",
  TeamBResult: "TeamBResult"
};
var TransactionIsolationLevel = runtime.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  name: "name",
  username: "username",
  email: "email",
  passwordHash: "passwordHash",
  role: "role",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var LogScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  userId: "userId",
  action: "action",
  entityType: "entityType",
  entityId: "entityId",
  oldValues: "oldValues",
  newValues: "newValues",
  description: "description",
  createdAt: "createdAt"
};
var NewsScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  authorId: "authorId",
  groupId: "groupId",
  title: "title",
  openingText: "openingText",
  bodyText: "bodyText",
  coverImageUrl: "coverImageUrl",
  readingTime: "readingTime",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var GroupScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  name: "name",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TeamScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  groupId: "groupId",
  name: "name",
  abbreviation: "abbreviation",
  shieldImageUrl: "shieldImageUrl",
  rankingPosition: "rankingPosition",
  wins: "wins",
  draws: "draws",
  losses: "losses",
  goalsFor: "goalsFor",
  goalsAgainst: "goalsAgainst",
  goalDifference: "goalDifference",
  points: "points",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MatchScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  groupId: "groupId",
  teamAId: "teamAId",
  teamBId: "teamBId",
  stadiumId: "stadiumId",
  date: "date",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var StadiumScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  name: "name",
  city: "city",
  capacity: "capacity",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var GameResultScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  teamAResultId: "teamAResultId",
  teamBResultId: "teamBResultId",
  matchId: "matchId",
  createdAt: "createdAt"
};
var TeamAResultScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  goals: "goals",
  createdAt: "createdAt"
};
var TeamBResultScalarFieldEnum = {
  id: "id",
  publicId: "publicId",
  goals: "goals",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime.Extensions.defineExtension;

export {
  PrismaClientKnownRequestError2 as PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError2 as PrismaClientUnknownRequestError,
  PrismaClientRustPanicError2 as PrismaClientRustPanicError,
  PrismaClientInitializationError2 as PrismaClientInitializationError,
  PrismaClientValidationError2 as PrismaClientValidationError,
  sql,
  empty2 as empty,
  join2 as join,
  raw2 as raw,
  Sql2 as Sql,
  Decimal2 as Decimal,
  getExtensionContext,
  prismaVersion,
  NullTypes2 as NullTypes,
  DbNull2 as DbNull,
  JsonNull2 as JsonNull,
  AnyNull2 as AnyNull,
  ModelName,
  TransactionIsolationLevel,
  UserScalarFieldEnum,
  LogScalarFieldEnum,
  NewsScalarFieldEnum,
  GroupScalarFieldEnum,
  TeamScalarFieldEnum,
  MatchScalarFieldEnum,
  StadiumScalarFieldEnum,
  GameResultScalarFieldEnum,
  TeamAResultScalarFieldEnum,
  TeamBResultScalarFieldEnum,
  SortOrder,
  NullableJsonNullValueInput,
  QueryMode,
  JsonNullValueFilter,
  NullsOrder,
  defineExtension,
  prismaNamespace_exports
};
//# sourceMappingURL=chunk-PC5GDWB4.js.map