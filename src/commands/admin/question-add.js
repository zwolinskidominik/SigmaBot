const { ApplicationCommandOptionType } = require('discord.js');
const Question = require('../../models/Question');


module.exports = {
    data: {
        name: 'question-add',
        description: 'Dodaj pytanie.',
        options: [
            {
                name: 'question',
                description: 'Treść pytania.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'reactions',
                description: 'Reakcje na pytanie.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    run: async ({ interaction }) => {
        const question = interaction.options.getString('question');
        const reactions = interaction.options.getString('reactions').split(' ');

        const questionDocument = new Question({
            authorId: interaction.user.id,
            content: question,
            reactions,
        });

        await questionDocument.save();

        await interaction.reply('Pomyślnie dodano pytanie dnia!');
    },

    options: {
        userPermissions: ['Administrator'],
        botPermissions: ['Administrator'],
    },
}