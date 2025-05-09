export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>ecobarf</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="EcoBarf - Alimentación Natural para Perros" />
        <meta name="keywords" content="perros, alimentación natural, EcoBarf, comida para perros, salud canina" />
        <meta name="author" content="EcoBarf Team" />
        <meta property="og:title" content="EcoBarf - Alimentación Natural para Perros" />
      </head>
      <body className="custom-cursor ">
        <main>{children}</main>

      </body>
    </html>
  );
}
