import { Types } from 'mongoose';
import { Task } from '../entities/Task';

interface TaskListResult {
  items: any[];
  count: number;
}

export class TaskService {
  async create(title: string, deadline: Date, projectId: string) {
    const task = new Task({
      title,
      deadline,
      projectId: new Types.ObjectId(projectId),
    });

    await task.save();

    return task;
  }

  async update(id: string, title: string, deadline: Date) {
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

  delete(id: string) {
    return Task.deleteOne({ _id: new Types.ObjectId(id) });
  }

  deleteManyByProjectId(projectId: string) {
    return Task.deleteMany({ projectId: new Types.ObjectId(projectId) });
  }

  getOne(id: string) {
    return Task.findOne({ _id: new Types.ObjectId(id) });
  }

  async getList(projectId: string, offset: number, limit: number) {
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
