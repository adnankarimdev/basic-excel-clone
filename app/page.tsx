import Spreadsheet from "./components/spreadsheet/spreadsheet";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel Clone</h1>
      <Spreadsheet />
    </main>
  );
}
