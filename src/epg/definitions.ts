export interface IEpg {
  tv: {
    channel: unknown[];
    programme: ITvProgram[];
  };
}
export interface ITvProgram {
  '@_channel': string;
  '@_start': string;
  '@_stop': string;
  desc: string;
  title: string;
}
