import { EpisodeContext } from "@/context/context";
import { EpisodeType } from "@/types/types";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Sidebar = () => {
  const [pageNum, setPageNum] = useState(1);
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const { episodeId, setEpisodeId } = useContext(EpisodeContext);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        if (nextPage) {
          const res = await axios.get(nextPage);
          res?.data.results.map((item: EpisodeType) =>
            setEpisodes((prev) => [...prev, { name: item.name, id: item.id }])
          );

          setNextPage(res?.data.info.next);
        } else {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/episode?page=${pageNum}`
          );

          res?.data.results.map((item: EpisodeType) =>
            setEpisodes((prev) => [...prev, { name: item.name, id: item.id }])
          );

          setNextPage(res?.data.info.next);

          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [pageNum]);

  return (
    <>
      <div className=" text-base p-2  h-[90vh]  overflow-y-scroll w-fit min-w-[20vw] bg-gray-500 rounded-xl mx-5">
        <div className="sticky top-[-10px] bg-gray-500">
          <h5 className="text-center font-bold text-black p-1">Episodes</h5>
          <hr></hr>
        </div>

        {loading ? (
          <div className="text-center my-10">Loading....</div>
        ) : (
          <>
            <ul>
              {episodes.map((episode) => (
                <li
                  className={`text-nowrap mt-2 text-center text-sm cursor-pointer ${
                    episodeId === episode.id && "text-purple-900"
                  }`}
                  key={episode.id}
                  onClick={() =>
                    setEpisodeId((prev) =>
                      prev === episode.id ? NaN : episode.id
                    )
                  }
                >
                  {episode.name}
                </li>
              ))}
            </ul>
            {nextPage && (
              <div
                onClick={() => setPageNum(pageNum + 1)}
                className="cursor-pointer text-xs text-purple-900 font-bold text-center mt-3"
              >
                Load More...
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
