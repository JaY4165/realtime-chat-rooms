import React from "react";

function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 max-md:px-3">
      {children}
    </div>
  );
}

export default AuthLayout;
