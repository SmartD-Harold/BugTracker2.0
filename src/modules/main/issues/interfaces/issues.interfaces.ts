export interface IssuesListType<T, U> {
  mantisbt: T[];
  bugtracker: Map<number, U>;
}
