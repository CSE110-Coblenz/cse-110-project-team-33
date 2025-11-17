import type {PlayerData, PlayersData} from "./types.ts";

const STORAGE_KEY = 'playerData';

export class LocalStorageUtils {
    public static savePlayersData(playersData: PlayersData): void {
        try {
            // convert player data to json string
            const jsonString = JSON.stringify(playersData);
            localStorage.setItem(STORAGE_KEY, jsonString);
            console.log("All player data saved.");
        } catch (error) {
            console.error("Error saving all player data: ", error);
        }
    }

    public static loadPlayersData(): PlayersData | null {
        try {
            const jsonString = localStorage.getItem(STORAGE_KEY);

            if (jsonString == null) {
                return null;
            }

            return JSON.parse(jsonString) as PlayersData;
        } catch (error) {
            console.error("Error loading state from localStorage: ",  error);
            return null;
        }
    }

}