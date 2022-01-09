#! /usr/bin/env node

const { program } = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");

const templates = {
  "template-react": {
    url: "https://github.com/eacsai/Inno-dynamic",
    downloadUrl: "https://github.com:eacsai/Inno-dynamic#master",
    description: "react模版",
  },
};

program.version("1.0.0"); // -v 或者 --versions输出版本号

program
  .command("init")
  .description("初始化项目模版")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "template",
          message: "请输入项目模板",
        },
        {
          type: "input",
          name: "name",
          message: "请输入项目名称",
        },
      ])
      .then((answers) => {
        console.log(answers);
        const { downloadUrl } = templates[answers.template];
        download(downloadUrl, answers.name, { clone: true }, (err) => {
          if (err) {
            console.log("下载失败");
            console.error(err);
          } else {
            console.log("下载成功");
          }
        });
      });
  });

program
  .command("list")
  .description("查看所有可用的模版")
  .action(() => {
    console.log(`template-react react模板`);
  });

program.parse(process.argv);
