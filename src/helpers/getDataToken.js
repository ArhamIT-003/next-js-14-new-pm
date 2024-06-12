import jwt from "jsonwebtoken";

export async function getDataFromToken(request) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error);
  }
}
