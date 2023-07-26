import { DocEditor } from "./editor";

export default async function DocPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-gray-200">
      <DocEditor />
    </div>
  );
}
