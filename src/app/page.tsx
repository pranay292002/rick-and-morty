"use client";


import Sidebar from "@/components/Sidebar";
import Characters from "@/components/Characters";
import EpisodeProvider from "@/context/context";



export default function Home() {

 

  return (
    <>
    <EpisodeProvider>
    <h3 className="text-center align-middle text-purple-600 p-2 h-10">Rick and Morty Characters</h3>
    <div className="flex">
    <Sidebar />
    <Characters/>
    </div>
    </EpisodeProvider>
   
     
    </>
  );
}
