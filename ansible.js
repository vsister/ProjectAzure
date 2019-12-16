const { exec, spawn } = require('child_process');

exports.createRG = function(id){  
  exec('ansible-playbook resourcegroup.yml --extra-vars "ID=' + id + '"', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
  })
}

exports.startVM = function(id,tr_id,lang1,lang2,text){
    exec('ansible-playbook VMcreation.yml --extra-vars "ID=' + id + '"', (err, stdout, stderr) => {
      if (err) {
          console.error(err);
          return;
      }
      let findIP = stdout.substr(stdout.indexOf("The public IP is") + 17,20)
      let VM_IP = findIP.substr(0,findIP.indexOf('"')-1)
      fs.writeFileSync('/mnt/d/Sasha/ProjectAzure/hosts.' + id, '[dev]\n' + VM_IP + '\n\n[dev:vars]\nansible_user=azureuser\nansible_ssh_common_args="-o StrictHostKeyChecking=no"\nansible_ssh_private_key_file=/home/site/repository/.ssh/id_rsa"')
      console.log(stdout)
      exec('ansible-playbook VMstart.yml --extra-vars "tr_ID=' + tr_id  +' lang1=' + lang1  +' lang2=' + lang2  +' text=\'' + text +'\'"   -i hosts.' + id, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
          exec('ansible-playbook remove.yml --extra-vars "ID=' + id + '"', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
          })
      })
  })
}
