import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <p className="display mb-5 text-xs uppercase tracking-[0.2em] text-moss">
          Portfolio / Control room
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
          Admin CMS
        </h1>
        <p className="mb-8 max-w-sm text-sm leading-6 text-slate-600">
          Manage the certifications that appear on your public portfolio.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
