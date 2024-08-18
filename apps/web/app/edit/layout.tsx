export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-screen justify-center">{children}</div>;
}
