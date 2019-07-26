"use strict";

const fs = require("fs");

const antlr4 = require("antlr4");
const {MySqlLexer} = require("./parser/MySqlLexer");
const {MySqlParser} = require("./parser/MySqlParser");
const {MySqlParserListener} = require("./parser/MySqlParserListener");
const {CaseInsensitiveInputStream} = require("./CaseInsensitiveInputStream");

let depth = 0;
MySqlParserListener.prototype.enterEveryRule = ctx => {
	console.log("  ".repeat(depth) + ctx.constructor.name);
	depth++;
};
MySqlParserListener.prototype.exitEveryRule = ctx => {
	depth--;
};

const sql = fs.readFileSync("../target.sql", "utf8");
const parser = new MySqlParser(new antlr4.CommonTokenStream(new MySqlLexer(new CaseInsensitiveInputStream(new antlr4.InputStream(sql), true))));
const listener = new MySqlParserListener();

antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, parser.root());
