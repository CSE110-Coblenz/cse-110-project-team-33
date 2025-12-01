// Level1Controller.test.ts
import { Level1Controller } from "../screens/GameScreen/Level1Screen/Level1Controller.ts";

// Mock PlayerDataManager and its methods
const mockSetCoins = jest.fn();
const mockAddToInventory = jest.fn();
const mockGetCoins = jest.fn(() => 500);
const mockGetLevel = jest.fn(() => 1);

const MockPlayerDataManager = {
    getCoins: mockGetCoins,
    setCoins: mockSetCoins,
    getLevel: mockGetLevel,
    setLevel: jest.fn(),
    clearInventory: jest.fn(),
    setInventory: jest.fn(),
    getInventory: jest.fn(() => []),
    addToInventory: mockAddToInventory,
} as any;

// Mock ScreenSwitcher
const mockSwitchToScreen = jest.fn();
const mockGetStage = jest.fn();
const MockScreenSwitcher = {
    switchToScreen: mockSwitchToScreen,
    getStage: mockGetStage,
} as any;

// Create mock nodes INSIDE factory functions that will be called by jest.mock
const createMockNode = () => {
    const handlers: Record<string, any> = {};
    
    const mockNode = {
        on: jest.fn((event: string, handler: any) => {
            handlers[event] = handler;
        }),
        off: jest.fn((event: string) => {
            delete handlers[event];
        }),
        fill: jest.fn(),
        destroy: jest.fn(),
        draggable: jest.fn(),
        position: jest.fn(() => ({ x: 100, y: 100 })),
        width: jest.fn(() => 50),
        height: jest.fn(() => 50),
        getLayer: jest.fn(() => ({ 
            batchDraw: jest.fn(), 
            draw: jest.fn() 
        })),
        dragBoundFunc: jest.fn(),
        
        // Helper methods to trigger events
        _triggerEvent: (event: string, ...args: any[]) => {
            if (handlers[event]) {
                handlers[event](...args);
            }
        },
        _getHandler: (event: string) => handlers[event],
    };
    
    return mockNode;
};

// Create the mock nodes
let mockOption1Node: any;
let mockOption2Node: any;
let mockOption3Node: any;
let mockBackpackNode: any;
let mockDoorNode: any;
let mockLevelClueNode: any;
let mockMGClueNode: any;
let mockCrystalNode: any;

// Mock Level1View implementation
jest.mock("../screens/GameScreen/Level1Screen/Level1View.ts", () => {
    return {
        Level1View: jest.fn().mockImplementation(() => {
            // Create fresh mock nodes for each test
            mockOption1Node = createMockNode();
            mockOption2Node = createMockNode();
            mockOption3Node = createMockNode();
            mockBackpackNode = createMockNode();
            mockDoorNode = createMockNode();
            mockLevelClueNode = createMockNode();
            mockMGClueNode = createMockNode();
            mockCrystalNode = createMockNode();
            
            return {
                waitForLoadBackground: jest.fn(() => Promise.resolve()),
                setCoins: jest.fn(),
                setProblemText: jest.fn(),
                setOption1Text: jest.fn(),
                setOption2Text: jest.fn(),
                setOption3Text: jest.fn(),
                animateMovePillar: jest.fn(() => Promise.resolve()),
                getGroup: () => ({ getLayer: () => ({ draw: jest.fn() }) }),
                
                // Node getters
                getOption1TextNode: () => mockOption1Node,
                getOption2TextNode: () => mockOption2Node,
                getOption3TextNode: () => mockOption3Node,
                getBackpackNode: () => mockBackpackNode,
                getDoorNode: () => mockDoorNode,
                getLevelClueNode: () => mockLevelClueNode,
                getMGClueNode: () => mockMGClueNode,
                getCrystalNode: () => mockCrystalNode,
            };
        }),
    };
});

// Mock Level1Model implementation
jest.mock("../screens/GameScreen/Level1Screen/Level1Model.ts", () => {
    return {
        Level1Model: jest.fn().mockImplementation(() => ({
            getCoins: jest.fn(() => 500),
            getProblemType: jest.fn(() => 2),
            getSOH: jest.fn(() => 10.5),
            getCAH: jest.fn(() => 20.0),
            getTOA: jest.fn(() => 30.1),
            getAnswer: jest.fn(() => 20.0),
            getSuccess: jest.fn(() => false),
            setSuccess: jest.fn(),
            addToCoins: jest.fn(),
            addToInventory: jest.fn(),
            getAngle: jest.fn(() => 45),
            getOpposite: jest.fn(() => 7),
            getAdjacent: jest.fn(() => 7),
            getHypotenuse: jest.fn(() => 9.9),
        })),
    };
});

describe('Level1Controller Integration Tests', () => {
    let controller: any;
    let model: any;
    let view: any;

    beforeEach(async () => {
        jest.clearAllMocks();
        
        // Create controller (initialize is called in constructor)
        controller = new Level1Controller(MockScreenSwitcher, MockPlayerDataManager);
        
        // Access the internal model and view instances
        model = controller.model;
        view = controller.view;
        
        // Make getCoins return updated value after addToCoins is called
        let currentCoins = 500;
        model.getCoins.mockImplementation(() => currentCoins);
        model.addToCoins.mockImplementation((amount: number) => {
            currentCoins += amount;
        });
    });

    describe('Multiple Choice Interaction', () => {
        test('should handle correct answer click', () => {
            // Trigger click on option 2 (correct answer: 20.0)
            mockOption2Node._triggerEvent('click');

            // 1. Model is updated
            expect(model.setSuccess).toHaveBeenCalledWith(true);
            expect(model.addToCoins).toHaveBeenCalledWith(100);

            // 2. View is updated
            expect(view.animateMovePillar).toHaveBeenCalled();
            // setCoins is called twice: once in constructor (500), once after correct answer (600)
            expect(view.setCoins).toHaveBeenCalledWith(600);
            expect(mockOption2Node.fill).toHaveBeenCalledWith("green");

            // 3. All options have click handlers removed
            expect(mockOption1Node.off).toHaveBeenCalledWith("click");
            expect(mockOption2Node.off).toHaveBeenCalledWith("click");
            expect(mockOption3Node.off).toHaveBeenCalledWith("click");
        });

        test('should handle wrong answer click', () => {
            jest.useFakeTimers();

            // Trigger click on option 1 (wrong answer: 10.5)
            mockOption1Node._triggerEvent('click');

            // 1. Model is NOT updated
            expect(model.setSuccess).not.toHaveBeenCalled();
            expect(model.addToCoins).not.toHaveBeenCalled();
            expect(view.animateMovePillar).not.toHaveBeenCalled();

            // 2. View shows temporary red color
            expect(mockOption1Node.fill).toHaveBeenCalledWith("red");

            // 3. Color resets after 500ms
            jest.advanceTimersByTime(500);
            expect(mockOption1Node.fill).toHaveBeenCalledWith("black");

            jest.useRealTimers();
        });
    });

    describe('Screen Switching', () => {
        test('should switch to inventory when backpack is clicked', () => {
            mockBackpackNode._triggerEvent('click');
            expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "inventory" });
        });

        test('should NOT switch to level2 when door is clicked if not successful', () => {
            model.getSuccess.mockReturnValue(false);
            mockDoorNode._triggerEvent('click');
            expect(mockSwitchToScreen).not.toHaveBeenCalled();
        });

        test('should switch to level2 when door is clicked if successful', () => {
            model.getSuccess.mockReturnValue(true);
            mockDoorNode._triggerEvent('click');
            expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "level2" });
        });
    });

    describe('Clue Drag and Inventory', () => {
        test('should add crystal to inventory and destroy node when dropped in backpack area', () => {
            // Simulate dropping in backpack area (top-left corner)
            mockCrystalNode.position.mockReturnValue({ x: 5, y: 5 });
            mockCrystalNode._triggerEvent('dragend');

            // 1. Model is updated
            expect(model.addToInventory).toHaveBeenCalledTimes(1);
            expect(model.addToInventory.mock.calls[0][0].name).toBe("crystal");

            // 2. View is updated
            expect(mockCrystalNode.destroy).toHaveBeenCalled();
        });

        test('should add levelClue (problemType 2) to inventory and destroy node', () => {
            // Simulate dropping in backpack area
            mockLevelClueNode.position.mockReturnValue({ x: 5, y: 5 });
            mockLevelClueNode._triggerEvent('dragend');

            // 1. Model is updated with correct inventory data
            const inventoryItem = model.addToInventory.mock.calls[0][0];
            expect(inventoryItem.name).toBe("levelClue");

            // For problemType 1 or 2, text3 is the Adjacent value (not hypotenuse)
            // Looking at Level1Controller.ts lines 175-184
            expect(inventoryItem.text3).toBe(String(model.getAdjacent()));

            // 2. View is updated
            expect(mockLevelClueNode.destroy).toHaveBeenCalled();
        });

        test('should NOT add mgClue to inventory when dropped outside the backpack area', () => {
            // Simulate dropping outside backpack area
            mockMGClueNode.position.mockReturnValue({ x: 100, y: 100 });
            mockMGClueNode._triggerEvent('dragend');

            // 1. Model is NOT updated
            expect(model.addToInventory).not.toHaveBeenCalled();

            // 2. View is NOT updated
            expect(mockMGClueNode.destroy).not.toHaveBeenCalled();
        });
    });
});