const git = require('simple-git')(`/var/www/html/eikaiwa-${process.argv[2]}`);
const chalk = require('chalk');

git
  .exec(() => console.log(chalk.redBright('Checking out to master...')))
  .checkout('master')
  .exec(() => console.log('Done checking out to master. Starting to pull files...'))
  .pull()
  .exec(() => console.log('Done updating. Fetching tags...'))
  .pull('origin', 'master', {'--tags': null})
  .tags((err, result) => {
    if (result) {
      const tags = result.all.sort();
      const latest_tag = tags[tags.length-1];
      console.log(`Latest tag found: ${latest_tag}`);

      git.diff(['--name-only', latest_tag], (err, data) => {
          const files = data.split('\n').filter((file) => file.indexOf('Test') == -1).join('\n');
          console.log(files);
      })
    }
  })
