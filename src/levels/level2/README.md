## Level 2 Code structure notes

This level design (mostly) adheres to the MVC model, as silly as it may be at
times, but thats what this class is about so we're embracing the silliness.

### Views:

This folder contains the 'subviews' of the level, each exist as an object within
the Level2View, and are switched between to display different parts of the level,
much like the main screen switching does.

### ViewElements:

This folder contains elements that are included in views, this is mainly for
code organization, and these should act similar to front ends for the data
stored in the main level controller, just with a neat wrapper around the
actual Konva interactions.


_2025-11-02 Connor Larmer_
