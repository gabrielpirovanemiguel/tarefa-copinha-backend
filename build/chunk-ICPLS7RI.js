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
//# sourceMappingURL=chunk-ICPLS7RI.js.map