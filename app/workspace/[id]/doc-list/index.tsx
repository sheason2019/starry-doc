import { prisma } from "@/app/api/_modules/db";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Doc } from "@prisma/client";
import Link from "next/link";

export interface DocListProps {
  workSpaceId: number;
}

export async function DocList(props: DocListProps) {
  const docs = await prisma.doc.findMany({
    where: { workSpaceId: props.workSpaceId },
  });

  return (
    <Grid container>
      {docs.map((doc) => (
        <Grid xs={4} key={doc.id}>
          <DocPaper doc={doc} />
        </Grid>
      ))}
    </Grid>
  );
}

export interface DocProps {
  doc: Doc;
}

function DocPaper({ doc }: DocProps) {
  return (
    <Link href={`/doc/${doc.id}`} className="no-underline">
      <Paper variant="outlined" className="p-4">
        <div className="flex items-baseline">
          <h5 className="m-0 text-xl">
            {doc.title.length === 0 ? "untitled" : doc.title}
          </h5>
          <span className="ml-2 font-bold text-gray-400 text-opacity-60">
            {doc.id}
          </span>
        </div>
      </Paper>
    </Link>
  );
}
