import { addMainLink } from "../../firebase";

export default async function handler(req, res) {
  const id = await addMainLink(req.body);
  res.status(200).json({ id });
}
