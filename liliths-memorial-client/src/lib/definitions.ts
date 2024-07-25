import { ObjectId } from "mongodb";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

export type PageEntry = {
    desiredIndex: number;
    title: string;
    text: string;
  };

  export type GaleryImage = {
    id: Key | null | undefined;
    src: string | StaticImport;
    alt: string;
    width: number;
    height: number;
  };

export type BlogEntry = {
    id: string | null | undefined;
    title: string;
    content: string;
    thumbnail: string;
    date: Date;
  };

export type BlogEntries = BlogEntry[];
