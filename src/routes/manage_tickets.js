const express = require("express");
const manageTicketRoute = express.Router();

const Ticket = require("../models/Ticket");
const TicketComment = require("../models/TicketComment");
const TicketAssignee = require("../models/TicketAssignee");
const User = require("../models/User");

manageTicketRoute.get("/", async (req, res) => {
    const tickets = await Ticket.findAll();
    return res.render("./staff/staff-ticket-tables", { tickets });
});

manageTicketRoute.patch("/", async (req, res) => {
    const ticket = await Ticket.findByPk(req.body.id);
    const meta = req.body.meta;
    const message = req.body.message;

    ticket.status = meta || ticket.status;
    ticket.save();
    await TicketComment.create({
        message,
        meta: meta || null,
        authorID: req.user.id,
        ticketID: ticket.id,
    });

    res.redirect(`/staff/tickets/${ticket.id}`);
});

manageTicketRoute.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const ticket = await Ticket.findByPk(id, { include: User });
    const comments = await TicketComment.findAll({
        where: { ticketID: ticket.id },
        include: { model: User },
        order: [["createdAt", "ASC"]], // order ascending by creation date
    });
    if (ticket) {
        return res.render("./staff/staff-manage-ticket", {
            ticket,
            comments,
            user,
        });
    }
    req.flash("error", "No such account!");
    return res.redirect("/staff");
});

module.exports = manageTicketRoute;
