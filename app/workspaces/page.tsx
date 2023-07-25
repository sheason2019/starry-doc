import { Container } from "@mui/material";
import { NewWorkSpaceButton } from "./new-workspace-button";
import WorkSpaces from "./workspace-list";

export default function WorksapcesPage() {
  return (
    <Container>
      <div className="flex items-center mt-4">
        <div className="text-2xl flex-1">WorkSpaces</div>
        <NewWorkSpaceButton />
      </div>
      <WorkSpaces />
    </Container>
  );
}
