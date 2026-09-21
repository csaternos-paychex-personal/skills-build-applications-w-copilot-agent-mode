"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_js_1 = require("./models.js");
const router = (0, express_1.Router)();
const resourceRoutes = [
    ['/users', models_js_1.User],
    ['/teams', models_js_1.Team],
    ['/activities', models_js_1.Activity],
    ['/leaderboard', models_js_1.Leaderboard],
    ['/workouts', models_js_1.Workout],
];
for (const [path, model] of resourceRoutes) {
    router.get(`${path}/`, async (_request, response) => {
        try {
            const documents = await model.find().lean();
            response.json(documents);
        }
        catch (error) {
            response.status(503).json({ error: 'Database unavailable' });
        }
    });
    router.post(`${path}/`, async (request, response) => {
        try {
            const document = await model.create(request.body);
            response.status(201).json(document);
        }
        catch (error) {
            response.status(400).json({ error: 'Invalid resource', details: error instanceof Error ? error.message : String(error) });
        }
    });
}
exports.default = router;
