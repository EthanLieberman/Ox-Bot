const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios')

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Talk with Ox bot')
        .addStringOption(option =>
          option
          .setName('chatinput')
          .setDescription('talk')
          ),

    async execute(interaction) {
      let user_message = interaction.options.getString("chatinput");
      let oxbot_reply = '';
      let oxbot_stats = {};
      await interaction.deferReply();

      await axios.post('https://chatgpt-api.shn.hk/v1/',
      {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": `You are Ox bot, a DnD AI, ${user_message}`
          }
        ]
      }, config)
      .then(res => {
        oxbot_reply = res.data.choices[0].message.content;
        oxbot_stats = res.data.usage;
        interaction.editReply(oxbot_reply);
      })
      .catch(e => {
        console.log(e);
        interaction.editReply("Sorry I'm overloaded at the moment, try me again another time");
      })

      for (const key in oxbot_stats){
        console.log(key, oxbot_stats[key]);
      }
    }
};