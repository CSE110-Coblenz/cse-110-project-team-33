import type {PlayerData} from "../types.ts";

const STORAGE_KEY = 'playerData';

export class LocalStorageUtils {
    public static savePlayerData(playerData: PlayerData): void {
        try {
            // convert player data to json string
            const jsonString = JSON.stringify(playerData);
            localStorage.setItem(STORAGE_KEY, jsonString);
            console.log("All player data saved.");
        } catch (error) {
            console.error("Error saving player data: ", error);
        }
    }

    public static loadPlayerData(): PlayerData | null {
        try {
            const jsonString = localStorage.getItem(STORAGE_KEY);

            if (jsonString == null) {
                return null;
            }

            return JSON.parse(jsonString) as PlayerData;
        } catch (error) {
            console.error("Error loading player data: ",  error);
            return null;
        }
    }

}