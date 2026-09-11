# indentable_reorderable_list

TypeScript data model for an outline-style list: items have indent levels, and reorder/indent/remove operations move a node together with its nested children. Use it when you need nested list logic without a UI framework.

## Install

```sh
git clone https://github.com/Dhi13man/indentable_reorderable_list.git
cd indentable_reorderable_list
npm install
```

## Use

`ListState` in `src/models.ts` supports:

- `addItem` / `removeItemAt` (removes descendants with a deeper level)
- `swapItems` for same-level nodes, moving nested children with the node
- `indent` to nest under the previous sibling

```sh
npm test
```

Jest tests live in `tests/models.test.ts`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
