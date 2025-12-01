// MenuController.test.ts
import { MenuController } from "../screens/MenuScreen/MenuController.ts";

// --- Setup Mocks ---

// Mock ScreenSwitcher
const mockSwitchToScreen = jest.fn();
const mockGetStage = jest.fn();
const MockScreenSwitcher = {
    switchToScreen: mockSwitchToScreen,
    getStage: mockGetStage,
} as any;

// Create mock button nodes
let mockStartButton: any;
let mockLoadButton: any;
let mockExitButton: any;

const createMockImageNode = () => {
    const handlers: Record<string, any> = {};
    
    return {
        x: jest.fn().mockReturnThis(),
        y: jest.fn().mockReturnThis(),
        width: jest.fn(() => 200),
        height: jest.fn(() => 100),
        on: jest.fn((event: string, handler: any) => {
            handlers[event] = handler;
        }),
        _triggerEvent: (event: string) => {
            if (handlers[event]) {
                handlers[event]();
            }
        },
    };
};

// Mock Konva.Image.fromURL to capture button creation
jest.mock("konva", () => {
    return {
        default: {
            Group: jest.fn().mockImplementation(() => ({
                visible: jest.fn(),
                add: jest.fn(),
                getLayer: jest.fn(() => ({ draw: jest.fn() })),
            })),
            Rect: jest.fn().mockImplementation(() => ({})),
            Image: {
                fromURL: jest.fn((url: string, callback: any) => {
                    let mockNode;
                    if (url.includes("start.png")) {
                        mockStartButton = createMockImageNode();
                        mockNode = mockStartButton;
                    } else if (url.includes("load.png")) {
                        mockLoadButton = createMockImageNode();
                        mockNode = mockLoadButton;
                    } else if (url.includes("exit.png")) {
                        mockExitButton = createMockImageNode();
                        mockNode = mockExitButton;
                    }
                    callback(mockNode);
                }),
            },
        },
    };
});

describe('MenuController Tests', () => {
    let controller: any;
    let view: any;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new MenuController(MockScreenSwitcher);
        view = controller.getView();
    });

    describe('Button Click Handlers', () => {
        test('should switch to intro screen when start button is clicked', () => {
            mockStartButton._triggerEvent('click');
            expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "intro" });
        });

        test('should switch to load screen when load button is clicked', () => {
            mockLoadButton._triggerEvent('click');
            expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "load" });
        });

        test('should switch to exit screen when exit button is clicked', () => {
            mockExitButton._triggerEvent('click');
            expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "exit" });
        });
    });

    describe('View Management', () => {
        test('should return the view instance', () => {
            expect(view).toBeDefined();
            expect(controller.getView()).toBe(view);
        });
    });
});