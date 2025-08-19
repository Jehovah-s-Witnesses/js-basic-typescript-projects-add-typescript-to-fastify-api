import { model, Schema, Types } from 'mongoose';

const taskSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      default() {
        return new Types.ObjectId();
      },
    },
    title: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    projectId: {
      type: Types.ObjectId,
      ref: 'Project',
    },
  },
  {
    timestamps: true,
  },
);

export const Task = model('Task', taskSchema);
