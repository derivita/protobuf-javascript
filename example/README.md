# Generation

Built generator plugin:

`bazel build generator:protoc-gen-js`

then:

`protoc --plugin=protoc-gen-js=bazel-bin/generator/protoc-gen-js --proto_path=protos --js_out=library=example/test,import_style=es6,generate_dts,binary:. protos/test.proto`

Generated both `example/test.js` with ES6-style imports/exports and `example/test.d.ts` with TypeScript definitions.
