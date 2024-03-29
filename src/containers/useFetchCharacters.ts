import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import config from "../constants";

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comic {
  resourceURI: string;
  name: string;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Story {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Event {
  resourceURI: string;
  name: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: Comic[];
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: Series[];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: Story[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: Event[];
    returned: number;
  };
  urls: Url[];
}

const useFetchCharacters = () => {
  const [page, setPage] = useState(0);
  const [chars, setCharData] = useState<Character[]>([]);

  const getChars = async (page: number) => {
    try {
      const response = await fetch(
        `${config.MARVEL_BASE_URL}/v1/public/characters?offset=${
          page * 40
        }&apikey=${config.MARVEL_PUBLIC_KEY}`
      );
      const result = await response.json();
      return {
        result,
        errorMessage: "",
      };
    } catch (err: any) {
      return {
        result: [],
        errorMessage: err.message,
      };
    }
  };

  const query = useQuery({
    queryKey: ["fetchChar", page],
    queryFn: () => getChars(page),
  });

  const idToCharMap: { [id: string]: Character } = chars.reduce(
    (acc: { [id: string]: Character }, curr: Character) => {
      acc[curr.id] = curr;
      return acc;
    },
    {}
  );

  useEffect(() => {
    const data = query.data?.result?.data || { results: [] }; // Fallback value for data
    if (data.results.length > 0) {
      setCharData((chars: Character[]) => [...chars, ...data.results]);
    }
  }, [query.data?.result?.data]);

  return {
    result: query.data?.result?.data,
    errorMessage: query.data?.errorMessage,
    idToCharMap,
    setPage,
    chars,
  };
};

export default useFetchCharacters;
