const plugins = [
  [
    require.resolve("babel-plugin-module-resolver"),
    {
      root: ["./src/"],
      alias: {
        test: "./test",
        components: "./src/components",
      },
    },
  ],
];
