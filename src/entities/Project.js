import { model, Schema, Types } from 'mongoose';

const projectSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      default() {
        return new Types.ObjectId();
      },
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = model('Project', projectSchema);
