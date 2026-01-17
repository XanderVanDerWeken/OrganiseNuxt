import {
  checkUserCredentials,
  createSessionForUser,
  getUserByUsername,
} from "~~/server/users/user.service";
import type { LoginInput } from "~~/shared/models";

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginInput>(event);

  // Get User by username
  const userToAuthenticate = await getUserByUsername(body.username);

  if (!userToAuthenticate) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // Check Credentials
  if (await checkUserCredentials(userToAuthenticate, body.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // Create Session
  const session = await createSessionForUser(userToAuthenticate);

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
