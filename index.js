const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contact.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await getContactById(JSON.stringify(id));
      console.table(oneContact);

      break;

    case "add":
      const newContacts = await addContact({ name, email, phone });
      console.table(newContacts);
      break;

    case "remove":
      const removedContacts = await removeContact(JSON.stringify(id));
      console.table(removedContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
