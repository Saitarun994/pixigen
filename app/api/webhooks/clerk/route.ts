/* eslint-disable camelcase */
import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

/*
  Summary:
  This function handles POST requests to process different types of user-related webhook events.
  It verifies incoming webhook signatures, parses the event data, and performs create, update, or delete
  operations on user data based on the event type.
*/

export async function POST(req: Request) {
  // Extracting the webhook secret from environment variables.
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  
  // Throw an error if the WEBHOOK_SECRET is not set, indicating setup is incomplete.
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Retrieving headers from the request to validate the incoming webhook.
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Validate presence of required headers; return error if any are missing.
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Parsing the request body for processing.
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Initializing the Webhook instance with the secret for signature verification.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Attempting to verify the webhook payload against the provided headers.
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Extracting the event type and ID for further processing.
  const { id } = evt.data;
  const eventType = evt.type;

  // Handling 'user.created' event type to create a new user.
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,        // Assert non-null with TypeScript non-null assertion operator
      firstName: first_name|| "", // Provide a default empty string if null,
      lastName: last_name || "",  // Provide a default empty string if null
      photo: image_url,
    };

    const newUser = await createUser(user);

    // Setting public metadata for the new user if creation was successful.
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "OK", user: newUser });
  }

  // Handling 'user.updated' event type to update existing user data.
  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name|| "", // Provide a default empty string if null,
      lastName: last_name || "",  // Provide a default empty string if null
      username: username!,        // Assert non-null with TypeScript non-null assertion operator
      photo: image_url,
    };

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  // Handling 'user.deleted' event type to delete a user.
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser(id!);

    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  // Logging details of the webhook for debugging purposes.
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  // Return a 200 status response for successful webhook processing not leading to an error or specific action.
  return new Response("", { status: 200 });
}