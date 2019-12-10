const translate = require('translate')

translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20191210T115214Z.4531ec268421712a.ff53d329c913eb07df8eec7c438028871bcbff83';


let text = 'Я не дурак'
let lang1 = 'ru'
let lang2 = 'en'
translate(text, { from: lang1, to: lang2 }).then(text => {
    console.log(text);  // Hola mundo
  });