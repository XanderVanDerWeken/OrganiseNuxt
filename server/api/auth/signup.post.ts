import {
  createSessionForUser,
  tryCreateUser,
} from "~~/server/users/user.service";
import type { LoginInput } from "~~/shared/models";

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginInput>(event);

  // Add User
  const createdUser = await tryCreateUser(body.username, body.password);

  if (!createdUser) {
    throw createError({
      statusCode: 500,
      statusMessage: "Could not create User",
    });
  }

  // Create Session
  const session = await createSessionForUser(createdUser);

  // Set Cookie
  setCookie(event, "auth", session.id, {
    httpOnly: true,
    sameSite: "lax", // CSRF protection
    secure: false, // Change to use HTTPS in Prod
    path: "/", // entire site
  });

  // Return Sucess
  setResponseStatus(event, 204);
});
