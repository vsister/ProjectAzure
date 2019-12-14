const Ansible = require('node-ansible');
const { exec, spawn } = require('child_process');

exports.create = function(ID){  
  exec('ansible-playbook create.yml --extra-vars "ID=' + ID + '"', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

exports.remove = function(ID){  
  exec('ansible-playbook remove.yml --extra-vars "ID=' + ID + '"' , (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
  }