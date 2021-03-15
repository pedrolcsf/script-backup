const fs = require('fs');
const path = require('path');
const { NodeSSH } = require('node-ssh');
require('dotenv').config();

const ssh = new NodeSSH();

ssh.connect({
  host: process.env.SSH_HOST,
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD
}).then(() => {
  ssh.putDirectory('/home/pedro/www/eita', '/home/selprom/teste').then(answer => {
    answer ? console.log('success!') : console.log('failed!')
  })
});
