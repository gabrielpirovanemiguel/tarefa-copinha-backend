import {
  app
} from "./chunk-MPN5VQ3L.js";
import "./chunk-PHVD5ASE.js";
import "./chunk-EDHVKHAN.js";
import "./chunk-VBUQG7EC.js";
import "./chunk-PC5GDWB4.js";
import "./chunk-FCK2LHWZ.js";
import "./chunk-5IYCNSUE.js";
import {
  env
} from "./chunk-ULMIM7XF.js";
import "./chunk-PZ5AY32C.js";

// src/server.ts
app.listen({
  host: env.HOST,
  port: env.PORT
}).then(async () => {
  const url = `http://localhost:${env.PORT}`;
  console.log(`\u{1F680} HTTP Server Running at ${url}`);
});
//# sourceMappingURL=server.js.map