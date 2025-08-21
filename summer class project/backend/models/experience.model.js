import { Schema } from 'mongoose';

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true }
});

export default ExperienceSchema;