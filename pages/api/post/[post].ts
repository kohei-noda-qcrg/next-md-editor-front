import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ stat: string }>
) {
  if (req.method == "POST") {
    const post = req.query.post as string;
    fs.writeFileSync(path.join("posts", `${post}.md`), req.body);
    res.status(200).json({ stat: "SAVED" });
  } else {
    res.status(404).json({ stat: "Not Found" });
  }
}
