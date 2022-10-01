const { Ticket } = require('../../models');
const tickets = [
  {
    title: 'ticket1',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 1,
  },
  {
    title: 'ticket2',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },

    severity: 'low',
    category: 'bug',
    UserId: 1,
  },
  {
    title: 'ticket3',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 1,
  },
  {
    title: 'ticket4',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 1,
  },
  {
    title: 'ticket5',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 1,
  },
  {
    title: 'ticket6',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 2,
  },
  {
    title: 'ticket7',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 2,
  },
  {
    title: 'ticket8',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 2,
  },
  {
    title: 'ticket9',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 3,
  },
  {
    title: 'ticket10',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 3,
  },
  {
    title: 'ticket11',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 3,
  },
  {
    title: 'ticket12',
    description: {
      ops: [
        {
          insert: 'This is a ticket!',
        },
      ],
    },
    severity: 'low',
    category: 'bug',
    UserId: 4,
  },
];
const initTestTickets = async () => {
  tickets.forEach(async (ticket) => {
    const [newTicket, created] = await Ticket.findOrCreate({
      where: { title: ticket.title },
      defaults: {
        ...ticket,
        description: JSON.stringify(ticket.description),
      },
    });
  });
};

module.exports = { initTestTickets, tickets };
