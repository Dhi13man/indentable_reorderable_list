import { ListState, ListItem } from "../src/models";

test("Adding items, indent, outdent.", () => {
  const ls: ListState = new ListState();
  ls.addItem(new ListItem("1", "Item 1"));
  ls.addItem(new ListItem("2", "Item 2"));
  expect(ls.list[0].level).toBe(1);
  ls.addItem(new ListItem("3", "Item 3"));
  expect(ls.list[2].level).toBe(1);
  ls.indent(1);
  expect(ls.list[1].level).toBe(2);
  ls.outdent(1);
  expect(ls.list[1].level).toBe(1);
  ls.printList();
});

test("Outdent item when items below are even more indented.", () => {
  const ls: ListState = new ListState();
  ls.addItem(new ListItem("1", "Item 1"));
  ls.addItem(new ListItem("2", "Item 2"));
  ls.addItem(new ListItem("3", "Item 3"));
  ls.addItem(new ListItem("4", "Item 4"));
  ls.addItem(new ListItem("5", "Item 5"));
  ls.indent(2);
  ls.indent(3);
  ls.indent(3);
  expect(ls.list[3].level).toBe(3);
  ls.indent(4);
  ls.indent(4);
  ls.indent(4);
  expect(ls.list[4].level).toBe(4);
  ls.outdent(2);
  expect(ls.list[2].level).toBe(1);
  expect(ls.list[3].level).toBe(2);
  expect(ls.list[4].level).toBe(3);
  ls.printList();
});

test("Remove item with further indented children (all children must be removed too)", () => {
  const ls: ListState = new ListState();
  ls.addItem(new ListItem("1", "Item 1"));
  ls.addItem(new ListItem("2", "Item 2"));
  ls.addItem(new ListItem("3", "Item 3"));
  ls.addItem(new ListItem("4", "Item 4"));
  ls.addItem(new ListItem("5", "Item 5"));
  ls.indent(2);
  ls.indent(3);
  ls.indent(3);
  ls.indent(4);
  ls.indent(4);
  ls.indent(4);
  expect(ls.list[4].level).toBe(4);
  ls.removeItemAt(1); // Removing element at 1: (2) also removes children (3), (4), (5).
  expect(ls.list.length).toBe(1);
  ls.printList();
});

test("Swap 2 items with further indented children (all children must be considered too)", () => {
    const ls: ListState = new ListState();
    ls.addItem(new ListItem("1", "Item 1"));
    ls.addItem(new ListItem("2", "Item 2"));
    ls.addItem(new ListItem("3", "Item 3"));
    ls.addItem(new ListItem("4", "Item 4"));
    ls.addItem(new ListItem("5", "Item 5"));
    ls.indent(2);
    ls.indent(3);
    ls.indent(3);
    ls.indent(4);
    ls.indent(4);
    ls.indent(4);
    expect(ls.list[4].level).toBe(4);
    ls.swapItems(1, 0);
    ls.printList();
    expect(ls.list.length).toBe(5);
    expect(ls.list[0].id).toBe("2");
    expect(ls.list[4].id).toBe("1");
  });