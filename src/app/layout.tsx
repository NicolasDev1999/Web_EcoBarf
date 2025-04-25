// app/layout.tsx
import"./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="custom-cursor ">
        <main>{children}</main>
        <footer className="p-4 bg-green-900 text-white text-center">© 2025 EcoBarf</footer>
      </body>
    </html>
  );
}
