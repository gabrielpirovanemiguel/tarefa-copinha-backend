import "../../chunk-PZ5AY32C.js";

// src/http/middlewares/verify-jwt.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({
      message: "Unauthorized."
    });
  }
}
export {
  verifyJWT
};
//# sourceMappingURL=verify-jwt.js.map