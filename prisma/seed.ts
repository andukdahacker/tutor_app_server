import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

function getArgs() {
  const args = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    // long arg
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=');
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
    // flags
    else if (arg[0] === '-') {
      const flags = arg.slice(1, arg.length).split('');
      flags.forEach((flag) => {
        args[flag] = true;
      });
    }
  });
  return args;
}

async function seed() {
  const args = getArgs();

  const learnerProfile = args['l'];
  const tutorProfile = args['t'];

  const learnerAmount: number = +learnerProfile;
  const tutorAmount: number = +tutorProfile;

  const prisma = new PrismaClient();
  const hashedPassword = await argon2.hash('Ducdeptraino1@');
  for (let i = 0; i < learnerAmount; i++) {
    await prisma.user.create({
      data: {
        email: `learner${i}@gmail.com`,
        password: hashedPassword,
        username: `learner${i}`,
        learnerProfile: {
          create: {
            bio: `Hi I'm Learner${i}. I am here to learn`,
            tutorRequests: {
              create: [{ subject: { create: { name: `subject${i}` } } }],
            },
          },
        },
      },
    });
  }

  for (let i = 0; i < tutorAmount; i++) {
    await prisma.user.create({
      data: {
        email: `tutor${i}@gmail.com`,
        password: hashedPassword,
        username: `tutor${i}`,
        tutorProfile: {
          create: {
            bio: `Hi I'm Tutor${i}. I am here to teach`,
          },
        },
      },
    });
  }
}

seed()
  .then(() => console.log('Seeding is done'))
  .catch((e) => console.log(e));
