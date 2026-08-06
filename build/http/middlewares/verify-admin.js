import "../../chunk-PZ5AY32C.js";

// src/http/middlewares/verify-admin.ts
async function verifyAdmin(request, reply) {
  if (request.user.role !== "admin") {
    return reply.status(403).send({
      message: "Forbidden."
    });
  }
}
export {
  verifyAdmin
};
//# sourceMappingURL=verify-admin.js.map