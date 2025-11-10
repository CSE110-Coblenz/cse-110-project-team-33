export class Level3Model {
    private isSuccessful: boolean = false;

    // set the flag to this puzzle as correct
    setIsSuccessful(isCorrect: boolean): void {
        this.isSuccessful = isCorrect;
    }

    // returns the status of whether the puzzle is successful or not
    getSuccessful(): boolean {
        return this.isSuccessful;
    }
}