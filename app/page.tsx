import Link from "next/link";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <Link href="/assets">Assets test1</Link>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
