module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
              'subscriptions', // table name
              'planId', // new field name
              {
                type: Sequelize.UUID,
                allowNull: false,
              },
            ),
            queryInterface.addColumn(
              'subscriptions',
              'startDate',
              {
                type: Sequelize.DATE,
                allowNull: false,
              },
            ),
            queryInterface.addColumn(
              'subscriptions',
              'endDate',
              {
                type: Sequelize.DATE,
                allowNull: false,
              },
            ),
            queryInterface.addColumn(
                'subscriptions',
                'isExpired',
                {
                  type: Sequelize.BOOLEAN,
                },
              ),
          ]);
    },
  
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('subscriptions', 'planId'),
            queryInterface.removeColumn('subscriptions', 'startDate'),
            queryInterface.removeColumn('subscriptions', 'endDate'),
            queryInterface.removeColumn('subscriptions', 'isExpired'),
          ]);
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
    },
  };