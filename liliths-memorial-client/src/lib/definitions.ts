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