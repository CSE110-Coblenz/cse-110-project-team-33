// Level2Controller.test.ts
import { Level2Controller } from "../screens/GameScreen/Level2Screen/Level2Controller.ts";

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

// Mock ScreenSwitcher with minimal API used by controllers
const mockSwitchToScreen = jest.fn();
const mockGetPlayerDataManager = jest.fn();
const MockScreenSwitcher: any = {
	switchToScreen: mockSwitchToScreen,
	getPlayerDataManager: mockGetPlayerDataManager,
};

// Helper to create mock Konva-like nodes with event registration and helpers
const createMockNode = () => {
	const handlers: Record<string, any> = {};
	return {
		on: jest.fn((event: string, handler: any) => { handlers[event] = handler; }),
		off: jest.fn((event: string) => { delete handlers[event]; }),
		x: jest.fn(() => 0),
		y: jest.fn(() => 0),
		position: jest.fn(() => ({ x: 0, y: 0 })),
		width: jest.fn(() => 10),
		height: jest.fn(() => 10),
		visible: jest.fn(),
		destroy: jest.fn(),
		getLayer: jest.fn(() => ({ batchDraw: jest.fn(), draw: jest.fn() })),
		draggable: jest.fn(),
		dragBoundFunc: jest.fn(),
		id: jest.fn(() => ""),
		findAncestor: jest.fn(() => ({ id: () => "" })),
		_triggerEvent: (event: string, ...args: any[]) => { if (handlers[event]) handlers[event](...args); },
		_getHandler: (event: string) => handlers[event],
	} as any;
};

// Mocks for Level2Model, Level2View, RoomView, SundialView
let mockLevelView: any;
let mockRoomView: any;
// sundial mocks are not referenced directly in tests
let mockClueElement: any;
let mockGemElement: any;

jest.mock("../screens/GameScreen/Level2Screen/Level2Model.ts", () => {
	return {
		Level2Model: jest.fn().mockImplementation(() => ({
			getCoins: jest.fn(() => 0),
			getSundialHeight: jest.fn(() => 0),
			getSundialTargetTheta: jest.fn(() => 10),
			addToInventory: jest.fn(),
			checkSolution: jest.fn(() => false),
			awardCoins: jest.fn(),
			updateSundialHeight: jest.fn(),
			getSundialHypotenuse: jest.fn(() => 5),
			defaultSundialWidth: jest.fn(() => 12),
			getSundialTheta: jest.fn(() => 0),
			isSolved: jest.fn(() => false),
		})),
	};
});

jest.mock("../screens/GameScreen/Level2Screen/Level2View.ts", () => {
	return {
		Level2View: jest.fn().mockImplementation(() => {
			mockLevelView = {
				getGroup: jest.fn(() => ({ add: jest.fn(), listening: jest.fn(), on: jest.fn() })),
				triggerAlert: jest.fn(),
			};
			return mockLevelView;
		}),
	};
});

jest.mock("../screens/GameScreen/Level2Screen/views/RoomView.ts", () => {
	return {
		RoomView: jest.fn().mockImplementation(() => {
			mockClueElement = createMockNode();
			mockGemElement = createMockNode();

			const mockClueObj = { getElement: () => mockClueElement, getInventoryItem: jest.fn(() => ({ name: "clue" })) };
			const mockGemObj = { getElement: () => mockGemElement, getInventoryItem: jest.fn(() => ({ name: "gem" })), enable: jest.fn(), disable: jest.fn() };

			mockRoomView = {
				getClue: jest.fn(() => mockClueObj),
				getGem: jest.fn(() => mockGemObj),
				getCoinDisplay: jest.fn(() => ({ updateDisplayCoins: jest.fn() })),
				setSundialHeight: jest.fn(),
				getDoorState: jest.fn(() => false),
				setDoorState: jest.fn(),
				show: jest.fn(),
				getGroup: jest.fn(() => ({ id: () => "roomGroup" })),
			};
			return mockRoomView;
		}),
	};
});

jest.mock("../screens/GameScreen/Level2Screen/views/SundialView.ts", () => {
	return {
		SundialView: jest.fn().mockImplementation((id: string) => ({
			id,
			pushToScreen: jest.fn(),
			updateSundialShadow: jest.fn(),
			getMeasureElement: jest.fn(() => ({ setA: jest.fn(), setB: jest.fn(), setC: jest.fn(), setT: jest.fn() })),
			getInputElement: jest.fn(() => ({ getValue: jest.fn(() => 1) })),
			getGroup: jest.fn(() => ({ id: () => id })),
		})),
	};
});

describe("Level2Controller integration", () => {
	let controller: any;
	let model: any;

	beforeEach(() => {
		jest.clearAllMocks();
		// Provide a fake playerData manager when requested
		mockGetPlayerDataManager.mockReturnValue({ getCoins: jest.fn(() => 0) });

		controller = new Level2Controller(MockScreenSwitcher as any, MockPlayerDataManager);
		model = (controller as any).model;
	});

	test("clicking sundial pushes view to screen", () => {
		const evt: any = { target: { id: () => "sundial1" } };
		controller.commonElementEventHandler(evt);
		const sundial1 = (controller as any).sundial1View;
		expect(sundial1.pushToScreen).toHaveBeenCalledWith((controller as any).roomView);
	});

	test("sundial input updates model and measure tray", () => {
		const sundialView = (controller as any).sundial1View;
		// Ensure getInputElement returns a stable object so controller reads the mocked value
		sundialView.getInputElement.mockImplementation(() => ({ getValue: jest.fn(() => 2.5) }));
		// Ensure getMeasureElement returns a stable measure object so we can observe calls
		const measureObj = { setA: jest.fn(), setB: jest.fn(), setC: jest.fn(), setT: jest.fn() };
		sundialView.getMeasureElement.mockImplementation(() => measureObj);

		const evt: any = { target: { id: () => "sundial1_input" } };
		controller.commonElementEventHandler(evt);

		expect(model.updateSundialHeight).toHaveBeenCalledWith(1, 2.5);
		const measure = sundialView.getMeasureElement();
		expect(measure.setA).toHaveBeenCalled();
		expect(measure.setB).toHaveBeenCalled();
		expect(measure.setC).toHaveBeenCalled();
		expect(measure.setT).toHaveBeenCalled();
	});

	test("exit door locked triggers alert when not solved", () => {
		// ensure model.isSolved returns false
		model.isSolved.mockReturnValue(false);
		const evt: any = { target: { id: () => "exitDoor" } };
		controller.commonElementEventHandler(evt);
		expect((controller as any).levelView.triggerAlert).toHaveBeenCalledWith("This door is locked!");
	});

	test("exit door opens and switches to level3 when solved and door state true", () => {
		model.isSolved.mockReturnValue(true);
		(controller as any).roomView.getDoorState.mockReturnValue(true);
		const evt: any = { target: { id: () => "exitDoor" } };
		controller.commonElementEventHandler(evt);
		expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "level3" });
	});

	test("checkSolution true opens door, triggers alert, enables gem and awards coins", () => {
		// Force checkSolution to return true so the post-click logic executes
		model.checkSolution.mockReturnValue(true);
		const evt: any = { target: { id: () => "sundial1" } };
		controller.commonElementEventHandler(evt);

		expect((controller as any).roomView.setDoorState).toHaveBeenCalledWith(true);
		expect((controller as any).levelView.triggerAlert).toHaveBeenCalledWith("The gate has opened!");
		expect((controller as any).roomView.getGem().enable).toHaveBeenCalled();
		expect(model.awardCoins).toHaveBeenCalled();
	});

	test("clue drag handler adds clue to inventory and hides element", () => {
		// position the clue inside backpack area
		mockClueElement.x.mockReturnValue(10);
		mockClueElement.y.mockReturnValue(10);

		controller.clueDragHandler();

		expect(mockClueElement.visible).toHaveBeenCalledWith(false);
		expect(model.addToInventory).toHaveBeenCalled();
	});

	test("gem drag handler adds gem to inventory and hides element", () => {
		mockGemElement.x.mockReturnValue(5);
		mockGemElement.y.mockReturnValue(5);

		controller.gemDragHandler();

		expect(mockGemElement.visible).toHaveBeenCalledWith(false);
		expect(model.addToInventory).toHaveBeenCalled();
	});
});

