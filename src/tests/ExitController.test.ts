// ExitController.test.ts
import { ExitController } from "../screens/MenuScreen/ExitScreen/ExitController.ts";

// --- Setup Mocks ---

// Mock ScreenSwitcher
const mockSwitchToScreen = jest.fn();
const mockGetStage = jest.fn();
const MockScreenSwitcher = {
    switchToScreen: mockSwitchToScreen,
    getStage: mockGetStage,
} as any;

// Mock window.close
const mockWindowClose = jest.fn();
(window as any).close = mockWindowClose;

// Store the callbacks passed to the view constructor
let onYesClick: () => void;
let onNoClick: () => void;

// Mock ExitView
jest.mock("../screens/MenuScreen/ExitScreen/ExitView.ts", () => {
    return {
        ExitView: jest.fn().mockImplementation((yesCallback: () => void, noCallback: () => void) => {
            // Store the callbacks so we can trigger them in tests
            onYesClick = yesCallback;
            onNoClick = noCallback;
            
            return {
                show: jest.fn(),
                hide: jest.fn(),
                getGroup: jest.fn(() => ({
                    visible: jest.fn(),
                    getLayer: jest.fn(() => ({ draw: jest.fn() })),
                })),
            };
        }),
    };
});

describe('ExitController Tests', () => {
    let controller: any;
    let view: any;

    beforeEach(() => {
        jest.clearAllMocks();
        controller = new ExitController(MockScreenSwitcher);
        view = controller.getView();
    });

    describe('Button Click Handlers', () => {
        test('should switch to menu when no button is clicked', () => {
            onNoClick();
            expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "menu" });
        });

        test('should call window.close when yes button is clicked', () => {
            onYesClick();
            expect(mockWindowClose).toHaveBeenCalled();
        });

        test('should not switch screens when yes button is clicked', () => {
            onYesClick();
            expect(mockSwitchToScreen).not.toHaveBeenCalled();
        });
    });

    describe('View Management', () => {
        test('should return the view instance', () => {
            expect(view).toBeDefined();
            expect(controller.getView()).toBe(view);
        });
    });
});