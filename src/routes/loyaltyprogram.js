const express = require("express");
const User = require("../models/User");
const LoyaltyCard = require("../models/LoyaltyCard");
const loyaltyprogram = express.Router();

loyaltyprogram.get("/points", async (req, res) => {
    let user_id = req.user.id
    const Card = await (await LoyaltyCard.findAll()).map((x) => x.dataValues);
    const User_Card = await LoyaltyCard.findAll({ where: { authorID: user_id } });
    for (i = 0; i < Card.length; i++){
        if (Card[i].authorID == user_id) {
            return res.render("./customers/loyaltyprogram/loyaltypoints",{User_Card});
        }
    }
    return res.render("./customers/loyaltyprogram/loyaltypoints");
    
    
 })
loyaltyprogram.post("/points", async (req, res) => {
    try {
        const Card = await (await LoyaltyCard.findAll()).map((x) => x.dataValues);
        
        if (req.body.card == "new") {
            let user_id = req.user.id
            if (await LoyaltyCard.findOne({ where: { authorID: user_id }})) {
                req.flash("error", "Unable to create card! ")
                return res.redirect("/loyaltyprogram/points")
            } else {
                
                await LoyaltyCard.create({ authorID: req.user.id,Active_Points: 0, Expired_Points: 0, Used_Points: 0,Status:"Bronze" });
                req.flash("success", "Card Created! ")
                return res.redirect("/loyaltyprogram/points")
            }
            
        }
        else if (req.body.card == "current") {
            for (i = 0; i < Card.length; i++) {
                
                let card_individual = await LoyaltyCard.findByPk(Card[i].id);
                if (Card[i].id == req.body.id) {
                    const active_points = parseInt(Card[i].Active_Points) + 100
                    if (active_points <= 500) {
                         await card_individual.update({
                            Active_Points: active_points, Expired_Points: Card[i].Expired_Points, Used_Points: Card[i].Used_Points, Status:"Bronze"
                        });
                    }
                    else if (active_points > 500 && active_points < 1000) {
                         await card_individual.update({
                            Active_Points: active_points, Expired_Points: Card[i].Expired_Points, Used_Points: Card[i].Used_Points, Status:"Silver"
                        });
                    }
                    else if (active_points >= 1000) {
                         await card_individual.update({
                            Active_Points: active_points, Expired_Points: Card[i].Expired_Points, Used_Points: Card[i].Used_Points, Status:"Gold"
                        });
                    }
                    req.flash("success", 100, "Points Earned! ")
                    return res.redirect("/loyaltyprogram/points")
                    
                
                }
            }
        }
    
        else if (req.body.card == 'item') {
            let card_individual = await LoyaltyCard.findByPk(Card[i].id);
                if (Card[i].id == req.body.id) {
                   if (Card[i].Active_Points < req.body.cost) {
                        req.flash("error","Not Enough Points! ")
                        return res.redirect("/loyaltyprogram/points")
                    } else  {
                       const active_points = parseInt(Card[i].Active_Points) - parseInt(req.body.cost)
                       const used_points = parseInt(Card[i].Used_Points) + parseInt(req.body.cost)
                        if (active_points <= 500) {
                            await card_individual.update({
                                Active_Points: active_points, Expired_Points: Card[i].Expired_Points, Used_Points: used_points, Status:"Bronze"
                            });
                        }
                        else if (active_points > 500 && active_points < 1000) {
                            await card_individual.update({
                                Active_Points: active_points, Expired_Points: Card[i].Expired_Points, Used_Points: used_points, Status:"Silver"
                            });
                        }
                        else if (active_points >= 1000) {
                            await card_individual.update({
                                Active_Points: active_points, Expired_Points: Card[i].Expired_Points, Used_Points: used_points, Status:"Gold"
                            });
                        }
                            req.flash("success", req.body.cost,"Points Deducterd ! ")
                            return res.redirect("/loyaltyprogram/points")
                    }
                } 
        }
    
  } catch(e) {
        req.flash("error", e)
    }
});
module.exports = loyaltyprogram;
