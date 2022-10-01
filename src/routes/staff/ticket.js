const express = require('express');
const router = express.Router();
const { Ticket, TicketAssignee, TicketComment, User } = require('../../models');
const { Mail } = require('../../util');

/*
Use cases:
  view tickets
  view assigned tickets
  edit ticket
  assign staff to ticket
  remove staff from ticket
  comment on ticket
  close ticket
  reopen ticket
*/

router.route('/').get(async (req, res) => {
  const tickets = await Ticket.findAll();
  return res.render('staff/ticket/table', { tickets });
});

router.route('/assigned').get(async (req, res) => {
  const userId = req.user.id;
  var assignedTickets = await TicketAssignee.findAll({
    where: { UserId: userId },
    include: {
      model: Ticket,
      where: { status: 'open' },
    },
  });

  return res.render('./staff/ticket/assigned-ticket-table', {
    assignedTickets,
  });
});

router.patch('/', async (req, res) => {
  const ticket = await Ticket.findByPk(req.body.id);
  const meta = req.body.meta;
  const message = req.body.message;

  ticket.status = meta || ticket.status;
  ticket.save();

  const user = await User.findByPk(ticket.authorID);
  console.log('USER', user);

  if (ticket.status == 'closed') {
    Mail.Send({
      email_recipient: user.email,
      subject: 'Ticket Resolved',
      template_path: '../../views/customers/ticketResolveMail.html',
      context: { ticketId: ticket.id, ticketTitle: ticket.title },
    });
  }

  await TicketComment.create({
    message,
    meta: meta || null,
    authorID: req.user.id,
    ticketID: ticket.id,
  });

  res.redirect(`/staff/tickets/${ticket.id}`);
});

router.post('/assign/user', async (req, res) => {
  const userID = req.body.user;
  const ticketID = req.body.id;
  console.log(userID);

  const ticketAssignee = await TicketAssignee.findOne({
    where: { userID, ticketID },
  });

  if (ticketAssignee) {
    req.flash('error', `User already assigned to ticket ${ticketID}.`);
    return res.redirect(`/staff/tickets/${ticketID}`);
  }

  await TicketAssignee.create({
    ticketID,
    userID,
  });

  return res.redirect(`/staff/tickets/${ticketID}`);
});

router.post('/reassign/user', async (req, res) => {
  const ticket = await Ticket.findByPk(req.body.id);
  const assignees = await TicketAssignee.findAll({
    where: { ticketID: ticket.id },
    include: { model: User },
  });
  const userIDs = req.body.users;
  const assigneeIDs = assignees.map((assignee) => assignee.id);

  console.log(userIDs);

  // add new assignees
  if (userIDs) {
    userIDs.forEach(async (userID) => {
      if (!assigneeIDs.includes(userID)) {
        await TicketAssignee.create({
          ticketID: ticket.id,
          userID: userID,
        });
      }
    });
  }

  // delete unassigned assignees
  if (assigneeIDs) {
    assigneeIDs.forEach(async (assigneeID) => {
      if (userIDs) {
        if (!userIDs.includes(assigneeID)) {
          const assignee = await TicketAssignee.findOne({
            where: {
              ticketID: ticket.id,
              userID: assigneeID,
            },
          });
          await TicketAssignee.destroy(assignee);
        }
      } else {
        const assignee = await TicketAssignee.findOne({
          where: {
            ticketID: ticket.id,
          },
        });
        if (assignee) {
          await assignee.destroy();
        }
      }
    });
  }

  return res.redirect(`/staff/tickets/${ticket.id}`);
});

router.post('/assign/category', async (req, res) => {
  const ticketID = req.body.id;
  const category = req.body.category;
  const ticket = await Ticket.findByPk(ticketID);
  ticket.update({ category });
  return res.redirect(`/staff/tickets/${ticket.id}`);
});

router.post('/assign/severity', async (req, res) => {
  const ticketID = req.body.id;
  const severity = req.body.severity;
  const ticket = await Ticket.findByPk(ticketID);
  ticket.update({ severity });
  return res.redirect(`/staff/tickets/${ticket.id}`);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const ticket = await Ticket.findByPk(id, {
    include: [
      { model: User },
      { model: TicketComment, include: User },
      { model: TicketAssignee, include: User },
    ],
  });
  console.log('TICKET', ticket);
  if (ticket) {
    return res.render('staff/ticket/view', { ticket });
  }
  req.flash('error', `Ticket with Id: ${id} doesn't exist!`);
  return res.redirect('/staff/ticket/');
});

module.exports = router;
