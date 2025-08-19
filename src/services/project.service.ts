import { Project } from '../entities/Project';
import { Types } from 'mongoose';


export class ProjectService {
  async create(name: string) {
    const project = new Project({
      name,
    });

    await project.save();

    return project;
  }

  async update(id: string, name: string) {
    return Project.updateOne(
      {
        _id: new Types.ObjectId(id),
      },
      {
        name,
      },
    );
  }

  delete(id: string) {
    return Project.deleteOne({ _id: new Types.ObjectId(id) });
  }

  getOne(id: string) {
    return Project.findOne({ _id: new Types.ObjectId(id) });
  }

  async getList(offset: number, limit: number) {
    const items = await Project.find().limit(limit).skip(offset).lean();
    const count = await Project.countDocuments();

    return {
      items,
      count,
    };
  }

}

export const projectService = new ProjectService();
