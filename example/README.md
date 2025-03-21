# Generation

To build example output:

```
bazel build generator:protoc-gen-js
protoc --plugin=protoc-gen-js=bazel-bin/generator/protoc-gen-js --proto_path=. --js_out=output_dir=example,library=test,import_style=es6,generate_dts,binary:. protos/test.proto
protoc --plugin=protoc-gen-js=bazel-bin/generator/protoc-gen-js --proto_path=. --js_out=output_dir=example,library=test2,import_style=es6,generate_dts,binary:. protos/test2.proto
```

Generates all of:
* `example/test.js`
* `example/test2.js`
* `example/test.d.ts`
* `example/test2.d.ts`

The `*.js` files are generated with  ES6-style imports/exports. The `*.d.ts` files have TypeScript definitions for their respective `.js` files. The `test2.*` files demonstrate dependency between generated files.

To regression test Closure output:

```
git checkout origin/main
bazel build generator:protoc-gen-js
protoc --plugin=protoc-gen-js=bazel-bin/generator/protoc-gen-js --proto_path=. --js_out=output_dir=example,library=test,import_style=closure,binary:. protos/test.proto 
mv example/test.js example-test.js
protoc --plugin=protoc-gen-js=bazel-bin/generator/protoc-gen-js --proto_path=. --js_out=output_dir=example,library=test2,import_style=closure,binary:. protos/test2.proto 
mv example/test2.js example-test2.js
rmdir example

git checkout lukfugl/es6
bazel build generator:protoc-gen-js
mv example-test.js example/test.closure-old.js
mv example-test2.js example/test2.closure-old.js
protoc --plugin=protoc-gen-js=bazel-bin/generator/protoc-gen-js --proto_path=. --js_out=output_dir=example,library=test,import_style=closure,binary:. protos/test.proto 
mv example/test.js example/test.closure-new.js 
protoc --plugin=protoc-gen-js=bazel-bin/generator/protoc-gen-js --proto_path=. --js_out=output_dir=example,library=test2,import_style=closure,binary:. protos/test2.proto 
mv example/test2.js example/test2.closure-new.js 

diff example/test.closure-* > example/test.closure.diff # empty
diff example/test2.closure-* > example/test2.closure.diff # empty
```