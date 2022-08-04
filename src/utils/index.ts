export interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}

export default function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  