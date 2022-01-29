import { addClass } from "../../firebase";

export default async function handler(req, res) {
  const id = await addClass(req.body);
  res.status(200).json({ id });
}
