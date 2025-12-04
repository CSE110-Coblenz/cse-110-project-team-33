// Level4Controller.test.ts
import { Level4Controller } from "../screens/GameScreen/Level4Screen/Level4Controller.ts";

const mockSwitchToScreen = jest.fn();
const MockScreenSwitcher: any = { switchToScreen: mockSwitchToScreen };

const createLabelNode = () => {
	const handlers: Record<string, any> = {};
	return {
		x: jest.fn(() => 0),
		y: jest.fn(() => 0),
		position: jest.fn(function (pos: any) { if (pos) { this._pos = pos; } return this._pos || { x: 0, y: 0 }; }),
		on: jest.fn((event: string, handler: any) => { handlers[event] = handler; }),
		_triggerEvent: (event: string) => { if (handlers[event]) handlers[event](); },
	} as any;
};

let mockView: any;
let mockModel: any;

jest.mock("../screens/GameScreen/Level4Screen/Level4Model.ts", () => ({
	Level4Model: jest.fn().mockImplementation(() => ({
		items: [ { label: "(1, 0)", angle: 0 } ],
		centerX: 100,
		centerY: 100,
		radius: 50,
		initTargets: jest.fn(),
		setCenter: jest.fn(),
		checkPlacement: jest.fn(() => true),
		markPlaced: jest.fn(),
		allPlaced: jest.fn(() => true),
	})),
}));

jest.mock("../screens/GameScreen/Level4Screen/Level4View.ts", () => ({
	Level4View: jest.fn().mockImplementation(() => {
		mockView = {
			centerX: 100,
			centerY: 100,
			drawBase: jest.fn(),
			createDraggableLabel: jest.fn(() => {
				const node = createLabelNode();
				return node;
			}),
			updateLabelColor: jest.fn(),
			getLayer: jest.fn(() => ({ batchDraw: jest.fn() })),
		};
		return mockView;
	}),
}));

describe("Level4Controller integration", () => {
	let controller: any;

	beforeEach(() => {
		jest.clearAllMocks();
		controller = new Level4Controller(MockScreenSwitcher as any);
		mockModel = (controller as any).model;
	});

	test("dragging label that is placed snaps, updates color, marks placed and navigates to result when all placed", () => {
		// Grab the label node created in constructor
		const labelNode = (controller as any).view.createDraggableLabel.mock.results[0].value;

		// simulate placement by triggering dragend
		labelNode.x.mockReturnValue(120);
		labelNode.y.mockReturnValue(120);

		// call the registered dragend handler
		labelNode._triggerEvent("dragend");

		expect(mockModel.checkPlacement).toHaveBeenCalled();
		expect(mockView.updateLabelColor).toHaveBeenCalledWith(labelNode, true);
		expect(mockModel.markPlaced).toHaveBeenCalled();
		expect(mockModel.allPlaced).toHaveBeenCalled();
		// when allPlaced returns true, it should navigate to result
		expect(mockSwitchToScreen).toHaveBeenCalledWith({ type: "result" });
	});
});

