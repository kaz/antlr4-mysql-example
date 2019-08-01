"use strict";

const antlr4 = require("antlr4");
const {MySqlLexer} = require("./parser/MySqlLexer");
const {MySqlParser} = require("./parser/MySqlParser");
const {MySqlParserListener} = require("./parser/MySqlParserListener");
const {CaseChangingStream} = require("./CaseChangingStream");

class Listener extends MySqlParserListener {
	constructor(){
		super();
		this.depth = 0;
	}
	enterEveryRule(ctx){
		console.log("  ".repeat(this.depth) + ctx.constructor.name);
		this.depth += 1;
	}
	exitEveryRule(ctx){
		this.depth -= 1;
	}
}

const stream = new antlr4.FileStream("../target.sql", true);

const parser = new MySqlParser(new antlr4.CommonTokenStream(new MySqlLexer(new CaseChangingStream(stream, true))));
const listener = new Listener();

antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, parser.root());
