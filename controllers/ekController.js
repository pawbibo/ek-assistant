exports.fileDifference = (proj) => {
  return new Promise(function(resolve, reject) {
    const git = require('simple-git')(`/Users/paw/Documents/projects/eikaiwa-${proj}`);
    const chalk = require('chalk');
    let message;
    git
      .exec(() => console.log(`Checking out to ${chalk.red.bold('master')}...`))
      .checkout('master')
      .exec(() => console.log(`Done checking out to ${chalk.red.bold('master')}. Starting to pull files...`))
      .pull()
      .exec(() => console.log('Done updating. Fetching tags...'))
      .pull('origin', 'master', {'--tags': null})
      .tags((err, result) => {
        if (result) {
          const tags = result.all.sort();
          const latest_tag = tags[tags.length-1];
          console.log(`Latest tag found: ${chalk.white.bold(latest_tag)}`);

          git.diff(['--name-only', latest_tag], (err, data) => {
              const files = data.split('\n').filter((file) => file.indexOf('Test') == -1).join('\n');
              console.log(chalk.white.bold('\n-- File Difference --\n'));
              console.log(chalk.white(files));
              console.log(chalk.white.bold('-- End of diff --'))
              message = '\n-- File Difference --\n';
              message += files;
              message += '-- End of diff --';
              resolve(message);
          })
        }
      });
    });
};

exports.generateTag = () => {
  const git = require('simple-git')(`~/Documents/projects/eikaiwa-${process.argv[2]}`);
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
};
