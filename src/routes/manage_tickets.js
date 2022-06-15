const express = require("express");
const manageTicketRoute = express.Router();

const Ticket = require("../models/Ticket");
const TicketAssignee = require("../models/TicketAssignee");
const User = require("../models/User");

manageTicketRoute.get("/", async (req, res) => {
    const tickets = await Ticket.findAll();
    return res.render("./staff/staff-ticket-tables", { tickets });
});

manageTicketRoute.patch("/", async (req, res) => {
    const ticket = await Ticket.findByPk(req.body.id);
    ticket.status = req.body.status;
    await ticket.save();
    req.flash("success", "Ticket status changed");
    res.redirect("/staff/tickets");
});

manageTicketRoute.get("/:id", async (req, res) => {
    const id = req.params.id;
    const ticket = await Ticket.findByPk(id, { include: User });
    if (ticket) {
        return res.render("./staff/staff-manage-ticket", { ticket });
    }
    req.flash("error", "No such account!");
    return res.redirect("/staff");
});

module.exports = manageTicketRoute;
