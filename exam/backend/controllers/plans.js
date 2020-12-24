const Sequelize = require("sequelize");
const { adderUtil } = require("../helpers/api-utillities");
const db = require("../models");
const utilities = require("../helpers/utilities");
const uuid = require("uuid");

const { Op } = Sequelize;

exports.addPlan = async (req, res) => {
    const newName = req.body.name;
    const newPricing = req.body.pricing;
    const newDuration = req.body.duration;
    const newIsEnable = req.body.isEnable;
    try {
        const newPlan = db.plans.build({
            id: uuid.v1(),
            name: newName,
            pricing: newPricing,
            duration: newDuration,
            isEnable: newIsEnable,
        });
        await newPlan.save();
        utilities.sendSuccess("success", res, newPlan);
    } catch (err) {
        console.log(err);
        utilities.sendError(err, res);
    }
};

exports.getPlans = async (req, res) => {
    try {
        const allPlans = db.plans.findAll();
        utilities.sendSuccess("success", res, allPlans);
    } catch (err) {
        console.log(err);
        utilities.sendError(err, res);
    }
};

exports.getPlanById = async (req, res) => {
    try {
        const findPlan = db.plans.findOne({
            where: {
                id: req.params.planId,
            }
        });
        utilities.sendSuccess("success", res, findPlan);
    } catch (err) {
        console.log(err);
        utilities.sendError(err, res);
    }
};

exports.updatePlan = async (req, res) => {
    //TODO
};


