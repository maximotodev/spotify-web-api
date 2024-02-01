"use client";

import { SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk"; // use "@spotify/web-api-ts-sdk" in your own project
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Video from "@/components/ReactPlayer";

export default function Home() {
  const session = useSession();
  const [isClient, setIsClient] = useState(false)
  useEffect(()=> {
    setIsClient(true)
  },[])

  if (!session || session.status !== "authenticated") {
    return (
      // use apis artist info
      <div className="relative h-screen flex flex-col items-center">
        {isClient && <Video />}
        <button className="absolute top-3/4 btn btn-accent" onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    );
  }

  return (
    <div>
      <SpotifySearch sdk={sdk} />
      <p>Logged in as {session.data.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const [results, setResults] = useState<SearchResults<["album"]>>({} as SearchResults<["album", "artist"]>);

  useEffect(() => {
    (async () => {
      const data = await sdk.search("alyssa grey", ["album","artist",]);
      setResults(() => data);
      console.log(data);
    })();
  }, [sdk]);

console.log(results)
  // generate a table for the results
  // const artist = results
  const albums = results.albums?.items.slice(0, 9).map((item) => {
    return (
        <Link
        key={item.id} 
        className="carousel-item"
        href={item.external_urls.spotify}>
        {item.name}
        <Image 
          className="rounded-box"
          src={item.images[1].url} 
          height={100} 
          width={100}
          alt={item.name}></Image>
      </Link>
      
    );
  });

  return (
    <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
    {albums}
    </div>
  );
}
