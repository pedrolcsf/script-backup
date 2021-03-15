//*************************************************************************** */
//********************************* LIBRARIES ******************************* */
//*************************************************************************** */
const fs = require('fs');
const path = require('path');
const { NodeSSH } = require('node-ssh');
require('dotenv').config();

const { getMonth, getYear } = require('date-fns');
//*************************************************************************** */

// Atribui a biliblioteca Node ssh a variaval 'ssh'
const ssh = new NodeSSH();
  ssh.connect({
    host: process.env.SSH_HOST,
    username: process.env.SSH_USER,
    password: process.env.SSH_PASSWORD
  }).then(() => {
// algoratimo que rodara a cada x tempo
    setInterval(() => {
     //Mês atual
    var atualMonth = getMonth(new Date()) + 1; 
    var atualYear = getYear(new Date());
    console.log(atualYear)

    // array com os nomes das pastas de backup
    var files = [];

    ssh.execCommand('ls', {cwd: '/mnt/bkp'}).then(i => {
      files = i.stdout.split("\n")
      console.log(files)
      
      var folderExists = files.find(i => i == `${atualMonth}-${atualYear}`);
      if(!folderExists) {
        ssh.putDirectory('/home/selprom/file-server', `/mnt/bkp/${atualMonth}-${atualYear}`).then(answer => {
          answer ? console.log('success!') : console.log('failed!')
        });
      }
    });
}, 3600000);
});