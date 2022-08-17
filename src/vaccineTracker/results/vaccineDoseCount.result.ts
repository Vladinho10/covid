type ResultParameters = {
  weekStart: string;
  weekEnd: string;
  NumberDosesReceived: number;
};
export type VaccineDoseResult = {
  summary: ResultParameters[] | [];
};

export class VaccineDoseCountResult {
  public readonly summary: any;

  constructor(parameters: ResultParameters[]) {
    this.summary = parameters;
  }
}
