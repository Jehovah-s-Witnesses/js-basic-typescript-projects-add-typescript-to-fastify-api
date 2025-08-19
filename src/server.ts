import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import {
  createProjectRoute,
  deleteProjectRoute,
  getListProjectRoute,
  getOneProjectRoute,
  updateProjectRoute,
} from './routes/project.routes';
import {
  createProjectSchema,
  deleteProjectSchema,
  getListProjectSchema,
  getOneProjectSchema,
  updateProjectSchema,
} from './schemas/project.schema';
import {
  createTaskSchema,
  deleteTaskSchema,
  getListTaskSchema,
  getOneTaskSchema,
  updateTaskSchema,
} from './schemas/task.schema';
import {
  createTaskRoute,
  deleteTaskRoute,
  getListTaskRoute,
  getOneTaskRoute,
  updateTaskRoute,
} from './routes/task.routes';

export const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider();

await server.register(fastifyCors);
await server.register(fastifyCookie);
await server.register(fastifySwagger);
await server.register(fastifySwaggerUi);
await server.register(fastifyStatic, {
  root: `${process.cwd()}/public`,
});
await server.register(fastifyMultipart, {
  attachFieldsToBody: 'keyValues',
});

await server.register(
  (instance, opts, done) => {
    instance.register(
      (projectInstance, opts, done) => {
        projectInstance.post(
          '',
          {
            schema: createProjectSchema,
          },
          createProjectRoute,
        );

        projectInstance.put(
          ':id',
          {
            schema: updateProjectSchema,
          },
          updateProjectRoute,
        );

        projectInstance.delete(
          ':id',
          {
            schema: deleteProjectSchema,
          },
          deleteProjectRoute,
        );

        projectInstance.get(
          ':id',
          {
            schema: getOneProjectSchema,
          },
          getOneProjectRoute,
        );

        projectInstance.get(
          'list',
          {
            schema: getListProjectSchema,
          },
          getListProjectRoute,
        );

        done();
      },
      {
        prefix: '/project/',
      },
    );

    instance.register(
      (taskInstance, opts, done) => {
        taskInstance.post('', { schema: createTaskSchema }, createTaskRoute);
        taskInstance.put(':id', { schema: updateTaskSchema }, updateTaskRoute);
        taskInstance.delete(
          ':id',
          { schema: deleteTaskSchema },
          deleteTaskRoute,
        );
        taskInstance.get(':id', { schema: getOneTaskSchema }, getOneTaskRoute);
        taskInstance.get(
          'list',
          { schema: getListTaskSchema },
          getListTaskRoute,
        );

        done();
      },
      {
        prefix: '/task/',
      },
    );

    done();
  },
  {
    prefix: '/api/v1',
  },
);
