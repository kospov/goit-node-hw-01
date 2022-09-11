const path = require("path");
const fs = require("fs/promises");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);

    return JSON.parse(result);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) {
      throw new Error("Contact not found");
    }

    contacts.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

    return contacts;
  } catch (err) {
    console.log(err);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuid(), name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

    return contacts;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
