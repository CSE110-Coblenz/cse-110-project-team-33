// Level3Controller.test.ts
import { Level3Controller } from "../screens/GameScreen/Level3Screen/Level3Controller.ts";

const mockSwitchToScreen = jest.fn();
const mockSetCoins = jest.fn();
const mockSetLevel = jest.fn();
const MockPlayerDataManager: any = {
	setCoins: mockSetCoins,
	setLevel: mockSetLevel,
};

const MockScreenSwitcher: any = {
	switchToScreen: mockSwitchToScreen,
};

const createMockNode = () => {
	const handlers: Record<string, any> = {};
	return {
		on: jest.fn((event: string, handler: any) => { handlers[event] = handler; }),
		position: jest.fn(() => ({ x: 0, y: 0 })),
		x: jest.fn(() => 0),
		y: jest.fn(() => 0),
		dragBoundFunc: jest.fn(),
		destroy: jest.fn(),
		getLayer: jest.fn(() => ({ batchDraw: jest.fn() })),
		draggable: jest.fn(),
		_triggerEvent: (event: string, ...args: any[]) => { if (handlers[event]) handlers[event](...args); },
	} as any;
};

let mockView: any;
let mockModel: any;
let mockDoor: any;
let mockBackpack: any;
let mockWater: any;
let mockBackbtn: any;
let mockClue: any;
let mockCrystal: any;

jest.mock("../screens/GameScreen/Level3Screen/Level3Model.ts", () => ({
	Level3Model: jest.fn().mockImplementation(() => ({
		getInventory: jest.fn(() => []),
		addToInventory: jest.fn(),
	})),
}));

jest.mock("../screens/GameScreen/Level3Screen/Level3View.ts", () => ({
	Level3View: jest.fn().mockImplementation(() => {
		mockDoor = createMockNode();
		mockBackpack = createMockNode();
		mockWater = createMockNode();
		mockBackbtn = createMockNode();
		mockClue = createMockNode();
		mockCrystal = createMockNode();

		mockView = {
			getDoor: jest.fn(() => mockDoor),
			getBackpack: jest.fn(() => mockBackpack),
			getWater: jest.fn(() => mockWater),
			getBack: jest.fn(() => mockBackbtn),
			getClue: jest.fn(() => mockClue),
			getCrystal: jest.fn(() => mockCrystal),
			isSolved: jest.fn(() => false),
			triggerAlert: jest.fn(),
			switchToPuzzle: jest.fn(),
			getloadBackground: jest.fn(() => Promise.resolve()),
		};
		return mockView;
	}),
}));

describe("Level3Controller integration", () => {
	let controller: any;

	beforeEach(async () => {
		jest.clearAllMocks();
		controller = new Level3Controller(MockScreenSwitcher as any, MockPlayerDataManager as any);
		// wait for async initialization called in constructor
		await (controller as any).initialize?.();
		mockModel = (controller as any).model;
	});

	test("backpack click opens inventory and sets player level to level3", () => {
		// simulate click handler attached to backpack
		mockBackpack._triggerEvent?.("click");
		// Backpack click uses screenSwitcher.switchToScreen and sets level
		expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "inventory" });
		expect(mockSetLevel).toHaveBeenCalledWith({ type: "level3" });
	});

	test("door click when puzzle not solved triggers alert", () => {
		mockView.isSolved.mockReturnValue(false);
		mockDoor._triggerEvent?.("click");
		expect(mockView.triggerAlert).toHaveBeenCalledWith("I'm not across yet...");
	});

	test("door click when solved sets coins and moves to level4", () => {
		mockView.isSolved.mockReturnValue(true);
		mockDoor._triggerEvent?.("click");
		expect(mockSetCoins).toHaveBeenCalledWith(600);
		expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "level4" });
	});

	test("dragging clue into backpack adds to inventory and destroys node", () => {
		mockClue.position.mockReturnValue({ x: 10, y: 10 });
		mockClue._triggerEvent?.("dragend");
		expect(mockModel.addToInventory).toHaveBeenCalled();
		expect(mockClue.destroy).toHaveBeenCalled();
	});

	test("dragging crystal into backpack adds crystal to inventory and destroys node", () => {
		mockCrystal.position.mockReturnValue({ x: 5, y: 5 });
		mockCrystal._triggerEvent?.("dragend");
		expect(mockModel.addToInventory).toHaveBeenCalled();
		expect(mockCrystal.destroy).toHaveBeenCalled();
	});
});

