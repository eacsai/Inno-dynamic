#! /usr/bin/env node

const { program } = require('commander');

const templates = {
  'template-react' : {
    url: 'https://github.com/eacsai/Inno-dynamic',
    downloadUrl: 'https://github.com:eacsai/Inno-dynamic#master',
    description: 'react模版'
  }
};

program.version('1.0.0') // -v 或者 --versions输出版本号

program
  .command('init <template> <project>')
  .description('初始化项目模版')
  .action((templateName, projectName) => {
    console.log(templateName, projectName)
  })

program
  .command('list')
  .description('查看所有可用的模版')
  .action(() => {
    console.log(
      `template-react react模板`
    )
  })

program.parse(process.argv);
