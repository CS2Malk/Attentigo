export default function PracticeLayout({
  main,
  sidebar,
}: {
  main: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div>
      {sidebar}
      {main}
    </div>
  );
}
