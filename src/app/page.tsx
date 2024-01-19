"use client";

import { Artist, ArtistSearchResult, Artists, SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk"; // use "@spotify/web-api-ts-sdk" in your own project
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const session = useSession();
  // console.log(session)

  if (!session || session.status !== "authenticated") {
    return (
      // use apis artist info
      <div className="h-screen flex flex-col items-center justify-center">
        <h1>ARTIST HOMEPAGE</h1>
        <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    );
  }

  return (
    <div>
      {/* <p>Logged in as {session.data.user?.name}</p> */}
      <button onClick={() => signOut()}>Sign out</button>
      <SpotifySearch sdk={sdk} />
    </div>
  );
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const [results, setResults] = useState<SearchResults>({} as SearchResults);

  useEffect(() => {
    (async () => {
      const data = await sdk.search("alyssa grey", ["album","artist",]);
      setResults(() => data);
      // console.log(data);
    })();
  }, [sdk]);
console.log(results)
  // generate a table for the results
  const albums = results.albums?.items.slice(0, 9).map((item) => {
    return (
      <div key={item.id}>
        <div>{item.name}</div>
        <Image 
          src={item.images[1].url} 
          height={100} 
          width={100}
          alt={item.name}></Image>
      </div>
    );
  });

  return (
    <div className="h-screen grid items-center justify-center">
    {albums}
    </div>
  );
}
