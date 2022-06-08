import {  XMLBuilder, XMLParser } from 'fast-xml-parser';
import { IEpg } from './definitions';

const defaultOptions = { ignoreAttributes: false };

export const parser = {
  toXml: (epg: IEpg): Buffer => {
    return new XMLBuilder(defaultOptions).build(epg);
  },
  parse: (datas: Buffer): IEpg => {
    return new XMLParser(defaultOptions).parse(datas);
  },
};
