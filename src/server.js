const app = require("./app");
const seedRoles = require("./utils/seedRoles");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

seedRoles()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation des rôles :", err);
    process.exit(1);
  });
