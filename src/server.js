require("dotenv").config();
const app = require("./app");
const seedRoles = require("./utils/seedRoles");
const seedStatutsCourrier = require("./utils/seedStatutsCourrier");
const seedTypeCourrier = require("./utils/seedTypeCourrier");

const PORT = process.env.PORT || 4000;
const isDev = process.env.NODE_ENV !== 'production';
const runSeeding = !isDev || process.env.RUN_SEEDING === 'true';

async function startServer() {
  if (runSeeding) {
    try {
      await seedRoles();
      await seedStatutsCourrier();
      await seedTypeCourrier();
      if (isDev) console.log('Database seeding completed successfully');
    } catch (err) {
      console.error("Error during database seeding:", err.message);
      if (!isDev) {
        process.exit(1);
      }
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
