import { Router } from 'express';

import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const router = Router();

const resourceRoutes = [
  ['/users', User],
  ['/teams', Team],
  ['/activities', Activity],
  ['/leaderboard', Leaderboard],
  ['/workouts', Workout],
] as const;

for (const [path, model] of resourceRoutes) {
  router.get(`${path}/`, async (_request, response) => {
    try {
      const documents = await model.find().lean();
      response.json(documents);
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable' });
    }
  });

  router.post(`${path}/`, async (request, response) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource', details: error instanceof Error ? error.message : String(error) });
    }
  });
}

export default router;