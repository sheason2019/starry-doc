import { prisma } from "@/app/api/_modules/db";
import { Container } from "@mui/material";
import { NewDocButton } from "./new-doc-button";
import { DocList } from "./doc-list";

export default async function WorkSpacePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const workSpaceId = Number(id);
  const workspace = await prisma.workSpace.findUnique({
    where: { id: workSpaceId },
  });

  return (
    <Container className="mt-4">
      <div className="flex items-baseline">
        <h1 className="m-0 text-3xl">{workspace?.workSpaceName}</h1>
        <span className="ml-2 font-bold text-gray-400 text-opacity-60">
          WorkSpace
        </span>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <h2 className="m-0 text-xl flex-1">Docs</h2>
          <NewDocButton workSpaceId={workSpaceId} />
        </div>
      </div>
      <DocList workSpaceId={workSpaceId} />
    </Container>
  );
}
