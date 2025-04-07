// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("aferis");

db.users.updateOne(
    { _id: ObjectId("67f2dd229bf146cdf24381df") },  // Find the user by their ObjectId
    { $set: { role: "admin" } }         // Update the role field
  );
  