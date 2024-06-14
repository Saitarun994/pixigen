import {Schema, model, models} from "mongoose";

/* Summary: defines the Mongoose schema and model for a User, including unique identifiers 
   and personal details with defaults for optional fields.
*/

/* Defining the schema for the 'User' model. Each field is typed and constraints are specified,
  ensuring data integrity. The schema includes both mandatory and optional fields with defaults 
  for some to simplify object creation.
*/
const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true }, // Unique clerk ID, required for each user.
    email: { type: String, required: true, unique: true }, // User's email address, must be unique and is required.
    username: { type: String, required: true, unique: true }, // Username, must be unique and is required.
    photo: { type: String, required: true }, // URL or path to the user's profile photo, required.
    firstName: { type: String }, // Optional first name of the user.
    lastName: { type: String }, // Optional last name of the user.
    planId: { type: Number, default: 1 }, // Identifier for the user's plan, defaults to 1 if not specified.
    creditBalance: { type: Number, default: 10 }, // User's initial credit balance, defaults to 10.
});

/* Retrieves an existing model if one is defined, otherwise creates a new model.
  This prevents multiple model compilations which can lead to complications.
  
*/
const User = models?.User || model('User', UserSchema);

//exporting model from the schema
export default User;