import { deleteSession } from "~~/server/users/user.service";

export default defineEventHandler(async (event) => {
  // Delete Session
  const sessionId = getCookie(event, "auth");

  if (!sessionId) {
    throw createError({
      statusCode: 500,
      statusMessage: "Could not logout user",
    });
  }

  await deleteSession(sessionId);

  // Delete Auth Cookie
  deleteCookie(event, "auth");
});
