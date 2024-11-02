import React, { useEffect, useState } from "react";
import axios from "axios";
import { CharacterCardProps } from "@/types/types";

const CharacterCard = ({ url }: CharacterCardProps) => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios.get(url);

        setName(res?.data.name);
        setImgUrl(res?.data.image);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCharacter();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-2 w-44 h-32  text-center">
        {imgUrl && (
          <>
            <img className="rounded-xl h-20 w-20" src={imgUrl} alt={name}></img>
            <h4 className="p-1 text-xs">{name}</h4>
          </>
        )}
      </div>
    </>
  );
};

export default CharacterCard;
