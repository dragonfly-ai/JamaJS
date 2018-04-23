# Welcome to JamaJS!

This project leverages the JSweet quick start project, http://www.jsweet.org/getting-started/ to transpile JAMA, the Java Matrix Library by MathWorks and NIST, to javascript.
See https://math.nist.gov/javanumerics/jama/ for details about JAMA.

## Usage

```
> git clone https://github.com/dragonfly-ai/JamaJS.git
> cd JamaJS
> mvn generate-sources
> firefox demo/index.html
```

## Transpiler Results

The artifact that contains the JavaScript port of JAMA appears in: ./JamaJS/target/js/bundle.js

## Prerequisites

- Java 8 JDK is required. Type in ``java -version`` in a console to make sure that you have a >1.8 JDK.
- The `node` and `npm` executables must be in the path (https://nodejs.org).
- Install Maven (https://maven.apache.org/install.html).