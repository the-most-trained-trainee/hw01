const fs = require('fs').promises;
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

function listContacts() {
  fs.readFile(contactsPath)
    .then(data => console.log(JSON.parse(data)))
    .catch(err => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(contacts => console.log(contacts.find(contact => contact.id === contactId.toString())))
    .catch(err => console.log(err.message))
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(contacts => contacts.filter(contact => contact.id !== contactId.toString()))
    .then(updatedContacts => fs.writeFile(contactsPath, JSON.stringify(updatedContacts), err => {
      if (err) {
        console.error(err);
      };
    }))
    .then(res => listContacts())
    .catch(err => console.log(err.message))
}

function addContact(name, email, phone) {
  let newContact = {
    id: '0',
    name: name.toString(),
    email: email.toString(),
    phone: phone.toString()
  }
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(contacts => contacts.map(contact => parseInt(contact.id)))
    .then(allId => Math.max(...allId) + 1)
    .then(id => newContact.id = id.toString())
    .then(() => fs.readFile(contactsPath))
    .then(contactBeforeUpdate => JSON.parse(contactBeforeUpdate))
    .then(prevContacts => fs.writeFile(contactsPath, JSON.stringify([...prevContacts, newContact]), err => {
      if (err) {
        console.error(err);
      };
    }))
    .then(res => listContacts())
    .catch(err => console.log(err.message))
}


module.exports = { listContacts, getContactById, removeContact, addContact }