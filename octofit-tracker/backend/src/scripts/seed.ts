import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alexchen',
        email: 'alex.chen@example.com',
        profile: { displayName: 'Alex Chen', goal: 'Build strength' },
      },
      {
        username: 'jordanrivera',
        email: 'jordan.rivera@example.com',
        profile: { displayName: 'Jordan Rivera', goal: 'Improve endurance' },
      },
      {
        username: 'samokafor',
        email: 'sam.okafor@example.com',
        profile: { displayName: 'Sam Okafor', goal: 'Stay consistent' },
      },
    ]);

    const teams = await Team.insertMany([
      { name: 'Summit Squad', members: [users[0]._id, users[1]._id] },
      { name: 'Steady Strides', members: [users[2]._id] },
    ]);

    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'Strength training', durationMinutes: 45, points: 90 },
      { userId: users[0]._id, type: 'Walking', durationMinutes: 30, points: 45 },
      { userId: users[1]._id, type: 'Running', durationMinutes: 35, points: 80 },
      { userId: users[2]._id, type: 'Yoga', durationMinutes: 40, points: 60 },
    ]);

    const pointsByUser = activities.reduce<Record<string, number>>((totals, activity) => {
      const userId = activity.userId.toString();
      totals[userId] = (totals[userId] || 0) + activity.points;
      return totals;
    }, {});

    await Leaderboard.insertMany([
      { userId: users[0]._id, teamId: teams[0]._id, points: pointsByUser[users[0]._id.toString()] },
      { userId: users[1]._id, teamId: teams[0]._id, points: pointsByUser[users[1]._id.toString()] },
      { userId: users[2]._id, teamId: teams[1]._id, points: pointsByUser[users[2]._id.toString()] },
    ]);

    await Workout.insertMany([
      {
        title: 'Foundational Strength',
        description: 'A balanced full-body session for building strength.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Bodyweight squats', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, durationSeconds: 30 },
        ],
      },
      {
        title: 'Tempo Run',
        description: 'A focused endurance workout with a steady effort.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Warm-up walk', durationMinutes: 5 },
          { name: 'Tempo run', durationMinutes: 20 },
          { name: 'Cool-down walk', durationMinutes: 5 },
        ],
      },
      {
        title: 'Mobility Reset',
        description: 'Gentle movement to improve mobility and recovery.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Cat-cow stretch', durationSeconds: 60 },
          { name: 'World\'s greatest stretch', reps: 6 },
          { name: 'Child\'s pose', durationSeconds: 60 },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
