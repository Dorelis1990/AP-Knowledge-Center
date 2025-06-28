const bcrypt = require("bcrypt");

(async () => {
  const plainPassword = "nick2319"; // The password you type in login form
  const hashedPassword = "$2b$10$yi9JyI3fczNgiD5A9ra9d.QxzRCLTxUtU.kjxIjkCbpiNA7VCMCh2"; // The hash from DB

  const match = await bcrypt.compare(plainPassword, hashedPassword);
  console.log("Does the plain password match the hash? ", match);
})();
