export interface Track {
    title: string;
    id: string;
    tasks: Task[];
    key: string;
  }
  
  export interface Task {
    key: string;
    title: string;
    description: string;
    id: string;
  }