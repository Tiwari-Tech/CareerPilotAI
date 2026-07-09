const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required to be added in blacklist"],
    unique: true
  }
}, { timestamps: true });

// Auto-delete blacklisted tokens 1 day after creation -- matches the JWT's
// own expiry, so this collection doesn't grow forever.
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const tokenBlacklistModel = mongoose.model('blacklistTokens', blacklistTokenSchema);

module.exports = tokenBlacklistModel;
