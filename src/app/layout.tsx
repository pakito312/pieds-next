export const metadata = {
  title: "Pieds dans l'eau Soa - Restaurant Camerounais Traditionnel",
  description: "Restaurant traditionnel camerounais à Soa proposant des plats authentiques, une ambiance chaleureuse et une boutique de produits artisanaux.",
  viewport: "width=device-width, initial-scale=1.0",
  icons: [
    { url: "/uploads/6b0f4bd8-4378-46b9-9ba0-6b09bd6832c5.png", rel: "icon" },
  ],
};


import ClientLayout from './client-layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout htmlAttrs={{"lang":"fr"}} >{children}</ClientLayout>;
}