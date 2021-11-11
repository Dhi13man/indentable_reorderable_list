export class ListState {
  list: ListItem[];

  constructor() {
    this.list = [];
  }

  addItem(item: ListItem) {
    item.level =
      this.list.length == 0 ? 1 : this.list[this.list.length - 1].level;
    this.list.push(item);
  }

  removeItemAt(index: number) {
    // Remove item at index and also all the items after it with level > item.level
    // until we find an item with level <= item.level
    const baseLevel = this.list[index].level;
    let i = index + 1;
    while (i < this.list.length && this.list[i].level > baseLevel) {
      i++;
    }
    this._removeAndGetItems(index, i);
  }

  private _removeAndGetItems(begin: number, end: number): ListItem[] {
    return this.list.splice(begin, end - begin + 1);
  }

  moveItem(fromIndex: number, toIndex: number) {
    if (this.list[fromIndex].level !== this.list[toIndex].level) {
      throw new Error("Cannot swap items in different levels");
    }
    // Move item at index and also all the items after it with level > item.level
    // until we find an item with level <= item.level
    const baseLevel = this.list[fromIndex].level;
    let i = fromIndex + 1;
    while (i < this.list.length && this.list[i].level > baseLevel) {
      i++;
    }
    this._moveListItems(fromIndex, i, toIndex);
  }

  private _moveListItems(begin: number, end: number, toIndex: number) {
    const items: ListItem[] = this._removeAndGetItems(begin, end);
    this.list.splice(toIndex, 0, ...items);
  }

  indent(index: number) {
    const currentIndent: number = this.list[index].level;
    if (index == 0) {
      console.log(
        `Indenting item at index ${index} has no meaning, when items above `
      );
    } else if (currentIndent > this.list[index - 1].level) {
      throw new Error("Indent of this item is already one above parent item.");
    }
    this.list[index].level++;
  }

  outdent(index: number) {
    if (this.list[index].level <= 1) {
      throw new Error("Cannot outdent item that's already at base indent.");
    }
    // Consider this list. If we outdent 2nd item from top, 3rd item will also have to be outdented.
    // Recursive.
    //
    // -
    //   -
    //     -
    // -
    if (
      index + 1 < this.list.length &&
      this.list[index + 1].level > this.list[index].level
    ) {
      this.outdent(index + 1);
    }
    this.list[index].level--;
  }

  printList() {
    let out = "";
    for (let listItem of this.list) {
      for (let i = 0; i < listItem.level; i++) {
        out += " - ";
      }
      out += listItem.text + "\n";
    }
    console.log(out);
  }
}

export class ListItem {
  id: string;
  text: string;
  level: number;

  constructor(id: string, text: string, level: number = 0) {
    this.id = id;
    this.text = text;
    this.level = level;
  }
}
