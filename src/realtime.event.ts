export interface RealtimeEvent<T = any> {
  name: string;
  data: T;
  [x: string]: any;

  /**
   * Implemented as function to not clogging `console.log(event)` with raw data.
   */
  raw(): any;
}
