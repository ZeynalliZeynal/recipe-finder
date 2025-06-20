export default function RecipesLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="min-h-screen py-16 flex flex-col justify-center">
      {children}
    </main>
  );
}
