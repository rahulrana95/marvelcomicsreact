import { useQuery, useQueryClient } from "@tanstack/react-query";
import config from "../constants";
import { useState } from "react";

export interface TextObject {
  type: string;
  language: string;
  text: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Price {
  type: string;
  price: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Image {
  path: string;
  extension: string;
}

export interface Creator {
  resourceURI: string;
  name: string;
  role: string;
}

export interface CharacterSummary {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}

export interface StorySummary {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Series;
  variants: any[];
  collections: any[];
  collectedIssues: any[];
  dates: Date[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Image[];
  creators: {
    available: number;
    collectionURI: string;
    items: Creator[];
    returned: number;
  };
  characters: CharacterSummary;
  stories: StorySummary;
  events: CharacterSummary;
}

export interface Date {
  type: string;
  date: string;
}

const useFetchComicsByTitle = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [pageNum, setPageNum] = useState(0);

  const getChars = async (title: string, pageNum: number) => {
    try {
      let queryParams: {
        titleStartsWith: string;
        offset: number;
        apikey: string;
      } = {
        titleStartsWith: "",
        offset: pageNum * 20,
        apikey: config.MARVEL_PUBLIC_KEY || "",
      };

      if (title) {
        queryParams.titleStartsWith = title;
      }

      const searchParams = new URLSearchParams();
      // Add query parameters to the URLSearchParams object
      for (const key in queryParams) {
        // @ts-expect-error abs
        const value = queryParams[key]; // Type assertion here
        if (value) {
          searchParams.append(key, value.toString());
        }
      }

      const response = await fetch(
        `${config.MARVEL_BASE_URL}/v1/public/comics?${searchParams.toString()}`
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
    queryKey: ["fetchChar", title, pageNum],
    queryFn: () => getChars(title, pageNum),
  });

  console.log(query?.data?.result?.data); // results
  const resp = {
    result: query?.data?.result?.data?.results || [],
    total: query?.data?.result?.data?.total || 0,
    offset: query?.data?.result?.data?.offset || 0,
    limit: query?.data?.result?.data?.limit || 0,
    count: query?.data?.result?.data?.count || 0,
    totalPages: 0,
    setTitle,
    setPageNum,
    pageNum,
  };

  resp.totalPages = resp.total > 0 ? resp.total / resp.limit : 0;

  return resp;
};

export default useFetchComicsByTitle;
