
    var testsContext = require.context("../../spec", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    