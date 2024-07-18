import { SignIn } from "@/components/sign-in";
import { PageEntry } from "@/lib/definitions";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";



async function getData(): Promise<PageEntry[]> {
  const res = await fetch(`${process.env.dataApi}entries`, { next: { tags: ['homepage'] } })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const pageEntries = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn></SignIn>
      <h1>Ein Ort um Lilith zu gedenken.</h1>
      {pageEntries
      .sort((a: PageEntry, b: PageEntry) => a.desiredIndex - b.desiredIndex)
      .map((entry: PageEntry) => {
        return (
          <div>
            <h2>{entry.title}</h2>
            <p>{entry.text}</p>
          </div>
        );
      })}
      <Image src="/lilith-on-keyboard_500x888.webp" alt="Lilith liegt auf der Tastatur." width="500" height="888"/>
    </main>
  );
}
