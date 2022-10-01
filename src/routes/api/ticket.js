const express = require('express');
const router = express.Router();

const {
  Ticket,
  TicketAssignee,
  TicketComment,
  User,
} = require('../../models/');

/*
Endpoints:
  '/'
  '/:id'
  '/:id/assignee'
  '/:id/comment'
  '/assignee'
  '/assignee/:id'
  '/comment'
  '/comment/:id'
*/

router
  .route('/')
  .get(async (req, res) => {
    const tickets = await Ticket.findAll();
    return res.json(tickets);
  })
  .post(async (req, res) => {
    const { title, description, status, severity, category } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      status,
      severity,
      category,
    });
    return res.json(ticket);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.json({
        error: `Ticket with id: ${ticketId} is not found.`,
      });
    }
    return res.json(ticket);
  })
  .put(async (req, res) => {
    const ticketId = req.params.id;
    const { title, description, status, severity, category } = req.body;

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.json({
        error: `Ticket with id: ${ticketId} is not found.`,
      });
    }

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;
    ticket.severity = severity || ticket.severity;
    ticket.category = category || ticket.category;
    await ticket.save();
    return res.redirect('back');
  })
  .delete(async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.json({
        error: `Ticket with id: ${ticketId} is not found.`,
      });
    }
    await ticket.destroy();
    return res.json({ success: `Ticket with id: ${ticketId} is deleted.` });
  });

router.route('/:id/assign').put(async (req, res) => {
  const { id: ticketId } = req.params;
  const { id: userId } = req.body;

  const ticketAssignee = await TicketAssignee.findOne({
    where: {
      UserId: userId,
      TicketId: ticketId,
    },
  });

  if (ticketAssignee) {
    req.flash('error', `User already assigned to ticket ${ticketId}.`);
    return res.redirect('back');
  }

  await TicketAssignee.create({
    TicketId: ticketId,
    UserId: userId,
  });

  return res.redirect('back');
});

router.route('/:id/comment').post(async (req, res) => {
  const { id: ticketId } = req.params;
  const { message, meta, userId } = req.body;
  const ticket = await Ticket.findByPk(ticketId);
  if (meta === 'open') {
    ticket.status = 'open';
  } else if (meta === 'closed') {
    ticket.status = 'closed';
  }
  await TicketComment.create({
    UserId: userId,
    TicketId: ticketId,
    message: message || null,
    meta: meta || null,
  });
  ticket.save();
  return res.redirect('back');
});

router.route('/:id/reassign').put(async (req, res) => {
  const { id: ticketId } = req.params;
  const { users } = req.body;

  const ticket = await Ticket.findByPk(ticketId);
  const assignees = await TicketAssignee.findAll({
    where: { TicketId: ticketId },
    include: { model: User },
  });
  const assigneeIds = assignees.map((assignee) => assignee.id);

  console.log(users);

  // add new assignees
  if (users) {
    users.forEach(async (userId) => {
      if (!assigneeIds.includes(userId)) {
        await TicketAssignee.create({
          TicketId: ticket.id,
          UserId: userId,
        });
      }
    });
  }

  // delete unassigned assignees
  if (assigneeIds) {
    assigneeIds.forEach(async (assigneeId) => {
      if (users) {
        if (!users.includes(assigneeId)) {
          const assignee = await TicketAssignee.findOne({
            where: {
              TicketId: ticket.id,
              UserId: assigneeId,
            },
          });
          await TicketAssignee.destroy(assignee);
        }
      } else {
        const assignee = await TicketAssignee.findOne({
          where: {
            TicketId: ticket.id,
          },
        });
        if (assignee) {
          await assignee.destroy();
        }
      }
    });
  }

  return res.redirect('back');
});

module.exports = router;
