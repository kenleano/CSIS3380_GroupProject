const fs = require('fs');

async function generateId(collection){
  const db = await getDB();
  let col = db[collection];
  let size = col.lenght() - 1;
  return col[size].id + 1;
}

async function randomKey(){

    let randNum = Math.floor(Math.random()*25);
    let key = String.fromCharCode(randNum+65);
    randNum = Math.floor(Math.random()*25);
    key += String.fromCharCode(randNum+97);
    randNum = Math.floor(Math.random()*100);
    key += "" + randNum;
    randNum = Math.floor(Math.random()*25);
    key += String.fromCharCode(randNum+97);
    randNum = Math.floor(Math.random()*25);
    key += String.fromCharCode(randNum+65);
    randNum = Math.floor(Math.random()*100);
    key += "" + randNum;

    const char = String.fromCharCode(34);
    let doc = '{ "id":' + char + key + char + '}'

    const db = await getDB();
    db.oneTimeKeys.push(doc);
    return doc.id;

}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('db.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


function getDB(){
  return new Promise((resolve, reject) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

async function retrieveDocument(id, collection){
  const db = await getDB();
  let col = db[collection];
  return col.find(doc => doc.id == id);
}

async function createDocument(newDoc, collection) {
  const db = await getDB();
  newDoc.id = generateId(collection); 
  db[collection].push(newDoc);
  await save(db); 
  return newDoc;
  }

async function updateDocument(newDoc, collection){
  const db = await getDB();
  db = db[collection].filter(item => item.id != newDoc.id);
  await save(db);
  db[collection].push(newDoc);
  await save(db);
}

async function deleteDocument(doc, collection){
    const db = await getDB();
    db = db[collection].filter(item => item.id != doc.id);
    await save(db);
}





module.exports = {
  retrieveDocument,
  getDB, 
  createDocument, 
  updateDocument, 
  deleteDocument,
  randomKey
}
