import AppHeader from "../AppHeader/AppHeader";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
