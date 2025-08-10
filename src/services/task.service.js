import { Types } from 'mongoose';
import { Task } from '../entities/Task.js';

export class TaskService {
  async create(title, deadline, projectId) {
    const task = new Task({
      title,
      deadline,
      projectId: new Types.ObjectId(projectId),
    });

    await task.save();

    return task;
  }

  async update(id, title, deadline) {
    return Task.updateOne(
      {
        _id: new Types.ObjectId(id),
      },
      {
        title,
        deadline,
      },
    );
  }

  delete(id) {
    return Task.deleteOne({ _id: new Types.ObjectId(id) });
  }

  deleteManyByProjectId(projectId) {
    return Task.deleteMany({ projectId: new Types.ObjectId(projectId) });
  }

  getOne(id) {
    return Task.findOne({ _id: new Types.ObjectId(id) });
  }

  async getList(projectId, offset, limit) {
    const filter = { projectId: new Types.ObjectId(projectId) };
    const items = await Task.find(filter).limit(limit).skip(offset).lean();
    const count = await Task.countDocuments(filter);

    return {
      items,
      count,
    };
  }
}

export const taskService = new TaskService();
