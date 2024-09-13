# usefaketimers-bug-reproduction

Reproduction repository for a bu in sinon fake timers. The repo is currently setup to use sinon v19 and the bug can be demonstrated with:

```
npm run test
```

This test will timeout and not succeed. Switch to sinon v18 and rerun to see the test pass
