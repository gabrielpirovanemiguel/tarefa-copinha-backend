// src/hash.js
import bcrypt from "bcryptjs";
var hash = await bcrypt.hash("123456", 10);
console.log(hash);
//# sourceMappingURL=hash.js.map