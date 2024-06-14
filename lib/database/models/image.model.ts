import {  Document, Schema, model, models } from "mongoose";

/* Summary:This file defines a Mongoose model for images, specifying structure and data validation for image entries in MongoDB.
  It ensures fields like title, URLs, and author are properly formatted and includes default values for timestamps.
  The `Image` model is compiled from this schema, handling any existing model instance appropriately to avoid duplication.
*/

// Interface for image data that mirrors the Mongoose schema defined for an image.
export interface IImage extends Document {
    title: string; // Title of the image, required.
    transformationType: string; // Type of transformation applied to the image, required.
    publicId: string; // A unique identifier for the image, required.
    secureUrl: string; // Secure URL to access the image, required.
    width?: number; // Optional width of the image in pixels.
    height?: number; // Optional height of the image in pixels.
    config?: object; // Optional configuration used for image processing.
    transformationUrl?: string; // Optional URL of the transformed image.
    aspectRatio?: string; // Optional aspect ratio of the image.
    color?: string; // Optional dominant color of the image.
    prompt?: string; // Optional prompt used for generating the image.
    author: {
       _id:string;
       firstName:string;
       lastName:string; 
    }
    createdAt?: Date; // Optional timestamp of image creation, defaults to current time.
    updatedAt?: Date; // Optional timestamp of the last update, defaults to current time.
}

/* Defining a schema for the 'Image' model. This schema will dictate the structure
  of the database entries for storing image-related data. Each field is defined with a type
  and constraints like 'required' to ensure data integrity.
*/
const ImageSchema = new Schema({
    title: { type: String, required: true }, // Title of the image, required field.
    transformationType: { type: String, required: true }, // Type of transformation applied to the image, required field.
    publicId: { type: String, required: true }, // A unique identifier for the image, required field.
    secureUrl: { type: URL, required: true }, // Secure URL to access the image, required field.
    width: { type: Number }, // Width of the image in pixels.
    height: { type: Number }, // Height of the image in pixels.
    config: { type: Object }, // Configuration used for image processing, stored as an object.
    transformationUrl: { type: URL }, // URL of the transformed image.
    aspectRatio: { type: String }, // Aspect ratio of the image.
    color: { type: String }, // Dominant color of the image.
    prompt: { type: String }, // Prompt used for generating the image.
    author: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model, linking an image to its creator.
    createdAt: { type: Date, default: Date.now }, // Timestamp of image creation, defaults to current time.
    updatedAt: { type: Date, default: Date.now } // Timestamp of the last update, defaults to current time.
});

/* Compiling the model from the schema if it's not already compiled.
  This ensures that we do not create multiple instances of the same model
  which can lead to complications with Mongoose's model registry.
*/
const Image = models?.Image || model('Image', ImageSchema);

//exporting model from the schema
export default Image;