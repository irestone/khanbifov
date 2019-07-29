## Directory naming

> `/dist` - for minified and optimized production-ready code
>
> `/build` - transpiled and bundled code, not optimized hence not production-ready

`/build` is used to run code while working with source files. Bundler watches changes in source files and rebuilds them when changes happen. It causes rerun of the process (e.g. server) running from a `/build` dir.

`/dist` folder is an optimized production-ready version of `/build`. It is built when product is ready to be deployed.
