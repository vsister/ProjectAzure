const Ansible = require('node-ansible');


exports.create = function(){  
  var playbook = new Ansible.Playbook().playbook('create');
  var promise = playbook.exec();
  promise.then(function(successResult) {
    console.log(successResult.code); // Exit code of the executed command
    console.log(successResult.output) // Standard output/error of the executed command
  }, function(error) {
    console.error(error);
  })
}

exports.remove = function(){  
    var playbook = new Ansible.Playbook().playbook('remove');
    var promise = playbook.exec();
    promise.then(function(successResult) {
      console.log(successResult.code); // Exit code of the executed command
      console.log(successResult.output) // Standard output/error of the executed command
    }, function(error) {
      console.error(error);
    })
  }