
/* Level 2 demo model */
export class Level2Model {
    
    private sundial1Height : number = 1;
    private sundial2Height : number = 1;
    private sundial3Height : number = 1;
    private sundial1TargetHeight : number = 0;
    private sundial2TargetHeight : number = 0;
    private sundial3TargetHeight : number = 0;
    private doorLocked: boolean = true;

    resetLevel(): void {

        this.doorLocked = true;
    
        this.sundial1Height = 1;
        this.sundial2Height = 1;
        this.sundial3Height = 1;

        // TODO: Decide how to implement target height generation
        this.sundial1TargetHeight = 0;
        this.sundial2TargetHeight = 0;
        this.sundial3TargetHeight = 0;

    }

    getDoorState(): boolean {
        return this.doorLocked;
    }

    getSundial1Height(): number {
        return this.sundial1Height;
    }
    getSundial2Height(): number {
        return this.sundial1Height;
    }
    getSundial3Height(): number {
        return this.sundial1Height;
    }


    // Blah blah blah copy-paste code is bad but it still does its job

    getSundial1TargetHeight(): number {
        return this.sundial1TargetHeight;
    }
    
    setSundial1TargetHeight(height: number) : void {
        // TODO: Throw an assert or some other error handling thing here
        // to better sanitize this input.
        if(height >= 0)
        {
            this.sundial1TargetHeight = height;
        }
    }

    getSundial2TargetHeight(): number {
        return this.sundial2TargetHeight;
    }
    
    setSundial2TargetHeight(height: number) : void {
        // TODO: Throw an assert or some other error handling thing here
        // to better sanitize this input.
        if(height >= 0)
        {
            this.sundial2TargetHeight = height;
        }
    }

        getSundial3TargetHeight(): number {
        return this.sundial3TargetHeight;
    }
    
    setSundial3TargetHeight(height: number) : void {
        // TODO: Throw an assert or some other error handling thing here
        // to better sanitize this input.
        if(height >= 0)
        {
            this.sundial3TargetHeight = height;
        }
    }

}
