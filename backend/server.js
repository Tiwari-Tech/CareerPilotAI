require('dotenv').config();

// Some Docker/host networks ship a resolver that can't handle MongoDB
// Atlas's mongodb+srv SRV/TXT lookups. Forcing Google DNS is a common
// workaround for that specific case, but it rewrites EVERY DNS lookup
// this process makes -- if your host blocks outbound DNS to arbitrary
// IPs, this will break everything instead of fixing Mongo. It's opt-in
// via env var so it only applies where it's actually needed.
if (process.env.FORCE_GOOGLE_DNS === 'true') {
  const dns = require('dns');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const REQUIRED_ENV_VARS = ['MONGO_URI', 'JWT_SECRET', 'GOOGLE_API_KEY'];
const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required environment variable(s): ${missing.join(', ')}`);
  process.exit(1);
}

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });
