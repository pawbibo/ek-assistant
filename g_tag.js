const git = require('simple-git')(`/Users/paw/Documents/projects/docker-build/www/eikaiwa-${process.argv[2]}`);
const chalk = require('chalk');
const tag = process.argv[3];

git
  .exec(() => console.log(`Checking out to ${chalk.red.bold('master')}...`))
  .checkout('master')
  .exec(() => console.log(`Done checking out to ${chalk.red.bold('master')}. Starting to pull files...`))
  .pull()
  .exec(() => console.log(`Done updating. Now creating Release Tag: ${chalk.white.bold(tag)}`))
  .addTag(tag, () => { console.log('Tag created') })
  .exec(() => console.log('Pushing tag...'))
  .push('origin', tag, () => {
    console.log('Done.');
  })
