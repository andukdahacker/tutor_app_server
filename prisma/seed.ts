import { Prisma, PrismaClient } from '@prisma/client';
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
  const amount = args['amount'];

  if (typeof amount === 'undefined')
    throw new Error('must provide amount argument');

  const convertToNumber: number = +amount;
  const prisma = new PrismaClient();
  const seedData: Prisma.UserCreateInput[] = [];
  const hashedPassword = await argon2.hash('super');
  for (let i = 0; i <= convertToNumber; i++) {
    seedData.push({
      email: `user${i}@gmail.com`,
      password: hashedPassword,
      username: `user${i}`,
    });
  }

  await prisma.user.createMany({
    data: seedData,
  });
}

seed()
  .then((_) => console.log('Seeding is done'))
  .catch((e) => console.log(e));
