export interface ProjectObject {
  list: number[];
  projects: {
    id: number;
    name: string;
    viewState: any;
    accessLevel?: any;
  }[];
}
