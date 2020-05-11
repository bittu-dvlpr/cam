/*
Author: Bittu Patel (b2@skaratechnologies.com)
cli.js (c) 2020
Desc: command line tool to generate API module boilerplate
Created:  5/11/2020, 11:22:56 PM
Modified: 5/12/2020, 4:27:51 AM
*/

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .alias('g', 'generate')
  .nargs('g', 1)
  .describe('g', 'Generate new API module')
  .demandOption(['g'])
  .help('h')
  .alias('h', 'help')
  .epilog('Handcrafted by B2 with love.').argv;
const path = require('path');
const fs = require('fs');
const execa = require('execa');
const Listr = require('listr');
const { Observable } = require('rxjs');

var dir = path.join(__dirname, `src/api/${argv.g}`);
var files = [
  `${argv.g}.routes.ts`,
  `${argv.g}.model.ts`,
  `${argv.g}.controller.ts`,
  `${argv.g}.service.ts`,
];

const tasks = new Listr([
  {
    title: `Generate module: ${argv.g}`,
    task: () => {
      return new Listr([
        {
          title: 'Create directory',
          task: async () => {
            if (fs.existsSync('src/api')) {
              await execa('mkdir', [argv.g]).catch((err) => {
                throw new Error(err);
              });
            } else {
              await execa('mkdir', ['src/api']).catch((err) => {
                throw new Error(err);
              });
              await execa('mkdir', [dir]).catch((err) => {
                throw new Error(err);
              });
            }
          },
        },
        {
          title: 'Create files',
          task: async () =>
            new Observable(async (observer) => {
              // routes
              observer.next(files[0] + ' created');
              await execa('touch', [`${dir}/${files[0]}`]).catch((err) => {
                throw new Error(err);
              });

              // model
              setTimeout(async () => {
                observer.next(files[1] + ' created');
                await execa('touch', [`${dir}/${files[1]}`]).catch((err) => {
                  throw new Error(err);
                });
              }, 2000);

              // controller
              setTimeout(async () => {
                observer.next(files[2] + ' created');
                await execa('touch', [`${dir}/${files[2]}`]).catch((err) => {
                  throw new Error(err);
                });
              }, 4000);

              // service
              setTimeout(async () => {
                observer.next(files[3] + ' created');
                await execa('touch', [`${dir}/${files[3]}`]).catch((err) => {
                  throw new Error(err);
                });
              }, 6000);

              setTimeout(() => {
                observer.complete();
              }, 8000);
            }),
        },
      ]);
    },
  },
]);

tasks.run();
