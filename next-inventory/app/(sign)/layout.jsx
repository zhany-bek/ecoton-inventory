import "@styles/globals.css";

export const metadata = {
  title: "Sign In",
  description: "Sign-in page for Ecoton Inventory Management",
};

const SignInLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="app">
          {children}
        </main>
      </body>
    </html>
  );
};

export default SignInLayout;