import Link from "next/link"

export default function Navbar() {
    return (
        <>
            <nav>
                <div className="flex gap-2 text-2xl">
                    <Link href='/'>Home</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/info'}>Info</Link>
                </div>
            </nav>
        </>
    );
}