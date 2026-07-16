const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const campaignSchema = new mongoose.Schema({
  title: String,
  participants: [mongoose.Schema.Types.Mixed] // Use Mixed temporarily to read both strings and objects
}, { strict: false });

const Campaign = mongoose.model('CampaignMigration', campaignSchema, 'campaigns');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");

    const campaigns = await Campaign.find({});
    
    for (const camp of campaigns) {
      if (camp.participants && camp.participants.length > 0) {
        let modified = false;
        const migratedParticipants = camp.participants.map(p => {
          if (typeof p === 'string') {
            modified = true;
            return {
              name: "Unknown",
              email: p,
              phone: "No Phone",
              joinedAt: new Date()
            };
          }
          return p;
        });

        if (modified) {
          await Campaign.updateOne({ _id: camp._id }, { $set: { participants: migratedParticipants } });
          console.log(`Migrated campaign: ${camp.title}`);
        }
      }
    }
    console.log("Migration complete.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

migrate();
