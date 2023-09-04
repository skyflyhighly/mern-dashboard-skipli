const { initializeApp, deleteApp } = require("firebase-admin/app");
const {
  getFirestore,
  connectFirestoreEmulator,
} = require("firebase-admin/firestore");

/**
 * The PROJECT_ID must be the same as the `project` argument of the `db:up` command in the {@link package.json}
 */
const PROJECT_ID = "test-db";

/**
 * Default port of firestore emulator is 8080
 */
const FIRESTORE_PORT = 8080;

function createDatabaseConnection() {
  /**
   * For the firebase-admin to connect with the emulator, we have to set the environment variable to the `localhost:8080`, which is the location of the Firestore emulator.
   * @see {@link https://github.com/firebase/firebase-admin-node/issues/776#issuecomment-751685424}
   */
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  const app = initializeApp(
    {
      projectId: PROJECT_ID,
    },
    "test-firebase-app"
  );
  const db = getFirestore(app);
  return { app, db };
}

/**
 * @param {FirebaseFirestore.Firestore} firestore
 */
async function clearData(firestore) {
  const collections = await firestore.listCollections();
  const deleteCollectionPromises = collections.map(async (col) =>
    firestore.recursiveDelete(col)
  );
  try {
    await Promise.all(deleteCollectionPromises);
  } catch (err) {
    throw new Error("Error while clearing data\n" + err);
  }
}

/**
 * @param {App} app
 */
async function dropConnection(app) {
  try {
    await deleteApp(app);
  } catch (err) {
    throw new Error("Error while dropping connection.\n" + err);
  }
}

module.exports = {
  createDatabaseConnection,
  clearData,
  dropConnection,
};
