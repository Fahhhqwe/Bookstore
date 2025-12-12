export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen antialiased bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
            {children}
        </div>
    );
}
