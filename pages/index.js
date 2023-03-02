import { PageBuilder } from "@/comps/PageBuilder/PageBuilder";
import AppProvider from "@/utils/provider";

export default function Home() {
  return (
    <AppProvider>
      <PageBuilder />
    </AppProvider>
  );
}
