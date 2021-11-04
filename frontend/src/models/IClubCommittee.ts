import { ClubsInterface } from "./IClub";
export interface ClubCommitteesInterface {
    ID: number,
    Name: string,
    ID_Student: string,
    Password: string,
    ClubID: number,
    Club:ClubsInterface
  }