import { Project } from '../entities/Project.js';
import { Types } from 'mongoose';

export class ProjectService {
  async create(name) {
    const project = new Project({
      name,
    });

    await project.save();

    return project;
  }

  async update(id, name) {
    return Project.updateOne(
      {
        _id: new Types.ObjectId(id),
      },
      {
        name,
      },
    );
  }

  delete(id) {
    return Project.deleteOne({ _id: new Types.ObjectId(id) });
  }

  getOne(id) {
    return Project.findOne({ _id: new Types.ObjectId(id) });
  }

  async getList(offset, limit) {
    const items = await Project.find().limit(limit).skip(offset).lean();
    const count = await Project.countDocuments();

    return {
      items,
      count,
    };
  }
}

export const projectService = new ProjectService();
