const translate = require('translate')
const Translation = require('../Translation')
translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20191210T115214Z.4531ec268421712a.ff53d329c913eb07df8eec7c438028871bcbff83';


exports.do = function(text, lang1, lang2, id){
  translate(text, { from: lang1, to: lang2 }).then(text => {
      Translation.findOneAndUpdate({_id:id},{translated: text})
  })
}