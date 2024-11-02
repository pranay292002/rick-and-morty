import React, { useEffect, useState, useContext } from "react";
import CharacterCard from "@/components/CharacterCard";
import axios from "axios";
import { EpisodeContext } from "@/context/context";
import { CharacterCardProps } from "@/types/types";

const Characters = () => {
  const { episodeId, setEpisodeId } = useContext(EpisodeContext);
  const [characters, setCharacters] = useState<string[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [maxPages, setMaxPages] = useState<number>(2);
  const [episodeName, setEpisodeName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const decrementPage = () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
    }
  };

  const incrementPage = () => {
    if (pageNum < maxPages) {
      setPageNum((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchSelectedEpisode = async (episodeId: number) => {
      setLoading(true);
      try {
        const selectedEpisode = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/episode/${episodeId}`
        );

        setCharacters([...selectedEpisode?.data.characters]);
        setEpisodeName(selectedEpisode?.data.name);
        setPageNum(1);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching selected episode:", err);
        setLoading(false);
      }
    };

    const fetchAllCharacters = async (pageNum: number) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/character?page=${pageNum}`
        );
        const chars = res?.data.results.map(
          (character: CharacterCardProps) => character.url
        );
        setCharacters([...chars]);
        setMaxPages(res?.data.info.pages);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching characters:", err);
        setLoading(false);
      }
    };

    if (episodeId) {
      fetchSelectedEpisode(episodeId);
    } else {
      fetchAllCharacters(pageNum);
    }
  }, [episodeId, pageNum]);

  return (
    <div className="flex flex-col h-[90vh] bg-gray-500  min-w-[70vw] rounded-xl mx-5">
      {loading ? (
        <div className="text-center my-10">Loading....</div>
      ) : (
        <>
          {episodeId >= 1 ? (
            <div className="px-10 py-2 text-xs">
              {characters.length} Characters in episode '{episodeName}'
            </div>
          ) : (
            <></>
          )}
          {characters.length > 0 ? (
            <div className="flex flex-wrap p-2  overflow-y-scroll h-[90vh]">
              {characters.map((url, index) => (
                <div key={`${url}-${index}`} className="w-fit">
                  <CharacterCard url={url} />
                </div>
              ))}
            </div>
          ) : (
            <p>No characters found.</p>
          )}

          {!episodeId && (
            <div className="flex w-full justify-center items-center gap-4 my-3">
              <span
                className={`px-2 py-0.5 rounded-lg cursor-pointer ${
                  pageNum <= 1 ? "bg-gray-600" : "bg-purple-800"
                }`}
                onClick={decrementPage}
              >
                {`< prev`}
              </span>
              <span
                className={`px-2 py-0.5 rounded-lg cursor-pointer ${
                  pageNum >= maxPages ? "bg-gray-600" : "bg-purple-800"
                }`}
                onClick={incrementPage}
              >
                {`next >`}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Characters;
