// Importing necessary modules from 'mongoose' to define schemas and models for MongoDB documents.
import { Schema, model, models } from "mongoose";

/*
  Summary:
  This file defines the Mongoose schema and model for a Transaction. The schema captures transaction details,
  including a unique Stripe ID and associated user, amount, and optional fields for plan and credits.
  Each transaction is a stripe conversion making credits to images
*/

// Schema definition for Transaction, detailing the structure and requirements for storing transaction data.
const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now, // Sets the default creation time to the current date and time.
  },
  stripeId: {
    type: String,
    required: true, // Stripe transaction ID, must be unique and is required.
    unique: true,
  },
  amount: {
    type: Number,
    required: true, // Amount involved in the transaction, required field.
  },
  plan: {
    type: String, // Optional description of the plan purchased, if applicable.
  },
  credits: {
    type: Number, // Optional number of credits involved in the transaction.
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model, linking a transaction to a buyer.
  },
});

// Retrieving the Transaction model from the existing models or creating a new one if not already present.
const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

// Exporting the Transaction model to enable its use across other parts of the application.
export default Transaction;
