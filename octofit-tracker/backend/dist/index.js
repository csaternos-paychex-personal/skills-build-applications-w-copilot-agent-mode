"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_js_1 = __importDefault(require("./routes.js"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.use('/api', routes_js_1.default);
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', apiBaseUrl });
});
app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
});
mongoose_1.default
    .connect(connectionString)
    .then(() => console.log('Connected to octofit_db'))
    .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`MongoDB unavailable; API is running without persistence: ${message}`);
});
